const markdown = {
  config: (md) => {
    const { demoBlockPlugin } = require('vitepress-theme-demoblock')
    md.use(demoBlockPlugin, {
      cssPreprocessor: 'scss',
      scriptImports: ["import * as eIconPicker from '../../../components/index.ts'"],
      scriptReplaces: [
        { searchValue: /import ({.*}) from 'e-icon-picker'/g,
          replaceValue: (s, s1) => `const ${s1} = eIconPicker`
        }
      ]
    })
  }
}
export default markdown
