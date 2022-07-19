const util = require("../../shared/httpsUtil")
const fs = require("fs");
const {fileStr} = require("../../shared/utils");
const version = "2.15.7"

async function generate() {
  //https://www.bootcdn.cn/font-awesome/
  // let version = await util.getVersion("www.bootcdn.cn", "/font-awesome/");
  // console.log("Font Awesome v" + version);
  //https://unpkg.com/element-plus@1.0.2-beta.40/lib/theme-chalk/index.css
  let source = await util.getCss("unpkg.com", `/element-ui@${version}/lib/theme-chalk/index.css`)
  let namecount = 0;
  let el = [];
  util.parseEl(source, it => {
    el.push(it[0]);
    namecount++;
  });
  console.log(__dirname + "/data/")
  await util.writeFile(__dirname + "/ele/", `element-ui-${version}`, el);
  fs.writeFileSync(__dirname + "/ele/"+`element-ui-${version}.data.d.ts`, fileStr);
  console.log("parsed (" + namecount + " names)")
}

exports.elementUI = async () => {
  await generate()
    .then(() => console.log("Successfully generated new index.js"))
    .catch(err => console.error(err));
}

