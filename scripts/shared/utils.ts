import {VERSION} from "../../packages/constants"

const getNextVersion = (version?: string | undefined): string => {
    if (version) {
        return version;
    } else {
        const versionNums = VERSION.split('.');
        return versionNums.map((num, index) => index === versionNums.length - 1 ? +num + 1 : num).join('.');
    }
};
const getVersion = (version?: string | undefined): string => {
    if (version) {
        return version;
    } else {
        return VERSION
    }
};

const formatToLine = (value: string): string => {
    return value.replace(/([A-Z])/g, '-$1').toLowerCase()
}

const fileStr = `declare const _default: string[];
export default _default;
`;

export {
    getVersion,
    getNextVersion,
    formatToLine,
    fileStr
}
