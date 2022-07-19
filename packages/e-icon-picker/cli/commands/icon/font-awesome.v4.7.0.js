const util = require("../../shared/httpsUtil")
const fs = require("fs");
const {fileStr} = require("../../shared/utils");

async function generate() {
  //https://www.bootcdn.cn/font-awesome/
  // let version = await util.getVersion("www.bootcdn.cn", "/font-awesome/");
  // console.log("Font Awesome v" + version);
  //https://unpkg.zhimg.com/font-awesome@4.7.0/css/font-awesome.min.css
  let source = await util.getCss("unpkg.com", "/font-awesome@4.7.0/css/font-awesome.min.css")
  let namecount = 0;
  let fa = [];
  util.parse(source, it => {
    if (it.length > 1) {
      fa.push(it[0] + " " + it[1]);
    } else {
      fa.push("fa " + it[0]);
    }
    namecount++;
  });
  console.log(__dirname + "/data/")
  await util.writeFile(__dirname + "/fontawesome/", "font-awesome.v4.7.0", fa);
  fs.writeFileSync(__dirname + "/fontawesome/font-awesome.v4.7.0.data.d.ts", fileStr);
  console.log("parsed (" + namecount + " names)")
}

exports.fontAwesome470 = async () => {
  await generate()
    .then(() => console.log("Successfully generated new index.js"))
    .catch(err => console.error(err));
}
