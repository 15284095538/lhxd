(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/news/home/home"],{"0686":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=o(a("89bf"));function o(t){return t&&t.__esModule?t:{default:t}}var s={components:{HeadTtop:n.default},data:function(){return{Title:"消息",backshow:!1,topsrc:"../../../static/images/back.png",list:[],onReachBottomshow:!0,page:1}},onLoad:function(){},onShow:function(){this.page=1,this.onReachBottomshow=!0,this.getdata()},onReachBottom:function(){this.onReachBottomshow&&(this.page++,this.getdata())},methods:{getdata:function(){var e=this,a={page:this.page,_token:t.getStorageSync("userinfo")._token};this.$http.HttpRequst.request(!0,"message/getMessage",a,"POST",function(t){1==e.page?e.list=t.data:""===typeof t.data?e.onReachBottomshow=!1:e.list.data=e.list.data.concat(t.data.data)})},details:function(e){t.navigateTo({url:"/pages/news/details/details?id="+e})}}};e.default=s}).call(this,a("649d")["default"])},"16d9":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",[a("HeadTtop",{attrs:{Title:t.Title,topsrc:t.topsrc,backshow:t.backshow,mpcomid:"a4d12892-0"}}),a("view",{staticClass:"newsList"},t._l(t.list.data,function(e,n){return a("view",{key:n,staticClass:"li",attrs:{eventid:"a4d12892-0-"+n},on:{tap:function(a){t.details(e.id)}}},[a("view",{staticClass:"describe"},[t._v(t._s(e.content))]),a("view",{staticClass:"time"},[t._v(t._s(e.update_time))])])}))],1)},o=[];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return o})},"5e1b":function(t,e,a){"use strict";a("a2e3");var n=s(a("b0ce")),o=s(a("f2ac"));function s(t){return t&&t.__esModule?t:{default:t}}Page((0,n.default)(o.default))},"817b":function(t,e,a){"use strict";a.r(e);var n=a("0686"),o=a.n(n);for(var s in n)"default"!==s&&function(t){a.d(e,t,function(){return n[t]})}(s);e["default"]=o.a},"8f1c":function(t,e,a){},b0a0:function(t,e,a){"use strict";var n=a("8f1c"),o=a.n(n);o.a},f2ac:function(t,e,a){"use strict";a.r(e);var n=a("16d9"),o=a("817b");for(var s in o)"default"!==s&&function(t){a.d(e,t,function(){return o[t]})}(s);a("b0a0");var i=a("2877"),c=Object(i["a"])(o["default"],n["a"],n["b"],!1,null,null,null);e["default"]=c.exports}},[["5e1b","common/runtime","common/vendor"]]]);