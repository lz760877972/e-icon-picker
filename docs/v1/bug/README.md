# 常见问题
## 图标列表不显示，但是可以点击
![图标列表不显示](https://gitee.com/cnovel/pic/raw/master/img/202111131730447.png)

这个bug首先在`vue-element-admin`中发现，这个问题的主要原因是`vue`的`2.6.13`以前的版本和`2.6.13`以及`2.6.14`版本之间的问题，`vue`也没给出解决的办法。

![vue bug](https://gitee.com/cnovel/pic/raw/master/img/202111131732650.png)

这个问题最简单的办法就是把你的`vue`版本和`vue-template-compiler`版本升级到`2.6.14`；如果你不能去升级你的`vue`版本，那么这里给出一个其他的解决办法，就是通过以下的方式去使用组件：
```vue
<e-icon-picker>
    <template #prepend="{icon}">
      <e-icon :icon-name="icon" class="e-icon" />
    </template>
    <template #icon="{icon}">
      <e-icon :icon-name="icon" class="e-icon" />
    </template>
</e-icon-picker>

<style>
.e-icon {
  font-size: 16px;
}
</style>
```
**但这个方式会造成组件样式变化，需要用户自己调整**