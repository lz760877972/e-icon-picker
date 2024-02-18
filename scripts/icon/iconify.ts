import fs from "fs"
import {error, info, success} from "../shared/logger";
import path from "path";
import {writeFile} from "../shared/httpsUtil";
import {fileStr} from "../shared/utils";


const getAllFiles = (dirPath: string) => {
    let url = path.join(__dirname, dirPath);
    const files = [];
    // 读取当前目录下的文件列表
    const dirList = fs.readdirSync(url);

    for (let i = 0; i < dirList.length; i++) {
        const filePath = path.join(url, dirList[i]);

        if (fs.statSync(filePath).isDirectory()) {
            // 如果是子目录则递归调用getAllFiles()函数
            files.push(...getAllFiles(filePath));
        } else {
            // 将非目录类型的文件添加到files数组中
            files.push(filePath);
        }
    }
    return files;
}


async function generate() {
    for (const filePath of getAllFiles("../../node_modules/@iconify/json/json")) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        let parse: any = JSON.parse(fileContent);
        let prefix: string = parse.prefix;
        let icons: string[] = Object.keys(parse.icons);
        const filename = path.basename(filePath).replace(".json", "");

        let iconList = icons.map(icon => `${prefix}:${icon}`)
        let basePath = __dirname + "/../../packages/icon"
        await writeFile(`${basePath}/iconify/`, filename, iconList);

        fs.writeFileSync(`${basePath}/iconify/${filename}.d.ts`, fileStr);
        info("parsed (" + filePath + " names)")
    }
}

const iconify = async () => {
    await generate()
        .then(() => success("Successfully generated new index.js"))
        .catch(err => error(err));
}
export default iconify
