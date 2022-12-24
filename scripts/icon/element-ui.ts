import {fileStr} from "../shared/utils";
import fs from "fs"
import {info, success} from "../shared/logger";
import {getCss, parseEl, writeFile} from "../shared/httpsUtil";

const version = "2.15.12"

async function generate() {
    //https://www.bootcdn.cn/font-awesome/
    // let version = await util.getVersion("www.bootcdn.cn", "/font-awesome/");
    // console.log("Font Awesome v" + version);
    //https://unpkg.com/element-plus@1.0.2-beta.40/lib/theme-chalk/index.css
    let source = await getCss("unpkg.com", `/element-ui@${version}/lib/theme-chalk/index.css`)
    let nameCount = 0;
    let el: string[] = [];
    parseEl(source, (it: string[]) => {
        el.push(it[0]);
        nameCount++;
    });
    info(__dirname + "/data/")
    await writeFile(__dirname + "/ele/", `element-ui`, el);
    fs.writeFileSync(__dirname + "/ele/" + `element-ui.d.ts`, fileStr);
    info("parsed (" + nameCount + " names)")
}

const elementUI = async () => {
    await generate()
        .then(() => success("Successfully generated new element-ui index.js"))
        .catch(err => console.error(err));
}

export default elementUI
