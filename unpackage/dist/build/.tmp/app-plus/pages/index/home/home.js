(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/home/home"],{"5c31":function(t,i,e){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a=n(e("f794"));function n(t){return t&&t.__esModule?t:{default:t}}var s=1e4,o={components:{commodityList:a.default},data:function(){return{imglist:[],menuLink:[],SpList:[],onReachBottomshow:!0,page:1}},onLoad:function(){t.getStorage({key:"userinfo",fail:function(i){t.redirectTo({url:"/pages/login/login"})}})},onShow:function(){this.page=1,this.onReachBottomshow=!0,this.getdata()},onReachBottom:function(){this.onReachBottomshow&&(this.page++,this.getdata())},methods:{getdata:function(){var i=this,e={page:this.page,_token:t.getStorageSync("userinfo")._token};this.$http.HttpRequst.request(!0,"index/index",e,"POST",function(t){if(1==i.page){if(i.imglist=t.data.img,i.menuLink=t.data.classify,"string"===typeof t.data.goods)return!1;i.SpList=t.data.goods;for(var e=0;e<i.SpList.length;e++)i.SpList[e].length>4&&(i.SpList[e].initial="".concat(i.SpList[e].initial/s,"万"))}else"string"===typeof t.data.goods?i.onReachBottomshow=!1:i.SpList=i.SpList.concat(t.data.goods)})},ListClick:function(i,e){t.navigateTo({url:"/pages/index/list/list?id="+i+"&text="+e})}}};i.default=o}).call(this,e("649d")["default"])},6770:function(t,i,e){"use strict";e("a2e3");var a=s(e("b0ce")),n=s(e("70e6"));function s(t){return t&&t.__esModule?t:{default:t}}Page((0,a.default)(n.default))},"70e6":function(t,i,e){"use strict";e.r(i);var a=e("8514"),n=e("e97b");for(var s in n)"default"!==s&&function(t){e.d(i,t,function(){return n[t]})}(s);e("a5b7");var o=e("2877"),c=Object(o["a"])(n["default"],a["a"],a["b"],!1,null,null,null);i["default"]=c.exports},8514:function(t,i,e){"use strict";var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("view",{staticClass:"body"},[e("view",{staticClass:"swiper"},[e("swiper",{attrs:{"indicator-dots":"true","indicator-color":"rgba(255,255,255,0.3)","indicator-active-color":"rgba(255,255,255,0.8)",autoplay:"true",interval:"3000",circular:"true"}},t._l(t.imglist,function(t,i){return e("swiper-item",{key:i,staticClass:"item",attrs:{mpcomid:"2f4c68a4-0-"+i}},[e("image",{attrs:{src:t.img}})])}))],1),e("view",{staticClass:"menuLink"},t._l(t.menuLink,function(i,a){return e("view",{key:a,staticClass:"li",attrs:{eventid:"2f4c68a4-0-"+a},on:{tap:function(e){t.ListClick(i.id,i.title)}}},[e("view",{staticClass:"img"},[e("image",{attrs:{src:i.img_url,mode:""}})]),e("view",{staticClass:"text"},[t._v(t._s(i.title))])])})),t._m(0),e("commodityList",{attrs:{SpList:t.SpList,mpcomid:"2f4c68a4-1"}})],1)},n=[function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("view",{staticClass:"RecommendHot"},[e("view",{staticClass:"box"},[e("view",{staticClass:"text"},[t._v("热门推荐")]),e("view",{staticClass:"link"},[t._v("更多>")])])])}];e.d(i,"a",function(){return a}),e.d(i,"b",function(){return n})},a5b7:function(t,i,e){"use strict";var a=e("b98e"),n=e.n(a);n.a},b98e:function(t,i,e){},e97b:function(t,i,e){"use strict";e.r(i);var a=e("5c31"),n=e.n(a);for(var s in a)"default"!==s&&function(t){e.d(i,t,function(){return a[t]})}(s);i["default"]=n.a}},[["6770","common/runtime","common/vendor"]]]);