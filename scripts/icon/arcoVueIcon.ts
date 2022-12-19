import * as  ArcoVueIcon from '@arco-design/web-vue/es/icon';
import {writeFile} from "../shared/httpsUtil";
import {fileStr} from "../shared/utils";
import fs from "fs"
import {info, success} from "../shared/logger";

async function generate() {
    let nameCount = 0;
    let antdIcon = [];

    for (const [key, component] of Object.entries(ArcoVueIcon)) {
        if (key === "default" || key === "install") {
            continue
        }
        antdIcon.push(`component ${key}`);
        nameCount++;
    }

    await writeFile(__dirname + "/arco/", "arco", antdIcon);

    fs.writeFileSync(__dirname + "/arco/arco.d.ts", fileStr);
    info("parsed (" + nameCount + " names)")
}


const ArcoVue = async () => {
    await generate()
        .then(() => success("Successfully generated new arco index.js"))
        .catch(err => console.error(err));
}

export default ArcoVue