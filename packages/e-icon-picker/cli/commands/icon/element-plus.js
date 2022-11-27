const util = require("../../shared/httpsUtil")
const {fileStr} = require("../../shared/utils")
const fs = require("fs");
const logger = require("../../shared/logger");

async function generate() {//https://cdn.bootcdn.net/ajax/libs/element-plus/1.0.2-beta.40/theme-chalk/index.css
  let source = await util.getCss("cdn.bootcdn.net", "/ajax/libs/element-plus/1.0.2-beta.40/theme-chalk/index.min.css")
  let namecount = 0;
  let el = [];
  util.parseEl(source, it => {
    el.push(it[0]);
    namecount++;
  });
  logger.info(__dirname + "/data/")
  await util.writeFile(__dirname + "/ele/", "element-plus", el);

  fs.writeFileSync(__dirname + "/ele/element-plus.d.ts", fileStr);
  logger.info("parsed (" + namecount + " names)")
}


exports.elementPlus = async () => {
  await generate()
    .then(() => logger.success("Successfully generated new index.js"))
    .catch(err => console.error(err));
}

