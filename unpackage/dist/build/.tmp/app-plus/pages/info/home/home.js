(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/info/home/home"],{"557f":function(t,e,s){"use strict";s("a2e3");var i=n(s("b0ce")),a=n(s("c7da"));function n(t){return t&&t.__esModule?t:{default:t}}Page((0,i.default)(a.default))},"567b":function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",[s("view",{staticClass:"userinfo"},[s("image",{staticClass:"infoBg",attrs:{src:"../../../static/images/intop.png",mode:""}}),s("view",{staticClass:"userAvatarUrl"},[s("image",{attrs:{src:t.header,mode:""}})]),s("view",{staticClass:"info",attrs:{eventid:"5f02205c-0"},on:{tap:function(e){t.modifyinfo()}}},[s("view",{staticClass:"text"},[t._v(t._s(t.username))]),s("view",{staticClass:"text"},[s("image",{attrs:{src:"../../../static/images/phone.png",mode:""}}),t._v(t._s(t.tel))])]),s("image",{staticClass:"more",attrs:{src:"../../../static/images/info.png",mode:"",eventid:"5f02205c-1"},on:{tap:function(e){t.modifyinfo()}}})]),s("view",{staticClass:"menuLink"},[s("view",{staticClass:"li",attrs:{eventid:"5f02205c-2"},on:{tap:function(e){t.orderClick()}}},[s("image",{staticClass:"icon",attrs:{src:"../../../static/images/my1.png",mode:""}}),s("text",{staticClass:"text"},[t._v("我的订单")]),s("image",{staticClass:"link",attrs:{src:"../../../static/images/myright.png",mode:""}})]),s("view",{staticClass:"li",attrs:{eventid:"5f02205c-3"},on:{tap:function(e){t.depositClick()}}},[s("image",{staticClass:"icon",attrs:{src:"../../../static/images/my2.png",mode:""}}),s("text",{staticClass:"text"},[t._v("我的押金")]),s("image",{staticClass:"link",attrs:{src:"../../../static/images/myright.png",mode:""}})]),s("view",{staticClass:"li",attrs:{eventid:"5f02205c-4"},on:{tap:function(e){t.interests()}}},[s("image",{staticClass:"icon",attrs:{src:"../../../static/images/my6.png",mode:""}}),s("text",{staticClass:"text"},[t._v("会员权益")]),s("image",{staticClass:"link",attrs:{src:"../../../static/images/myright.png",mode:""}})]),s("view",{staticClass:"li",attrs:{eventid:"5f02205c-5"},on:{tap:function(e){t.authentication()}}},[s("image",{staticClass:"icon",attrs:{src:"../../../static/images/my7.png",mode:""}}),s("text",{staticClass:"text"},[t._v("认证资料上传")]),s("image",{staticClass:"link",attrs:{src:"../../../static/images/myright.png",mode:""}})]),s("view",{staticClass:"li",attrs:{eventid:"5f02205c-6"},on:{tap:function(e){t.helpClick()}}},[s("image",{staticClass:"icon",attrs:{src:"../../../static/images/my3.png",mode:""}}),s("text",{staticClass:"text"},[t._v("帮助中心")]),s("image",{staticClass:"link",attrs:{src:"../../../static/images/myright.png",mode:""}})]),s("view",{staticClass:"li",attrs:{eventid:"5f02205c-7"},on:{tap:function(e){t.setup()}}},[s("image",{staticClass:"icon",attrs:{src:"../../../static/images/my4.png",mode:""}}),s("text",{staticClass:"text"},[t._v("我的设置")]),s("image",{staticClass:"link",attrs:{src:"../../../static/images/myright.png",mode:""}})]),s("view",{staticClass:"li",attrs:{eventid:"5f02205c-8"},on:{tap:function(e){t.makePhoneCall()}}},[s("image",{staticClass:"icon",attrs:{src:"../../../static/images/my5.png",mode:""}}),s("text",{staticClass:"text"},[t._v("投诉电话")]),s("image",{staticClass:"link",attrs:{src:"../../../static/images/myright.png",mode:""}})])])])},a=[];s.d(e,"a",function(){return i}),s.d(e,"b",function(){return a})},"5ecf":function(t,e,s){"use strict";var i=s("f96b"),a=s.n(i);a.a},bcdb:function(t,e,s){"use strict";s.r(e);var i=s("f9f3"),a=s.n(i);for(var n in i)"default"!==n&&function(t){s.d(e,t,function(){return i[t]})}(n);e["default"]=a.a},c7da:function(t,e,s){"use strict";s.r(e);var i=s("567b"),a=s("bcdb");for(var n in a)"default"!==n&&function(t){s.d(e,t,function(){return a[t]})}(n);s("5ecf");var o=s("2877"),c=Object(o["a"])(a["default"],i["a"],i["b"],!1,null,null,null);e["default"]=c.exports},f96b:function(t,e,s){},f9f3:function(t,e,s){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s={data:function(){return{header:"",username:"",tel:"",AuthInfo:[]}},onShow:function(){this.header=t.getStorageSync("userinfo").header,this.username=t.getStorageSync("userinfo").username,this.tel=t.getStorageSync("userinfo").tel,this.getIdentityAuthInfo(),this.getUserino()},methods:{setup:function(){t.navigateTo({url:"/pages/info/setup/home/home"})},modifyinfo:function(){t.navigateTo({url:"/pages/info/modifyinfo/modifyinfo"})},orderClick:function(){t.navigateTo({url:"/pages/info/order/home/home"})},depositClick:function(){t.navigateTo({url:"/pages/info/deposit/home/home"})},helpClick:function(){t.navigateTo({url:"/pages/info/help/home/home"})},interests:function(){t.navigateTo({url:"/pages/info/interests/interests"})},authentication:function(){1===this.AuthInfo.is_Auth?t.navigateTo({url:"/pages/info/authentication/authentication"}):2===this.AuthInfo.is_Auth?t.showToast({title:"审核中请等待",icon:"success",mask:!0,duration:1e3}):t.showToast({title:"资料认证成功",icon:"success",mask:!0,duration:1e3})},getIdentityAuthInfo:function(){var e=this,s={_token:t.getStorageSync("userinfo")._token};this.$http.HttpRequst.request(!0,"user/getIdentityAuthInfo",s,"POST",function(t){e.AuthInfo=t.data})},makePhoneCall:function(){t.makePhoneCall({phoneNumber:t.getStorageSync("userinfo").complaint_tel})},getUserino:function(){var e={_token:t.getStorageSync("userinfo")._token};this.$http.HttpRequst.requestLogin(!0,"user/userInfo",e,"POST",function(e){200===e.code&&t.setStorage({key:"userinfo",data:e.data})})}}};e.default=s}).call(this,s("649d")["default"])}},[["557f","common/runtime","common/vendor"]]]);