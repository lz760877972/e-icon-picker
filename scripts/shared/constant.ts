import {VERSION} from "../../packages/constants"
import {getNextVersion} from "./utils"

const isProd = process.env.NODE_ENV === 'production';
const nextVersion = getNextVersion();

export {
    VERSION,
    isProd,
    nextVersion
}
