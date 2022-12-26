import fs from "fs";
import * as logger from "./logger";

const fetch = (options: any) => new Promise<any>((resolve, reject) => {
    require("https").get(options, function (response: any) {
        let body = "";
        if (response.statusCode !== 200) {
            reject(new Error("Request failed. Status code: " + response.statusCode + "\n" + options.host + options.path));
            response.resume();
            return;
        }
        response.on("error", (err: any) => reject(err));
        response.on("data", (chunk: any) => body += chunk);
        response.on("end", () => resolve(body));
    });
});

async function getVersion(host: string, path: string) {
    let changelog: any = await fetch({host: host, path: path});

    let version = (changelog.match(/(\d+\.\d+\.\d+)/g))[0];
    if (version.length < 3) {
        throw new Error("Couldn't parse version");
    }
    logger.info("Font Awesome v" + version);
    return version;
}

function parse(source: any, callback: Function) {
    let main = source.match(/(fa-[a-z0-9\-]+(?:(:before|:after),\.fa-[a-z0-9\-]+)*)(:before|:after)\{content:"\\([0-9a-f]+)"|(fa[a-z]?)\.(fa-[a-z0-9\-]+(?:(:before|:after),\.fa-[a-z0-9\-]+)*)(:before|:after)\{content:"\\([0-9a-f]+)"/g);
    if (!main) {
        logger.warning("Couldn't parse icons");
        return;
    }
    main.forEach((it: any) => {
        let icon = it.match(/(fa-[a-z0-9\-]+)|(fa[a-z]?)\.(fa-[a-z0-9\-]+)/g);
        let f = icon[0].split(".");
        callback(f);
    })
}

function parseEl(source: any, callback: Function) {
    let main = source.match(/(el-[a-z0-9\-]+(?:(:before|:after),\.el-[a-z0-9\-]+)*)(:before|:after)/g);
    if (!main) {
        logger.warning("Couldn't parse icons");
        return;
    }
    main.forEach((it: any) => {
        let icon = it.match(/(el-icon-[a-z0-9\-]+)/g);
        icon && icon.length > 0 && callback(icon);
    })
}

async function getCss(host: string, path: string, headers?: any) {
    return fetch({
        host: host,
        path: path,
        headers: headers
    });
}

async function writeFile(path: string, name: string, data: any) {
    if (!fs.existsSync(path)) {
        fs.mkdir(path, (err: any) => logger.error(err));
    }
    logger.success(path + name + ".js")
    fs.writeFileSync(path + name + ".js", 'export default ' + JSON.stringify(data));
}

export {
    fetch,
    getVersion,
    parse,
    parseEl,
    getCss,
    writeFile
}
