(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/classification/home/home"],{"053b":function(t,e,i){"use strict";i.r(e);var s=i("dd65"),n=i("8ee6");for(var a in n)"default"!==a&&function(t){i.d(e,t,function(){return n[t]})}(a);i("591e");var o=i("2877"),c=Object(o["a"])(n["default"],s["a"],s["b"],!1,null,null,null);e["default"]=c.exports},"2adc":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=n(i("89bf"));function n(t){return t&&t.__esModule?t:{default:t}}var a=1070,o={data:function(){return{Title:"分类",backshow:!1,menulist:[],menulistindex:0,id:"",scrollviewHeight:"",GetwindowWidth:"",spList:[],page:1,onReachBottomshow:!0}},components:{HeadTtop:s.default},onLoad:function(){var e=this;t.getSystemInfo({success:function(t){e.GetwindowWidth=t.windowWidth}}),this.scrollviewHeight=a*this.GetwindowWidth/750,this.getmenulist()},methods:{getmenulist:function(){var e=this,i={pid:0,_token:t.getStorageSync("userinfo")._token};this.$http.HttpRequst.request(!0,"index/classify",i,"POST",function(t){200===t.code&&(e.menulist=t.data,e.id=t.data[0].id,e.getspList())})},getspList:function(){var e=this,i={page:e.page,classify:e.id,pagesize:e.pagesize,_token:t.getStorageSync("userinfo")._token};this.$http.HttpRequst.request(!0,"index/goods_list",i,"POST",function(t){200===t.code&&(1==e.page?"string"===typeof t.data?e.spList=[]:e.spList=t.data:"string"===typeof t.data?e.onReachBottomshow=!1:e.spList=e.spList.concat(t.data))})},containerpage:function(){this.onReachBottomshow&&(this.page++,this.getspList())},menuLiClick:function(t,e){this.menulistindex=t,this.id=e,this.page=1,this.onReachBottomshow=!0,this.getspList()},detailsClick:function(e){t.navigateTo({url:"/pages/index/details/details?goods_id="+e})}}};e.default=o}).call(this,i("649d")["default"])},"591e":function(t,e,i){"use strict";var s=i("de4d"),n=i.n(s);n.a},"8ee6":function(t,e,i){"use strict";i.r(e);var s=i("2adc"),n=i.n(s);for(var a in s)"default"!==a&&function(t){i.d(e,t,function(){return s[t]})}(a);e["default"]=n.a},c065:function(t,e,i){"use strict";i("a2e3");var s=a(i("b0ce")),n=a(i("053b"));function a(t){return t&&t.__esModule?t:{default:t}}Page((0,s.default)(n.default))},dd65:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",[i("HeadTtop",{attrs:{Title:t.Title,backshow:t.backshow,mpcomid:"193f8c0a-0"}}),i("view",{staticClass:"content"},[i("view",{staticClass:"menu"},[i("scroll-view",{style:{height:t.scrollviewHeight+"px"},attrs:{"scroll-y":""}},t._l(t.menulist,function(e,s){return i("view",{key:s,staticClass:"li",class:t.menulistindex===s?"active":"",attrs:{eventid:"193f8c0a-0-"+s},on:{tap:function(i){t.menuLiClick(s,e.id)}}},[t._v(t._s(e.title))])}))],1),i("view",{staticClass:"container"},[i("scroll-view",{style:{height:t.scrollviewHeight+"px"},attrs:{"scroll-y":"",eventid:"193f8c0a-2"},on:{scrolltolower:function(e){t.containerpage()}}},[i("view",{staticClass:"ul"},t._l(t.spList,function(e,s){return i("view",{key:s,staticClass:"li",attrs:{eventid:"193f8c0a-1-"+s},on:{tap:function(i){t.detailsClick(e.goods_id)}}},[i("view",{staticClass:"img"},[i("image",{attrs:{src:e.cover,mode:""}})]),i("view",{staticClass:"text"},[t._v(t._s(e.goods_name))])])}))])],1)])],1)},n=[];i.d(e,"a",function(){return s}),i.d(e,"b",function(){return n})},de4d:function(t,e,i){}},[["c065","common/runtime","common/vendor"]]]);