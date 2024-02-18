import * as antd from "@ant-design/icons-vue/lib/icons"
import {writeFile} from "../shared/httpsUtil";
import {fileStr} from "../shared/utils";
import fs from "fs"
import {error, info, success} from "../shared/logger";

async function generate() {
    let nameCount = 0;
    let antdIcon = [];
    for (const [key] of Object.entries(antd)) {
        antdIcon.push(`component ${key}`);
        nameCount++;
    }

    let basePath = __dirname + "/../../packages/icon"

    await writeFile(basePath + "/antd/", "antd", antdIcon);

    fs.writeFileSync(basePath + "/antd/antd.d.ts", fileStr);
    info("parsed (" + nameCount + " names)")
}


const antDesign = async () => {
    await generate()
        .then(() => success("Successfully generated new antd index.js"))
        .catch(err => error(err));
}

export default antDesign
