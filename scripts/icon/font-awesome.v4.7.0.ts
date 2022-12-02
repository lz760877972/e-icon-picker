import {fileStr} from "../shared/utils";
import fs from "fs"
import {info, success} from "../shared/logger";
import {getCss, parse, writeFile} from "../shared/httpsUtil";


async function generate() {
    //https://www.bootcdn.cn/font-awesome/
    // let version = await util.getVersion("www.bootcdn.cn", "/font-awesome/");
    // console.log("Font Awesome v" + version);
    //https://unpkg.zhimg.com/font-awesome@4.7.0/css/font-awesome.min.css
    let source = await getCss("unpkg.com", "/font-awesome@4.7.0/css/font-awesome.min.css")
    let nameCount = 0;
    let fa: string[] = [];
    parse(source, (it: string[]) => {
        if (it.length > 1) {
            fa.push(it[0] + " " + it[1]);
        } else {
            fa.push("fa " + it[0]);
        }
        nameCount++;
    });
    await writeFile(__dirname + "/fontawesome/", "font-awesome.v4.7.0", fa);
    fs.writeFileSync(__dirname + "/fontawesome/font-awesome.v4.7.0.d.ts", fileStr);
    info("parsed (" + nameCount + " names)")
}

const fontAwesome470 = async () => {
    await generate()
        .then(() => success("Successfully generated new font-awesome.v4.7.0 index.js"))
        .catch(err => console.error(err));
}
export default fontAwesome470
