const util = require("../../shared/httpsUtil")
const {fileStr} = require("../../shared/utils")
const fs = require("fs");
const ElementPlusIconsVue = require('@element-plus/icons-vue')
const logger = require("../../shared/logger");

async function generate() {
  let namecount = 0;
  let el = [];
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    el.push(`component ${key}`);
    namecount++;
  }

  await util.writeFile(__dirname + "/ele/", "element-plus", el);

  fs.writeFileSync(__dirname + "/ele/element-plus.d.ts", fileStr);
  logger.info("parsed (" + namecount + " names)")
}


exports.elementPlus2 = async () => {
  await generate()
    .then(() => logger.success("Successfully generated new index.js"))
    .catch(err => console.error(err));
}

