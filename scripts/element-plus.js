const util = require("./util/httpsUtil")

async function generate() {
    let source = await util.getCss("unpkg.com", "/element-plus@1.0.2-beta.40/lib/theme-chalk/index.css")
    let namecount = 0;
    let el = [];
    util.parseEl(source, it => {
        el.push(it[0]);
        namecount++;
    });
    console.log(__dirname + "/data/")
    await util.writeFile(__dirname + "/ele/", "element-plus", el);
    console.log("parsed (" + namecount + " names)")
}

generate()
    .then(() => console.log("Successfully generated new index.js"))
    .catch(err => console.error(err));

