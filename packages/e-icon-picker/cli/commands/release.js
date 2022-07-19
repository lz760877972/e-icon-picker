const path = require('path');
const fsExtra = require('fs-extra');
const {omit} = require('lodash');
const shell = require('shelljs');

const outputDir = path.resolve(__dirname, '../../lib');

const pkg = require('../../package.json');
const {getVersion} = require("../shared/utils");


const createPackageJson = async (version) => {
  pkg.version = getVersion(version);
  const fileStr = JSON.stringify(omit(pkg, 'scripts', 'devDependencies'), null, 2);
  await fsExtra.outputFile(path.resolve(outputDir, `package.json`), fileStr, 'utf-8');
};

exports.release = async ({version}) => {
  await createPackageJson(version);
  shell.sed('-i', 'workspace:', '', path.resolve(outputDir, 'package.json'));
  shell.cp('-R', path.resolve(__dirname, '../../../../README.md'), outputDir);
  shell.cp('-R', path.resolve(__dirname, './icon/ele'), outputDir);
  shell.cp('-R', path.resolve(__dirname, './icon/fontawesome'), outputDir);
  // shell.cd(outputDir);
  // shell.mkdir('-p', 'theme');
  // shell.cp('-R', path.resolve(__dirname, '../../devui/theme/theme.scss'), path.resolve(outputDir, 'theme'));
  // shell.exec('npm publish');
};
