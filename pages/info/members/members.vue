<template>
	<view>
		<!-- #ifndef MP-WEIXIN -->
		<HeadTtop :Title="Title" :topsrc="topsrc" :backshow="backshow"></HeadTtop>
		<!-- #endif -->
		
		<view class="year">
			<view v-for="(item,index) in vipList" @click="yearClick(index)" :key="index" class="li">
				<view class="img">
					<image v-if=" payIndex != index " class="s" src="../../../static/images/pay4.png" mode=""></image>
					<image v-if=" payIndex === index " class="s" src="../../../static/images/pay5.png" mode=""></image>
				</view>
				<view class="name">{{item.name}}</view>
				<view class="price">￥{{item.price}}</view>
			</view>
		</view>
		
		<view class="equity">
			<view>会员权益：</view>
			
			<scroll-view  scroll-y="true">
				<view v-html="vipEquityList" class="txt">
					
				</view>
			</scroll-view>
		</view>
	
		<view @tap="addOrder()" class="register">
			<image src="../../../static/images/sure.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	import HeadTtop from '../../../components/head/head.vue'
	
	export default {
		components: {
			'HeadTtop': HeadTtop
		},
		data() {
			return {
				Title: '购买会员',
				backshow: true,
				topsrc: '../../../static/images/back.png',
				order_id: '',
				vipList: [],
				payIndex: 0,
				vipEquityList: [],
			}
		},
		onLoad() {
			this.vipEquity()
			this.viplist()
		},
		methods: {
			yearClick(index){
				this.payIndex = index
			},
			viplist() { // 获取会员列表
				var that = this;
				let params = {
					_token: uni.getStorageSync('userinfo')._token
				}
				this.$http.HttpRequst.requestLogin(true, 'order/viplist', params, 'POST', res => {
					if (res.code === 200) {
						that.vipList = res.data
					}
				})
			},
			vipEquity() { // 获取会员权益
				var that = this;
				let params = {
					_token: uni.getStorageSync('userinfo')._token
				}
				this.$http.HttpRequst.requestLogin(true, 'user/vipEquity', params, 'POST', res => {
					if (res.code === 200) {
						that.vipEquityList = res.data
					}
				})
			},
			addOrder() { // 创建订单
				var that = this;
				let index = this.payIndex
				let params = {
					id: this.vipList[index].id,
					_token: uni.getStorageSync('userinfo')._token
				}
				that.$http.HttpRequst.request(true, 'order/viporder', params, 'POST', res => {
					if( res.code === 200 ){
						that.order_id = res.data.id
						that.SureClick()
					}
				});
			},
			SureClick() {
				var that = this;
				let params = {
					order_id: this.order_id,
					type: 1,
					_token: uni.getStorageSync('userinfo')._token
				}
				
				// #ifdef  MP-WEIXIN
					var item = ['微信支付']
				// #endif
				
				// #ifdef  APP-PLUS	
					var item = ['微信支付', '支付宝支付']
				// #endif
				
				uni.showActionSheet({
					itemList: item,
					success: function(res) {
						if (res.tapIndex === 0) {
							// #ifdef  MP-WEIXIN
							that.$http.HttpRequst.request(true, 'order/wxPayx', params, 'POST', res => { //微信支付
									uni.requestPayment({
									    provider: 'wxpay',
									    timeStamp: res.data.timeStamp,
									    nonceStr: res.data.nonceStr,
									    package: res.data.package,
									    signType: 'MD5',
									    paySign: res.data.paySign,
									    success: function (res) {
									        uni.showToast({
									        	title: '支付成功',
									        	icon: 'success',
									        	duration: 1000
									        });
									    },
									    fail: function (err) {
									        uni.showToast({
									        	title: '支付取消',
									        	icon: 'success',
									        	duration: 800
									        });
									    }
									});
							});
							// #endif
							
							// #ifdef  APP-PLUS
							that.$http.HttpRequst.request(true, 'order/wxPay', params, 'POST', res => { //微信支付
								uni.requestPayment({
									provider: 'wxpay',
									orderInfo: res.data, //订单数据
									success: function(res) {
										uni.showToast({
											title: '支付成功',
											icon: 'success',
											duration: 1000
										});
									},
									fail: function(err) {
										uni.showToast({
											title: '支付取消',
											icon: 'success',
											duration: 800
										});
									}
								});
							});
							// #endif
						}
						if (res.tapIndex === 1) {
							that.$http.HttpRequst.request(true, 'alipay/pay', params, 'POST', res => { //支付宝支付
								uni.requestPayment({
									provider: 'alipay',
									orderInfo: res, //订单数据
									success: function(res) {
										uni.showToast({
											title: '支付成功',
											icon: 'success',
											duration: 1000,
											success() {
												setTimeout(res => {
													that.getUserino()
												}, 1000)
											}
										});
									},
									fail: function(err) {
										uni.showToast({
											title: '支付取消',
											icon: 'success',
											duration: 1000
										});
									}
								});
							});
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}
	
	.year{
		width: 750upx;
		overflow: hidden;
		background-color: #fff;
		margin: 30upx auto;
		
		.li{
			width: 690upx;
			margin: 0 auto;
			border-bottom: 1upx solid #e2e2e2;
			height: 100upx;
			line-height: 100upx;
			display: flex;
			
			.img{
				display: inline-block;
				width: 80upx;
				height: 50upx;
				margin: 12.5upx 30upx 0 0;
				
				image{
					width: 50upx;
					height: 50upx;
				}
				
			}
			
			.name{
				width: 220upx;
				display: inline-block;
			}
			
			.price{
				width: 380upx;
				text-align: right;
				display: inline-block;
				color: #ff792a;
			}
		}
		.li:last-child{
			border: 0;
		}
	}
	
	.equity{
		padding: 30upx 20upx 0 20upx;
		border-top: 1upx solid #e2e2e2;
		font-size: 28upx;
		height: 680upx;
		overflow: hidden;
		background-color: #fff;
		
		scroll-view{
			width: 100%;
			height: 100%;
		}
		
		.txt{
			margin-top: 20upx;
		}
	}
	
	.register {
		width: 678upx;
		height: 182upx;
		position: absolute;
		left: 50upx;
		bottom: -30upx;
		cursor: pointer;
	
		image {
			width: 678upx;
			height: 182upx;
			display: block;
		}
	}
</style>

