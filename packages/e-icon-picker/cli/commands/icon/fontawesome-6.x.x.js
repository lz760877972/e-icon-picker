const util = require("../../shared/httpsUtil")
const fs = require("fs");
const {fileStr} = require("../../shared/utils");

async function generate() {
  let changelog = await fetch({
    host: "www.bootcdn.cn",
    path: "/font-awesome/"
  });
  let version = (changelog.match(/(\d+\.\d+\.\d+)/g))[0];
  let names = changelog.match(/\/ajax\/libs\/font-awesome\/.*\/css\/(.*?).min.css/g).slice(0);
  console.log(names)
  if (version.length < 3) {
    throw new Error("Couldn't parse version");
  }

  console.log("Font Awesome v" + version);

  for (const name of names) {
    /* if (name === "/ajax/libs/font-awesome/5.15.4/css/all.min.css") {
         continue;
     }*/
    console.log(name)

    let source = await util.getCss("cdn.bootcdn.net", name)

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
    if (fa.length === 0) {
      continue;
    }

    let name2 = name.split("/");
    name2 = name2[name2.length - 1];
    name2 = name2.replace(".min.css", "");
    await util.writeFile(__dirname + "/fontawesome/", name2 + "-" + version, fa);
    fs.writeFileSync(__dirname + "/fontawesome/"+`${name2}-${version}.data.d.ts`, fileStr);
    console.log("parsed (" + namecount + " names)")
  }
}

exports.fontAwesome6XX = async () => {
  await generate()
    .then(() => console.log("Successfully generated new index.js"))
    .catch(err => console.error(err));
}
