import * as layui from '@layui/icons-vue'
import {writeFile} from "../shared/httpsUtil";
import {fileStr} from "../shared/utils";
import fs from "fs"
import {error, info, success} from "../shared/logger";

async function generate() {
    let nameCount = 0;
    let layuiIcons: string[] = [];
    for (const [key] of Object.entries(layui)) {
        if (key === 'LayIcon' || key === 'LayIconList') {
            continue;
        }
        layuiIcons.push(`component ${key}`);
        nameCount++;
    }
    let basePath = __dirname + "/../../packages/icon"
    await writeFile(basePath + "/layui-vue/", "layui-vue", layuiIcons);

    fs.writeFileSync(basePath + "/layui-vue/layui-vue.d.ts", fileStr);
    info("parsed (" + nameCount + " names)")
}


const layuiVue = async () => {
    await generate()
        .then(() => success("Successfully generated new layui-vue index.js"))
        .catch(err => error(err));
}

export default layuiVue
