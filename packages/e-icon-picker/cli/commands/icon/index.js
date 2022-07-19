const {elementPlus} = require("./element-plus");
const {elementUI} = require("./element-ui");
const {fontAwesome470} = require("./font-awesome.v4.7.0");
const {fontAwesome5XX} = require("./fontawesome-5.x.x");
const {fontAwesome5XXPro} = require("./fontawesome-5.x.x-pro");
const {fontAwesome6XX} = require("./fontawesome-6.x.x");


exports.icon = async () => {
  await elementPlus();
  await elementUI();
  await fontAwesome470();
  await fontAwesome5XX();
  await fontAwesome5XXPro();
  await fontAwesome6XX();
}
