(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{557:function(n,o,e){"use strict";e.r(o);var i={name:"example3",data:function(){return{icon:"",options:{FontAwesome:!1,ElementUI:!1,addIconList:[],removeIconList:[]}}},mounted:function(){this.$refs.iconPicker.addIcon("fa fa-slack"),this.$refs.iconPicker.removeIcon("fa fa-slack");var n=this;setTimeout((function(){n.options.addIconList.push("el-icon-message-solid"),n.options.removeIconList.push("removeIconList"),console.log("定时任务触发")}),5e3)}},t=e(23),c=Object(t.a)(i,(function(){var n=this,o=n.$createElement,e=n._self._c||o;return e("div",{staticStyle:{margin:"0 auto",width:"500px"}},[e("h2",[n._v("组件内动态设置以及方法展示")]),n._v(" "),e("e-icon-picker",{ref:"iconPicker",attrs:{options:n.options,"default-icon":"el-icon-edit",placeholder:"请选择",size:"medium"},model:{value:n.icon,callback:function(o){n.icon=o},expression:"icon"}}),n._v("\n  名称："+n._s(n.icon)+"\n  "),e("e-icon",{attrs:{"icon-name":n.icon}})],1)}),[],!1,null,null,null);o.default=c.exports}}]);