import * as  ElementPlusIconsVue from "@element-plus/icons-vue"
import {writeFile} from "../shared/httpsUtil";
import {fileStr} from "../shared/utils";
import fs from "fs"
import {error, info, success} from "../shared/logger";

async function generate() {
    let nameCount = 0;
    let el = [];
    for (const [key] of Object.entries(ElementPlusIconsVue)) {
        el.push(`component ${key}`);
        nameCount++;
    }
    let basePath = __dirname + "/../../packages/icon"
    await writeFile(basePath + "/ele/", "element-plus", el);

    fs.writeFileSync(basePath + "/ele/element-plus.d.ts", fileStr);
    info("parsed (" + nameCount + " names)")
}


const elementPlus2 = async () => {
    await generate()
        .then(() => success("Successfully generated new element-plus index.js"))
        .catch(err => error(err));
}

export default elementPlus2
