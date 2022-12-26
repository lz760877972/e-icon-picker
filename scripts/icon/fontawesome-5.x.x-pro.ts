import {fileStr} from "../shared/utils";
import fs from "fs"
import {error, info, success} from "../shared/logger";
import {getCss, parse, writeFile} from "../shared/httpsUtil";

const version = "5.15.4";

async function generate() {
    //https://www.bootcdn.cn/font-awesome/
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
    await writeFile(__dirname + "/fontawesome/", `fontawesome-pro-5`, fa);
    fs.writeFileSync(__dirname + "/fontawesome/" + `fontawesome-pro-5.d.ts`, fileStr);
    info("parsed (" + nameCount + " names)")
}

const fontAwesome5XXPro = async () => {
    await generate()
        .then(() => success("Successfully generated new index.js"))
        .catch(err => error(err));
}
export default fontAwesome5XXPro
