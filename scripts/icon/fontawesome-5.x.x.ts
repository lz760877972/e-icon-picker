import {fileStr} from "../shared/utils";
import fs from "fs"
import {info, success} from "../shared/logger";
import {getCss, parse, writeFile} from "../shared/httpsUtil";


async function generate() {
    // let changelog = await getCss("www.bootcdn.cn", "/font-awesome/5.15.4/");
    // let version = (changelog.match(/(\d+\.\d+\.\d+)/g))[0];
    // let names = changelog.match(/\/ajax\/libs\/font-awesome\/.*\/css\/(.*?).min.css/g).slice(0);
    // if (version.length < 3) {
    //     throw new Error("Couldn't parse version");
    // }

    const version = "5.15.4";

    const names: string[] = [`/ajax/libs/font-awesome/${version}/css/all.min.css`, `/ajax/libs/font-awesome/${version}/css/fontawesome.min.css`, `/ajax/libs/font-awesome/${version}/css/v4-shims.min.css`]
    info("Font Awesome v" + version);

    for (const name of names) {
        let source = await getCss("cdn.bootcdn.net", name)
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
        if (fa.length === 0) {
            continue;
        }

        let name2: string[] | string = name.split("/");
        name2 = name2[name2.length - 1];
        name2 = name2.replace(".min.css", "");
        await writeFile(__dirname + "/fontawesome/", name2 + "-5", fa);
        fs.writeFileSync(__dirname + "/fontawesome/" + `${name2}-5.d.ts`, fileStr);
        info("parsed (" + nameCount + " names)")
    }
}

const fontAwesome5XX = async () => {
    await generate()
        .then(() => success("Successfully generated new font-awesome 5.x.x index.js"))
        .catch(err => console.error(err));
}
export default fontAwesome5XX
