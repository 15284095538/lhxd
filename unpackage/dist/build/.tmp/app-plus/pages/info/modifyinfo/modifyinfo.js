(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/info/modifyinfo/modifyinfo"],{"0830":function(t,e,a){"use strict";a.r(e);var s=a("65df"),i=a.n(s);for(var n in s)"default"!==n&&function(t){a.d(e,t,function(){return s[t]})}(n);e["default"]=i.a},2012:function(t,e,a){"use strict";var s=a("e890"),i=a.n(s);i.a},"65df":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=i(a("89bf"));function i(t){return t&&t.__esModule?t:{default:t}}var n={components:{HeadTtop:s.default},data:function(){return{Title:"修改个人资料",backshow:!0,topsrc:"../../../static/images/back.png",header:"",username:"阴雨小城11",tel:"136****5260"}},onLoad:function(){this.header=t.getStorageSync("userinfo").header,this.username=t.getStorageSync("userinfo").username,this.tel=t.getStorageSync("userinfo").tel},methods:{chooseImage:function(){var e=this;t.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album","camera"],success:function(a){var s={_token:t.getStorageSync("userinfo")._token};e.$http.HttpRequst.requestUploadFile(!0,"index/upload",s,a.tempFilePaths,function(t){e.header=t.data.img1})}})},SureClick:function(){var e={header:this.header,username:this.username,tel:this.tel,_token:t.getStorageSync("userinfo")._token};this.$http.HttpRequst.request(!1,"user/edit",e,"POST",function(e){t.setStorage({key:"userinfo",data:e.data}),t.showToast({title:e.msg,duration:1e3,success:function(){setTimeout(function(){t.navigateBack()},1e3)}})})}}};e.default=n}).call(this,a("6e42")["default"])},"6bc6":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",[a("HeadTtop",{attrs:{Title:t.Title,topsrc:t.topsrc,backshow:t.backshow,mpcomid:"0cfedfb2-0"}}),a("view",{staticClass:"infocontent"},[a("view",{staticClass:"li"},[a("view",{staticClass:"text"},[t._v("头像")]),a("image",{staticClass:"portrait",attrs:{src:t.header,eventid:"0cfedfb2-0"},on:{tap:function(e){t.chooseImage()}}}),a("image",{staticClass:"arrow",attrs:{src:"../../../static/images/myright.png",mode:""}})]),a("view",{staticClass:"li"},[a("view",{staticClass:"text"},[t._v("昵称")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],staticClass:"int",attrs:{type:"text",eventid:"0cfedfb2-1"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}}),a("image",{staticClass:"arrow",attrs:{src:"../../../static/images/myright.png",mode:""}})]),a("view",{staticClass:"li"},[a("view",{staticClass:"text"},[t._v("手机号")]),a("view",{staticClass:"int"},[t._v(t._s(t.tel))]),a("image",{staticClass:"arrow",attrs:{src:"../../../static/images/myright.png",mode:""}})])]),a("view",{staticClass:"register",attrs:{eventid:"0cfedfb2-2"},on:{tap:function(e){t.SureClick()}}},[a("image",{attrs:{src:"../../../static/images/sure.png",mode:""}})])],1)},i=[];a.d(e,"a",function(){return s}),a.d(e,"b",function(){return i})},8869:function(t,e,a){"use strict";a.r(e);var s=a("6bc6"),i=a("0830");for(var n in i)"default"!==n&&function(t){a.d(e,t,function(){return i[t]})}(n);a("2012");var r=a("2877"),o=Object(r["a"])(i["default"],s["a"],s["b"],!1,null,null,null);e["default"]=o.exports},e890:function(t,e,a){},ff73:function(t,e,a){"use strict";a("a2e3");var s=n(a("b0ce")),i=n(a("8869"));function n(t){return t&&t.__esModule?t:{default:t}}Page((0,s.default)(i.default))}},[["ff73","common/runtime","common/vendor"]]]);