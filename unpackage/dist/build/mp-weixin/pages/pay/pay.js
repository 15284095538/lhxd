(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/pay/pay"],{"08ae":function(t,e,n){"use strict";(function(t){n("a2e3");o(n("66fd"));var e=o(n("f3dc"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"4c5e":function(t,e,n){},"589a":function(t,e,n){"use strict";var o=n("4c5e"),i=n.n(o);i.a},"5bd4":function(t,e,n){"use strict";n.r(e);var o=n("62b1"),i=n.n(o);for(var s in o)"default"!==s&&function(t){n.d(e,t,(function(){return o[t]}))}(s);e["default"]=i.a},"62b1":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=function(){n.e("components/head/head").then(function(){return resolve(n("89bf"))}.bind(null,n)).catch(n.oe)},i={components:{HeadTtop:o},data:function(){return{Title:"提交订单",backshow:!0,payIndex:0,list:[],userinfo:"",wxFalse:!0}},onLoad:function(e){this.userinfo=t.getStorageSync("userinfo"),this.list=e,console.log(this.list),this.wxFalse=!1},methods:{payLi:function(t){this.payIndex=t},register:function(){var e={order_id:this.list.order_id,_token:t.getStorageSync("userinfo")._token};0==this.payIndex&&this.$http.HttpRequst.request(!0,"order/wxPayx",e,"POST",(function(e){t.requestPayment({provider:"wxpay",timeStamp:e.data.timeStamp,nonceStr:e.data.nonceStr,package:e.data.package,signType:"MD5",paySign:e.data.paySign,success:function(e){t.showToast({title:"支付成功",icon:"success",duration:800,success:function(){setTimeout((function(e){t.switchTab({url:"/pages/info/home/home"})}),800)}})},fail:function(t){console.log("fail:"+JSON.stringify(t))}})})),1==this.payIndex&&this.$http.HttpRequst.request(!0,"alipay/pay",e,"POST",(function(e){t.requestPayment({provider:"alipay",orderInfo:e,success:function(e){t.showToast({title:"支付成功",icon:"success",duration:800,success:function(){setTimeout((function(e){t.switchTab({url:"/pages/info/home/home"})}),800)}})},fail:function(e){t.showToast({title:"支付取消",icon:"success",duration:800})}})})),3===this.payIndex&&this.$http.HttpRequst.request(!0,"order/offlinepay",e,"POST",(function(e){t.showToast({title:"支付成功",icon:"success",duration:800,success:function(){setTimeout((function(e){t.switchTab({url:"/pages/info/home/home"})}),800)}})}))}}};e.default=i}).call(this,n("543d")["default"])},cfe4:function(t,e,n){"use strict";var o,i=function(){var t=this,e=t.$createElement;t._self._c},s=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return o}))},f3dc:function(t,e,n){"use strict";n.r(e);var o=n("cfe4"),i=n("5bd4");for(var s in i)"default"!==s&&function(t){n.d(e,t,(function(){return i[t]}))}(s);n("589a");var a,c=n("f0c5"),u=Object(c["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);e["default"]=u.exports}},[["08ae","common/runtime","common/vendor"]]]);