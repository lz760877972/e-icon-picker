import * as antd from "@ant-design/icons-vue/lib/icons"
import {writeFile} from "../shared/httpsUtil";
import {fileStr} from "../shared/utils";
import fs from "fs"
import {info, success} from "../shared/logger";

async function generate() {
    let nameCount = 0;
    let antdIcon = [];
    for (const [key, component] of Object.entries(antd)) {
        antdIcon.push(`component ${key}`);
        nameCount++;
    }

    await writeFile(__dirname + "/antd/", "antd", antdIcon);

    fs.writeFileSync(__dirname + "/antd/antd.d.ts", fileStr);
    info("parsed (" + nameCount + " names)")
}


const antDesign = async () => {
    await generate()
        .then(() => success("Successfully generated new antd index.js"))
        .catch(err => console.error(err));
}

export default antDesign
