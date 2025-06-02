import type {WebTypesBuilderConfig} from "./types.d.ts";
import * as path from "path";
import {globby} from 'globby';
import type {FSWatcher} from 'chokidar';
import {watch} from 'chokidar';
import {parse} from 'vue-docgen-api'
import type {
  HtmlAttribute,
  HtmlTag,
  HtmlVueFilter,
  JSONSchemaForAttributes,
  JSONSchemaForTags,
  JSONSchemaForWebTypes
} from "./web-types.d.ts";
import * as fs from "fs";
import {mkdirp} from 'mkdirp'
import _ from 'lodash'
import {error, info} from "./logger";
import {camelToKebab} from "./utils";

export interface FileContents {
  "vue-components"?: HtmlTag[];
  attributes?: HtmlAttribute[];
  "vue-filters"?: HtmlVueFilter[];
}

export default async function build(config: WebTypesBuilderConfig) {
  const cwd = config.cwd || process.cwd()

  config.componentsRoot = path.resolve(cwd, config.componentsRoot)
  info("Searching for components in " + config.componentsRoot)
  config.outPath = path.resolve(cwd, config.outPath ?? '')
  info("Building web-types to " + config.outPath)

  // then create the watcher if necessary
  const {watcher, componentFiles} = await getSources(config.components, config.componentsRoot)

  const cache: { [filepath: string]: FileContents } = {}
  const buildWebTypesBound = await rebuild.bind(null, config, componentFiles, cache, watcher)
  try {
    await buildWebTypesBound()
  } catch (e: any) {
    error("Error building web-types: " + e.message)
    await watcher.close()
    return
  }
  if (config.watch) {
    watcher.on('add', buildWebTypesBound)
      .on('change', buildWebTypesBound)
      .on('unlink', async (filePath) => {
        info("Rebuilding on file removal " + filePath)
        delete cache[filePath]
        await writeDownWebTypesFile(config, Object.values(cache), path.resolve(config.outPath, "web-types.json"))
        await writeDownTagsFile(config, Object.values(cache), path.resolve(config.outPath, "tags.json"))
        await writeDownAttributesFile(config, Object.values(cache), path.resolve(config.outPath, "attributes.json"))
      })
  } else {
    await watcher.close()
  }
}

async function getSources(
  components: string | string[],
  cwd: string,
): Promise<{
  watcher: FSWatcher
  componentFiles: string[]
}> {
  const watcher = watch(components, {cwd})
  const allComponentFiles = await globby(components, {cwd})
  info(`Found ${allComponentFiles?.length || 0} components`)
  return {watcher, componentFiles: allComponentFiles}
}

async function rebuild(config: WebTypesBuilderConfig, files: string[], cachedContent: {
  [filepath: string]: FileContents
}, watcher: FSWatcher, changedFilePath?: string) {

  const cacheWebTypesContent = async (filePath: string) => {
    cachedContent[filePath] = await extractInformation(path.join(config.componentsRoot, filePath), config)
    return true
  }

  if (changedFilePath) {
    info("Rebuilding on update file " + changedFilePath)
    try {
      // if in chokidar mode (watch), the path of the file that was just changed
      // is passed as an argument. We only affect the changed file and avoid re-parsing the rest
      await cacheWebTypesContent(changedFilePath)
    } catch (e: any) {
      throw new Error(
        `Error building file ${config.outPath} when file ${changedFilePath} has changed: ${e.message}`
      )
    }
  } else {
    try {
      info(`Rebuilding all components files:${files}`)
      // if we are initializing the current file, parse all components
      await Promise.all(files?.map(cacheWebTypesContent))
    } catch (e: any) {
      throw new Error(`Error building file ${config.outPath}: ${e.message}`)
    }
  }
  // and finally save all concatenated values to the markdown file
  await writeDownWebTypesFile(config, Object.values(cachedContent), path.resolve(config.outPath, "web-types.json"))
  await writeDownTagsFile(config, Object.values(cachedContent), path.resolve(config.outPath, "tags.json"))
  await writeDownAttributesFile(config, Object.values(cachedContent), path.resolve(config.outPath, "attributes.json"))
}

