# 图标显示组件
## eIcon 默认图标
<iconList :type="'eIcon'"/>

## fontAwesome 4.7 整理后的图标集
<iconList :type="'fontAwesome'"/>


## elementUI 整理后的图标集
<iconList :type="'elementUI'"/>


## eIconSymbol 图标集
<iconList :type="'eIconSymbol'"/>


### 属性

参数 | 说明 | 默认值 | 可选值
---|---|---|---
iconName |	图标名称	| 空 |	—
className | 自定义的图标前缀，例如 fa fa-xxx中的fa | 空 | —

### 事件

事件名称 | 说明 | 回调参数
---|---|---
click | 点击图标时发生 | 图标名称
