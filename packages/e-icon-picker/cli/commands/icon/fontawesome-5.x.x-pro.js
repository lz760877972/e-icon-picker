const util = require("../../shared/httpsUtil")
const fs = require("fs");
const {fileStr} = require("../../shared/utils");

async function generate() {
  //https://www.bootcdn.cn/font-awesome/
  let version = await util.getVersion("www.bootcdn.cn", "/font-awesome/5.15.4/");
  console.log("Font Awesome v" + version);
  let source = await util.getCss("pro.fontawesome.com", "/releases/v" + version + "/css/all.css", {"Referer": "https://mo-mar.de"})
  let namecount = 0;
  let fa = [];
  util.parse(source, it => {
    if (it.length > 1) {
      fa.push(it[0] + " " + it[1]);
      namecount++;
    }
  });
  console.log(__dirname + "/data/")
  await util.writeFile(__dirname + "/fontawesome/", "pro" + "-" + version, fa);
  fs.writeFileSync(__dirname + "/fontawesome/"+`pro-${version}.data.d.ts`, fileStr);
  console.log("parsed (" + namecount + " names)")
}

exports.fontAwesome5XXPro = async () => {
  await generate()
    .then(() => console.log("Successfully generated new index.js"))
    .catch(err => console.error(err));
}
