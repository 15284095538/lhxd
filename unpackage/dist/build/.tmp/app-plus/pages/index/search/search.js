(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/search/search"],{"681a":function(t,n,e){"use strict";e.r(n);var o=e("cd41"),a=e("7ca9");for(var i in a)"default"!==i&&function(t){e.d(n,t,function(){return a[t]})}(i);e("bc69");var c=e("2877"),r=Object(c["a"])(a["default"],o["a"],o["b"],!1,null,null,null);n["default"]=r.exports},"6d42":function(t,n,e){},"7ca9":function(t,n,e){"use strict";e.r(n);var o=e("d5e5"),a=e.n(o);for(var i in o)"default"!==i&&function(t){e.d(n,t,function(){return o[t]})}(i);n["default"]=a.a},"82bf":function(t,n,e){"use strict";(function(t){e("a2e3"),e("921b");o(e("66fd"));var n=o(e("681a"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("6e42")["createPage"])},bc69:function(t,n,e){"use strict";var o=e("6d42"),a=e.n(o);a.a},cd41:function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement;t._self._c},a=[];e.d(n,"a",function(){return o}),e.d(n,"b",function(){return a})},d5e5:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=function(){return e.e("components/head/head").then(e.bind(null,"89bf"))},a=function(){return e.e("components/commodityList/commodityList").then(e.bind(null,"f794"))},i={components:{HeadTtop:o,commodityList:a},data:function(){return{Title:"搜索",backshow:!0,topsrc:"../../../static/images/back.png",SpList:[],keyword:""}},onReachBottom:function(){this.onReachBottomshow&&(this.page++,this.getdata())},onLoad:function(t){this.keyword=t.keyword,this.getdata()},methods:{getdata:function(){var n=this,e={page:this.page,keyword:this.keyword,long:t.getStorageSync("location").latitude+","+t.getStorageSync("location").longitude,_token:t.getStorageSync("userinfo")._token};this.$http.HttpRequst.request(!0,"Index/search",e,"POST",function(t){if(1==n.page){if("string"===typeof t.data)return!1;n.SpList=t.data.goods;for(var e=0;e<n.SpList.length;e++)n.SpList[e].length>4&&(n.SpList[e].initial="".concat(n.SpList[e].initial/DIVISOR,"万"))}else"string"===typeof t.data?n.onReachBottomshow=!1:n.SpList=n.SpList.concat(t.data.goods)})}}};n.default=i}).call(this,e("6e42")["default"])}},[["82bf","common/runtime","common/vendor"]]]);