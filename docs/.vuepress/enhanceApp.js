// 通过该文件，把需要用的组件进行全局的注册，因为在markdown中的文件不能使用import引入组件，必须要提前注册好全局的组件
// import eIconPicker from '../../lib/index.js';
// 昨天发现同时注册多个组件的时候好像有问题，只好换一种方式来实现，将组件通过一个文件抛出，然后使用Vue.use去完成组件的注册
// import "../../lib/symbol.js"; //基本彩色图标库
// import '../../lib/index.css'; // 基本样式，包含基本图标
// import 'font-awesome/css/font-awesome.min.css'; //font-awesome 图标库
import 'element-ui/lib/theme-chalk/index.css'; //element-ui 图标库
import Element from 'element-ui';

export default ({
                    Vue,
                    options,
                    router,
                    siteData,
                    isServer
                }) => {
    import('../../lib/index.js').then(function (m) {
        Vue.use(m.default, {FontAwesome: false, ElementUI: false, eIcon: true, eIconSymbol: false});
        console.log(
            `%c e-icon-picker %c v${m.version} %c`,
            'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
            'background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
            'background:transparent'
        )
        Vue.use(Element);
    });
}
