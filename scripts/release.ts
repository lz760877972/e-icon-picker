import path from "path";
import fsExtra from "fs-extra";
import {omit} from "lodash";
import shell from "shelljs";
import pkg from "../package.json"
import {getVersion} from "./shared/utils"


const outputDir = path.resolve(__dirname, '../lib');
const packagesDir = path.resolve(__dirname, '../packages');

const createPackageJson = async () => {
    const p: any = omit(pkg, 'scripts', 'devDependencies', 'workspaces', 'packageManager', 'lint-staged')
    p.version = getVersion();
    p.name = "e-icon-picker";
    const fileStr: string = JSON.stringify(p, null, 2);
    await fsExtra.outputFile(path.resolve(outputDir, `package.json`), fileStr, 'utf-8');
};

const release = async () => {
    await createPackageJson();
    shell.cd(outputDir);
    shell.mkdir('-p', 'theme');
    shell.mkdir('-p', 'icon');
    shell.mkdir('-p', 'utils');

    // shell.sed('-i', 'workspace:', '', path.resolve(outputDir, 'package.json'));
    shell.cp('-R', path.resolve(__dirname, '../README.md'), outputDir);
    shell.cp('-R', path.resolve(__dirname, '../LICENSE'), outputDir);
    shell.cp('-R', path.resolve(__dirname, './icon/ele'), path.resolve(outputDir, 'icon'));
    shell.cp('-R', path.resolve(__dirname, './icon/fontawesome'), path.resolve(outputDir, 'icon'));
    shell.cp('-R', path.resolve(__dirname, './icon/antd'), path.resolve(outputDir, 'icon'));
    shell.cp('-R', path.resolve(__dirname, './icon/tdesign'), path.resolve(outputDir, 'icon'));
    shell.cp('-R', path.resolve(__dirname, './icon/arco'), path.resolve(outputDir, 'icon'));

    shell.cp('-R', path.resolve(packagesDir, './utils/getSvg.js'), path.resolve(outputDir, 'utils/getSvg.js'));

    shell.cp('-R', path.resolve(packagesDir, 'default-icon'), path.resolve(outputDir, 'icon'));
    shell.cp('-R', path.resolve(packagesDir, 'style/theme.css'), path.resolve(outputDir, 'theme/theme.css'));
    // shell.exec('npm publish');
};
release()
