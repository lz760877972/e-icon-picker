import {getCss, parseEl, writeFile} from "../shared/httpsUtil";
import {fileStr} from "../shared/utils";
import fs from "fs"
import {info, success} from "../shared/logger";

async function generate() {
    //https://cdn.bootcdn.net/ajax/libs/element-plus/1.0.2-beta.40/theme-chalk/index.css
    let source = await getCss("cdn.bootcdn.net", "/ajax/libs/element-plus/1.0.2-beta.40/theme-chalk/index.min.css")
    let nameCount = 0;
    let el: string[] = [];
    parseEl(source, (it: string[]) => {
        el.push(it[0]);
        nameCount++;
    });
    await writeFile(__dirname + "/ele/", "element-plus", el);

    fs.writeFileSync(__dirname + "/ele/element-plus.d.ts", fileStr);
    info("parsed (" + nameCount + " names)")
}

const elementPlus = async () => {
    await generate()
        .then(() => success("Successfully generated new element-plus index.js"))
        .catch(err => console.error(err));
}

export default elementPlus

