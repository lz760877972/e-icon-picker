import {success} from "./shared/logger";
import path from "path";
import {nextVersion} from "./shared/constant";
import fsExtra from "fs-extra";

function main() {
    const outFile = path.resolve(__dirname, '../packages/constants/version.ts');
    const fileStr = `export const VERSION = '${nextVersion}'`
    fsExtra.outputFile(outFile, fileStr, 'utf-8').then(() => success('update version success'));
}

main()
