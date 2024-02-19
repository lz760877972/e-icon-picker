import {demoBlockPlugin} from 'vitepress-theme-demoblock'
import {MarkdownOptions} from "vitepress/dist/node";

const markdown: MarkdownOptions = {
    config: (md) => {
        md.use(demoBlockPlugin)
    }
}
export default markdown
