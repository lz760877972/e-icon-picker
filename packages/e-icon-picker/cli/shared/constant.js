const {resolve} = require('path');
const {version} = require('../../package.json');
const {getVersion} = require("./utils");

exports.VERSION = version;
exports.isProd = process.env.NODE_ENV === 'production';
exports.nextVersion = getVersion(version);
