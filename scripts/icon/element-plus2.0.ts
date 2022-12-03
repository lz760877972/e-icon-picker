import * as  ElementPlusIconsVue from "@element-plus/icons-vue"
import {writeFile} from "../shared/httpsUtil";
import {fileStr} from "../shared/utils";
import fs from "fs"
import {info, success} from "../shared/logger";

async function generate() {
    let nameCount = 0;
    let el = [];
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        el.push(`component ${key}`);
        nameCount++;
    }

    await writeFile(__dirname + "/ele/", "element-plus", el);

    fs.writeFileSync(__dirname + "/ele/element-plus.d.ts", fileStr);
    info("parsed (" + nameCount + " names)")
}


const elementPlus2 = async () => {
    await generate()
        .then(() => success("Successfully generated new element-plus index.js"))
        .catch(err => console.error(err));
}

export default elementPlus2
