#!/usr/bin/env node
const {Command} = require('commander');
const {build} = require('./commands/build');
const {release} = require('./commands/release');
const {version} = require('../package.json');

const program = new Command();


program
  .command('build')
  .description('打包组件库')
  .action(build);


program
  .command('release')
  .option('-v --version <version>', '版本号')
  .description('发布npm包')
  .action(release);

program.parse().version(version);
