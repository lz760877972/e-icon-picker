# 更新日志
#### v2.0.8
1. 修复`zIndex`失效问题 [I4N001](https://gitee.com/cnovel/e-icon-picker/issues/I4N001)。
2. 修复已知`bug`。
3. 更新依赖。

#### v2.0.7
1. 新增`destroyIconList`和`createIconList`函数，可以销毁和重新创建列表。
2. 新增支持图片方式的图标 [ReloM](https://gitee.com/ReloM) 提供思路。
3. 修复已知bug。
4. 更新依赖。

#### v2.0.6
1. 修复当使用cdn时，组件图标列表没有问题。

#### v2.0.5
1. 添加外部图片等链接图标。
2. 新增组件中设置`zIndex`属性，但会是全局影响。
3. 其他优化
4. 更新文档

#### v2.0.4
1. 修复当`element ui`的`dialog`使用时，出现弹层被遮挡问题
2. 添加弹层`zIndex`设置参数
3. 更新文档

#### v2.0.3
1. 修复当组件局部使用时，不能正常使用问题 [I3YD2K](https://gitee.com/cnovel/e-icon-picker/issues/I3YD2K)
2. 修改文档中存在的一些错误问题 [I3YD2K](https://gitee.com/cnovel/e-icon-picker/issues/I3YD2K)
3. 更新文档

#### v2.0.2
1. 新增图标选中高亮状态 [I3S4AC](https://gitee.com/cnovel/e-icon-picker/issues/I3S4AC)
2. 新增图标为空显示的内容，可以通过prop传入[I3S07X](https://gitee.com/cnovel/e-icon-picker/issues/I3S07X)

#### v2.0.0
1. `2.0.0` 对应 `vue3.0` 正式发布
2. 更新新文档

#### v2.0.0-beta.6
1. 修复`eIcon`组件点击事件，事件冒泡问题
2. 更新新文档

#### v2.0.0-beta.5
1. 添加change事件
2. 修复修改`options`信息时不能更新数据显示问题

#### v2.0.0-beta.3
1. 调整目录以及添加自动更新新字体的功能
2. 修复因body的边距为`0`时出现的横向滚动条问题
3. 新增 `fontawesome-5.x.x` 图标的支持 [I3BBKC](https://gitee.com/cnovel/e-icon-picker/issues/I3BBKC)
4. 更新新文档

#### v2.0.0-alpha.4
1. vue3版本测试 [I2DWA0](https://gitee.com/cnovel/e-icon-picker/issues/I2DWA0)

#### v1.0.18
1. 更新依赖

#### v1.0.17
1. 感谢[元谷](https://gitee.com/yuangu) PR [可自定义的icon](https://gitee.com/cnovel/e-icon-picker/pulls/3/commits)。
2. 修改为国内cdn地址
3. 更新文档

#### v1.0.16
1. 感谢[gyy](https://gitee.com/guyangyang) PR [icon增加title，提高辨识度](https://gitee.com/cnovel/e-icon-picker/commit/19eeee1e6efcc0771f78ed124ff81888357acbdd)。
2. 更新文档

#### v1.0.15
1. 细节优化。

#### v1.0.11
1. 新增针对svg图标的支持。
2. 升级支持cdn引入。
3. 更新依赖。
4. 其他优化。

#### v1.0.8
1. 将所需的 Element UI 组件全部打入到项目中，不在需要安装 Element UI 组件。
2. 将 Element UI 和 font-awesome 图标库分离，可按需引用，减少组件库大小。
3. 将iconfont彩色图标分离，减少组件库的基本大小，可按需引用。

#### v1.0.5
1. 更新 Element UI 版本以及 VUE 等版本。
2. 添加iconfont彩色图标的支持。
3. 添加三组iconfont彩色图标。

#### v1.0.4
1. 修复代码库存在es6浏览器不兼容的语法。
2. 添加iconfont图标库支持。

#### v1.0.3
1. 修复 [I1CSU0](https://gitee.com/cnovel/e-icon-picker/issues/I1CSU0) 问题。
2. 更新项目依赖项。

#### v1.0.2
1. 修复ie浏览器下无法正常关闭问题。
2. 删除项目无用依赖。
3. 对项目webpack配置进行优化。

#### v1.0.0
1. 加入使用文档。
2. 添加控件内动态添加或者删除图标。
3. 添加对图标进行去重。
4. 添加图标选择器示例。
5. 修复添加或者删除图标时类型判断问题。
6. 修复每次打开图标选择器时滚动条和位置不统一问题。
7. 其他优化

#### v0.0.5
1. 添加全局初始化参数。
2. 添加组件使用时局部参数。
3. 对fontAwesome和elementUI图标分开加载。
4. 加入自定义图标列表参数。
5. 修改控件图标可搜索功能。
6. 添加控件选择后可清空。
7. 其他优化。


#### v0.0.1
1. 初始化项目
