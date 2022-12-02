# 主题
## 通过 CSS 变量设置
CSS 变量是一个非常有用的功能，几乎所有浏览器都支持。 （IE：啊这？)

> 从[使用CSS自定义属性(变量) | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)了解更多信息

这意味着你可以动态地改变组件内的个别变量，以便更好地自定义组件样式，而不需要修改 SCSS 文件重新编译一次。

## 默认主题
> 组件默认内置两套主题样式，样式名为`light`和`dark`，具体使用请查看示例。

```css
@import 'e-icon-picker/theme/theme.css';
```

## 全部css变量

```css
.dark {
    /*popper背景颜色*/
    --e-popover-background-color: #ffffff;
    /*popper padding大小*/
    --e-popover-padding: 32px;
    /*popper字体颜色*/
    --e-popover-color: #333333;
    /*popper圆角半径*/
    --e-popover-border-radius: 6px;
    /*popper边框样式*/
    --e-popover-border-style: solid;
    --e-popover-border-width: 1px;
    --e-popover-border-color: #eeeeee;

    /*popper阴影*/
    --e-popover-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
    /*popper hover状态下背景颜色*/
    --e-popover-background-color-hover: #ffffff;


    /*图标字体颜色*/
    --e-icon-color: #333333;
    /*滑道背景颜色*/
    --e-thumb-background-color: #303133;
    /*输入框前图标边框颜色*/
    --e-input-prefix-icon-border-color: #dcdfe6;
    /*输入框前图标背景颜色*/
    --e-input-prefix-icon-background-color: #f5f7fa;
    /*输入框背景颜色*/
    --e-input-inner-background-color: #ffffff;
    /*输入框边框颜色*/
    --e-input-inner-border-color: #dcdfe6;
    /*输入框字体颜色*/
    --e-input-inner-color: #606266;
    /*输入框获取焦点时边框颜色*/
    --e-input-inner-focus-border-color: #409EFF;
    /*输入框禁用时背景颜色*/
    --e-input-inner-disabled-background-color: #f5f7fa;
    /*输入框禁用时边框颜色*/
    --e-input-inner-disabled-border-color: #dcdfe6;
    /*输入框禁用时字体颜色*/
    --e-input-inner-disabled-color: #c0c4cc;
    /*图标选择器列表图标宽度*/
    --e-icon-picker-icon-list-width: 30px;
    /*图标选择器列表图标外边距*/
    --e-icon-picker-icon-list-margin: 5px;
    /*图标选择器列表图标大小*/
    --e-icon-picker-icon-list-font-size: 20px;
}
```
