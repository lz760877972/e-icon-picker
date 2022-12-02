import {fileStr} from "../shared/utils";
import fs from "fs"
import {info, success} from "../shared/logger";
import {getCss, getVersion, parse, writeFile} from "../shared/httpsUtil";

async function generate() {
    //https://www.bootcdn.cn/font-awesome/
    let version = "5.15.4";
    info("Font Awesome v" + version);
    let source = await getCss("pro.fontawesome.com", "/releases/v" + version + "/css/all.css", {"Referer": "https://mo-mar.de"})
    let nameCount = 0;
    let fa: string[] = [];
    parse(source, (it: string[]) => {
        if (it.length > 1) {
            fa.push(it[0] + " " + it[1]);
            nameCount++;
        }
    });
    await writeFile(__dirname + "/fontawesome/", `fontawesome-pro-${version}`, fa);
    fs.writeFileSync(__dirname + "/fontawesome/" + `fontawesome-pro-${version}.d.ts`, fileStr);
    info("parsed (" + nameCount + " names)")
}

const fontAwesome5XXPro = async () => {
    await generate()
        .then(() => success("Successfully generated new index.js"))
        .catch(err => console.error(err));
}
export default fontAwesome5XXPro
