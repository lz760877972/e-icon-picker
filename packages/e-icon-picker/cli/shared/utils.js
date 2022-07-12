const pkg = require("../../package.json");
const getVersion = (version) => {
  if (version) {
    return version;
  } else {
    const versionNums = pkg.version.split('.');
    return versionNums.map((num, index) => index === versionNums.length - 1 ? +num + 1 : num).join('.');
  }
};


exports.getVersion = getVersion;
