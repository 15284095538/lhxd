(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/info/setup/feedback/feedback"],{1772:function(t,e,a){"use strict";var n=a("5d4f"),i=a.n(n);i.a},"1b45":function(t,e,a){"use strict";a("a2e3");var n=s(a("b0ce")),i=s(a("ff14"));function s(t){return t&&t.__esModule?t:{default:t}}Page((0,n.default)(i.default))},"223e":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i(a("89bf"));function i(t){return t&&t.__esModule?t:{default:t}}var s={components:{HeadTtop:n.default},data:function(){return{Title:"意见反馈",backshow:!0,topsrc:"../../../../static/images/back.png",type:["功能问题","商品问题","其它问题"],typeindex:0,textarea:""}},methods:{typeClick:function(t){this.typeindex=t},sureClick:function(){var e={type:this.typeindex+1,content:this.textarea,_token:t.getStorageSync("userinfo")._token};this.$http.HttpRequst.request(!1,"index/opinion",e,"POST",function(e){console.log(e),t.showToast({title:e.msg,duration:1e3,success:function(){setTimeout(function(){t.navigateBack()},1e3)}})})}}};e.default=s}).call(this,a("649d")["default"])},"5d4f":function(t,e,a){},a019:function(t,e,a){"use strict";a.r(e);var n=a("223e"),i=a.n(n);for(var s in n)"default"!==s&&function(t){a.d(e,t,function(){return n[t]})}(s);e["default"]=i.a},ba04:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",[a("HeadTtop",{attrs:{Title:t.Title,topsrc:t.topsrc,backshow:t.backshow,mpcomid:"4c069a40-0"}}),a("view",{staticClass:"feedbacktype"},[a("view",{staticClass:"text"},[t._v("意见类型")]),a("view",{staticClass:"ul"},t._l(t.type,function(e,n){return a("view",{staticClass:"li",class:t.typeindex===n?"active":"",attrs:{eventid:"4c069a40-0-"+n},on:{tap:function(e){t.typeClick(n)}}},[t._v(t._s(e))])}))]),a("view",{staticClass:"textarea"},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.textarea,expression:"textarea"}],attrs:{placeholder:"请描述您遇到的问题",eventid:"4c069a40-1"},domProps:{value:t.textarea},on:{input:function(e){e.target.composing||(t.textarea=e.target.value)}}})]),a("view",{staticClass:"register",attrs:{eventid:"4c069a40-2"},on:{tap:function(e){t.sureClick()}}},[a("image",{attrs:{src:"../../../../static/images/feedbackSure.png",mode:""}})])],1)},i=[];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return i})},ff14:function(t,e,a){"use strict";a.r(e);var n=a("ba04"),i=a("a019");for(var s in i)"default"!==s&&function(t){a.d(e,t,function(){return i[t]})}(s);a("1772");var c=a("2877"),o=Object(c["a"])(i["default"],n["a"],n["b"],!1,null,null,null);e["default"]=o.exports}},[["1b45","common/runtime","common/vendor"]]]);