import {VERSION} from "../../packages/constants"
import {getVersion} from "./utils"

const isProd = process.env.NODE_ENV === 'production';
const nextVersion = getVersion();

export {
    VERSION,
    isProd,
    nextVersion
}