async function writeDownWebTypesFile(config: WebTypesBuilderConfig, definitions: FileContents[], destFilePath: string) {
  definitions = JSON.parse(JSON.stringify(definitions))
  const destFolder = path.dirname(destFilePath)
  await mkdirp(destFolder)
  let writeStream = fs.createWriteStream(destFilePath)
  const contents: JSONSchemaForWebTypes = {
    "$schema": "https://raw.githubusercontent.com/JetBrains/web-types/master/schema/web-types.json",
    framework: "vue",
    name: config.packageName,
    version: config.packageVersion,
    "description-markup": config.descriptionMarkup,
    "js-types-syntax": config.typesSyntax,
    contributions: {
      html: {
        "vue-components": _(definitions).flatMap(d => d["vue-components"] || []).orderBy("name", "asc").value(),
        attributes: _(definitions).flatMap(d => d.attributes || []).orderBy("name", "asc").value(),
        "vue-filters": _(definitions).flatMap(d => d["vue-filters"] || []).orderBy("name", "asc").value(),
      }
    }
  }

  const html = contents.contributions.html!
  if (html["vue-components"]?.length == 0) html["vue-components"] = undefined
  if (html.attributes?.length == 0) html.attributes = undefined
  if (html["vue-filters"]?.length == 0) html["vue-filters"] = undefined

  writeStream.write(JSON.stringify(contents, null, 2))

  // close the stream
  writeStream.close()
}

async function writeDownTagsFile(config: WebTypesBuilderConfig, definitions: FileContents[], destFilePath: string) {
  definitions = JSON.parse(JSON.stringify(definitions))
  const destFolder = path.dirname(destFilePath)
  await mkdirp(destFolder)
  const writeStream = fs.createWriteStream(destFilePath)
  const contents: JSONSchemaForTags = {}
  for (const htmlTag of _(definitions).flatMap(d => d["vue-components"] || []).orderBy("name", "asc").value()) {
    contents[htmlTag.name] = {
      description: htmlTag.description,
      attributes: htmlTag.props?.map(prop => prop.name)
    }
  }


  writeStream.write(JSON.stringify(contents, null, 2))
  // close the stream
  writeStream.close()
}

async function writeDownAttributesFile(config: WebTypesBuilderConfig, definitions: FileContents[], destFilePath: string) {
  const destFolder = path.dirname(destFilePath)
  await mkdirp(destFolder)
  const writeStream = fs.createWriteStream(destFilePath)
  const contents: JSONSchemaForAttributes = {}
  for (const htmlTag of _(definitions).flatMap(d => d["vue-components"] || []).orderBy("name", "asc").value()) {
    htmlTag.props?.forEach(prop => {
      contents[`${htmlTag.name}/${prop.name}`] = {
        description: htmlTag.description,
        type: prop.type.toString(),
        options: (prop.value ?? {} as any)?.items
      }
    })
  }

  writeStream.write(JSON.stringify(contents, null, 2))
  // close the stream
  writeStream.close()
}


async function extractInformation(
  absolutePath: string,
  config: WebTypesBuilderConfig,
): Promise<FileContents> {
  info(`absolutePath:${absolutePath}`)
  const doc = await parse(absolutePath, config.apiOptions)
  if (!doc) {
    return {}
  }
  let description = doc?.description?.trim() ?? ""
  doc?.docsBlocks?.forEach(block => {
    if (description&&description?.length > 0) {
      if (config.descriptionMarkup === "html") {
        description += "<br/><br/>"
      } else {
        description += "\n\n"
      }
    }
    description += block
  })
  info(`Build ${config.prefix}${doc?.displayName}`)
  return {
    "vue-components": [
      {
        name: camelToKebab(`${config.prefix}${doc?.displayName}`),
        description,
        props: doc.props?.map(prop => ({
          name: camelToKebab(prop?.name),
          required: prop?.required,
          description: prop?.description,
          type: prop?.type?.name ?? "any",
          default: prop?.defaultValue?.value,
        })),
        js: {
          events: doc?.events?.map(event => ({
            name: camelToKebab(event?.name),
            description: event?.description
          }))
        },
        slots: doc?.slots?.map(slot => ({
          name: camelToKebab(slot?.name),
          description: slot?.description
        })),
        source: {
          symbol: `${config.prefix}${doc?.displayName}`
        }
      }
    ]
  }
}
