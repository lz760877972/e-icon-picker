const util = require("./util/httpsUtil")

async function generate() {
    //https://www.bootcdn.cn/font-awesome/
    let version = await util.getVersion("www.bootcdn.cn", "/font-awesome/");
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
    await util.writeFile(__dirname + "/fontawesome/", "pro", fa);
    console.log("parsed (" + namecount + " names)")
}

generate()
    .then(() => console.log("Successfully generated new index.js"))
    .catch(err => console.error(err));

