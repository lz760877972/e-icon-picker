import * as tdesign from 'tdesign-icons-vue-next/lib/icons.js'
import {writeFile} from "../shared/httpsUtil";
import {fileStr} from "../shared/utils";
import fs from "fs"
import {info, success} from "../shared/logger";

async function generate() {
    let nameCount = 0;
    let tdesignIcons: string[] = [];
    for (const [key, component] of Object.entries(tdesign)) {
        tdesignIcons.push(`component ${key}`);
        nameCount++;
    }
    await writeFile(__dirname + "/tdesign/", "tdesign", tdesignIcons);

    fs.writeFileSync(__dirname + "/tdesign/tdesign.d.ts", fileStr);
    info("parsed (" + nameCount + " names)")
}


const tdesignIcons = async () => {
    await generate()
        .then(() => success("Successfully generated new tdesign index.js"))
        .catch(err => console.error(err));
}

export default tdesignIcons
