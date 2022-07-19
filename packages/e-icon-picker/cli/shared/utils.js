const pkg = require("../../package.json");
const getVersion = (version) => {
  if (version) {
    return version;
  } else {
    const versionNums = pkg.version.split('.');
    return versionNums.map((num, index) => index === versionNums.length - 1 ? +num + 1 : num).join('.');
  }
};

const formatToLine = (value) => {
  return value.replace(/([A-Z])/g, '-$1').toLowerCase()
}

const fileStr = `declare const _default: string[];
export default _default;
`;

exports.getVersion = getVersion;
exports.formatToLine = formatToLine;
exports.fileStr = fileStr;
