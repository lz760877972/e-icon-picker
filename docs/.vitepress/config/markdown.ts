import {demoBlockPlugin} from 'vitepress-theme-demoblock'

const markdown = {
    config: (md) => {
        md.use(demoBlockPlugin, {
            cssPreprocessor: 'scss',
            customStyleTagName: 'style lang="scss"', // style标签会解析为<style lang="less"><style>
            scriptImports: [
                "import * as eIconPicker from 'e-icon-picker/index.mjs'",
                "import eIcon from 'e-icon-picker/icon/default-icon/eIconList.js'",
                "import elIcon from 'e-icon-picker/icon/ele/element-plus.js'",
                "import iconfontJson from '@public/css/iconfont.json'",
                "import svgNameList from 'virtual:svg-icons-names'",
            ],
            scriptReplaces: [
                {
                    searchValue: /import (.*) from 'e-icon-picker\/icon\/default-icon\/eIconList.js'/g,
                    replaceValue: (s, s1) => {
                        return `const ${s1} = eIcon`
                    }
                },
                {
                    searchValue: /import (.*) from 'e-icon-picker\/icon\/ele\/element-plus.ts'/g,
                    replaceValue: (s, s1) => {
                        return `const ${s1} = elIcon`
                    }
                },
                {
                    searchValue: /import '..\/..\/public\/js\/iconfont.js'/g,
                    replaceValue: (s, s1) => {
                        return ``
                    }
                },
                {
                    searchValue: /import 'virtual:svg-icons-register'/g,
                    replaceValue: (s, s1) => {
                        return ``
                    }
                },
                {
                    searchValue: /import (.*) from '..\/..\/public\/css\/iconfont.json'/g,
                    replaceValue: (s, s1) => {
                        return `const ${s1} = iconfontJson`
                    }
                },
                {
                    searchValue: /import ({.*}) from 'e-icon-picker'/g,
                    replaceValue: (s, s1) => `const ${s1} = eIconPicker`
                },
                {
                    searchValue: /import (.*) from 'virtual:svg-icons-names'/g,
                    replaceValue: (s, s1) => `const ${s1} = svgNameList`
                }
            ],
            styleReplaces: [
                {
                    searchValue: "@import 'e-icon-picker/theme/theme.css'",
                    replaceValue: (s) => {
                        return `@import 'e-icon-picker/theme/theme.css'`
                    }
                },
                {
                    searchValue: "@import '../../public/css/iconfont.css'",
                    replaceValue: (s) => {
                        return `@import '@public/css/iconfont.css'`
                    }
                },
            ]
        })
    }
}
export default markdown
