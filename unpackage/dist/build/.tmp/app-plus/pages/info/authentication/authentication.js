(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/info/authentication/authentication"],{"0800":function(t,e,a){"use strict";a("a2e3");var i=c(a("b0ce")),s=c(a("d4e7"));function c(t){return t&&t.__esModule?t:{default:t}}Page((0,i.default)(s.default))},"0822":function(t,e,a){},"0c41":function(t,e,a){"use strict";a.r(e);var i=a("36f4"),s=a.n(i);for(var c in i)"default"!==c&&function(t){a.d(e,t,function(){return i[t]})}(c);e["default"]=s.a},"36f4":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=s(a("89bf"));function s(t){return t&&t.__esModule?t:{default:t}}var c={components:{HeadTtop:i.default},data:function(){return{Title:"认证资料",backshow:!0,topsrc:"../../../static/images/back.png",real_username:"",email:"",id_card:"",id_card_face:"",id_card_con:"",hold_id_card:""}},methods:{SureClick:function(){var e=this,a=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;if(""===e.real_username)return t.showToast({title:"请输入真实姓名",icon:"success",mask:!0,duration:1e3}),!1;if(!a.test(this.email))return t.showToast({title:"请输入正确邮箱",icon:"success",mask:!0,duration:1e3}),!1;if(""===e.email)return t.showToast({title:"请输入邮箱",icon:"success",mask:!0,duration:1e3}),!1;if(""===e.id_card)return t.showToast({title:"请输入身份证号码",icon:"success",mask:!0,duration:1e3}),!1;if(18!=e.id_card.length)return t.showToast({title:"请输入正确身份证号码",icon:"success",mask:!0,duration:1e3}),!1;if(""===e.id_card_face)return t.showToast({title:"请上传身份证反面",icon:"success",mask:!0,duration:1e3}),!1;if(""===e.id_card_con)return t.showToast({title:"请上传身份证反面",icon:"success",mask:!0,duration:1e3}),!1;if(""===e.hold_id_card)return t.showToast({title:"请上传手持身份证照片",icon:"success",mask:!0,duration:1e3}),!1;var i={_token:t.getStorageSync("userinfo")._token,email:this.email,real_username:this.real_username,id_card:this.id_card,id_card_face:this.id_card_face,id_card_con:this.id_card_con,hold_id_card:this.hold_id_card};this.$http.HttpRequst.request(!1,"user/identityAuth",i,"POST",function(e){t.showToast({title:e.msg,duration:1e3,success:function(){setTimeout(function(){t.navigateBack()},1e3)}})})},id_card_faceClick:function(){var e=this;t.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album"],success:function(a){var i={_token:t.getStorageSync("userinfo")._token};e.$http.HttpRequst.requestUploadFile(!0,"index/upload",i,a.tempFilePaths,function(t){e.id_card_face=t.data.img1})}})},id_card_conClick:function(){var e=this;t.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album"],success:function(a){var i={_token:t.getStorageSync("userinfo")._token};e.$http.HttpRequst.requestUploadFile(!0,"index/upload",i,a.tempFilePaths,function(t){e.id_card_con=t.data.img1})}})},hold_id_cardClick:function(){var e=this;t.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album"],success:function(a){var i={_token:t.getStorageSync("userinfo")._token};e.$http.HttpRequst.requestUploadFile(!0,"index/upload",i,a.tempFilePaths,function(t){e.hold_id_card=t.data.img1})}})}}};e.default=c}).call(this,a("649d")["default"])},7045:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",[a("HeadTtop",{attrs:{Title:t.Title,topsrc:t.topsrc,backshow:t.backshow,mpcomid:"012f2f32-0"}}),a("view",{staticClass:"int"},[a("view",{staticClass:"box"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.real_username,expression:"real_username"}],attrs:{placeholder:"请输入真实姓名",type:"text",eventid:"012f2f32-0"},domProps:{value:t.real_username},on:{input:function(e){e.target.composing||(t.real_username=e.target.value)}}})])]),a("view",{staticClass:"int"},[a("view",{staticClass:"box"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],attrs:{placeholder:"请输入邮箱",type:"text",eventid:"012f2f32-1"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}})])]),a("view",{staticClass:"int"},[a("view",{staticClass:"box",staticStyle:{border:"0"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.id_card,expression:"id_card"}],attrs:{placeholder:"请输入身份证号码",type:"text",eventid:"012f2f32-2"},domProps:{value:t.id_card},on:{input:function(e){e.target.composing||(t.id_card=e.target.value)}}})])]),a("view",{staticClass:"upload"},[a("view",{staticClass:"tit"},[t._v("请上传身份证正面")]),a("view",{staticClass:"img"},[""==t.id_card_face?a("image",{attrs:{src:"../../../static/images/authentication.png",mode:"",eventid:"012f2f32-3"},on:{tap:function(e){t.id_card_faceClick()}}}):t._e(),""!=t.id_card_face?a("image",{attrs:{src:t.id_card_face,mode:"",eventid:"012f2f32-4"},on:{tap:function(e){t.id_card_faceClick()}}}):t._e()])]),a("view",{staticClass:"upload"},[a("view",{staticClass:"tit"},[t._v("请上传身份证反面")]),a("view",{staticClass:"img"},[""==t.id_card_con?a("image",{attrs:{src:"../../../static/images/authentication.png",mode:"",eventid:"012f2f32-5"},on:{tap:function(e){t.id_card_conClick()}}}):t._e(),""!=t.id_card_con?a("image",{attrs:{src:t.id_card_con,mode:"",eventid:"012f2f32-6"},on:{tap:function(e){t.id_card_conClick()}}}):t._e()])]),a("view",{staticClass:"upload"},[a("view",{staticClass:"tit"},[t._v("请上传手持身份证照片")]),a("view",{staticClass:"img"},[""==t.hold_id_card?a("image",{attrs:{src:"../../../static/images/authentication.png",mode:"",eventid:"012f2f32-7"},on:{tap:function(e){t.hold_id_cardClick()}}}):t._e(),""!=t.hold_id_card?a("image",{attrs:{src:t.hold_id_card,mode:"",eventid:"012f2f32-8"},on:{tap:function(e){t.hold_id_cardClick()}}}):t._e()])]),a("view",{staticClass:"register",attrs:{eventid:"012f2f32-9"},on:{tap:function(e){t.SureClick()}}},[a("image",{attrs:{src:"../../../static/images/sure.png",mode:""}})])],1)},s=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return s})},d4e7:function(t,e,a){"use strict";a.r(e);var i=a("7045"),s=a("0c41");for(var c in s)"default"!==c&&function(t){a.d(e,t,function(){return s[t]})}(c);a("f2aa");var n=a("2877"),o=Object(n["a"])(s["default"],i["a"],i["b"],!1,null,null,null);e["default"]=o.exports},f2aa:function(t,e,a){"use strict";var i=a("0822"),s=a.n(i);s.a}},[["0800","common/runtime","common/vendor"]]]);