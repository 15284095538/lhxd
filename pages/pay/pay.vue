<template>
	<view>
		<!-- #ifndef MP-WEIXIN -->
		<HeadTtop :Title="Title" :backshow="backshow"></HeadTtop>
		<!-- #endif -->

		<view class="spDet">
			<view class="box">
				<view class="img">
					<image :src="list.cover" mode=""></image>
				</view>
				<view class="text">
					<view class="tit">{{ list.goods_name }}</view>
					<view class="oneday">
						<text class="choice">￥{{ list.day_money }}元/天</text>(共{{ list.allday }}天)
					</view>
					<view class="oneday">
						<text class="choice">￥{{ list.day_deposit }}</text>(押金)
					</view>
				</view>
			</view>
			<view class="all">
				供需支付：<text class="choice">￥{{ list.allprice }}元</text>
			</view>
		</view>

		<view class="payLi">
			<view class="tit">
				选择支付方式
			</view>
			<view v-if=" userinfo.is_vip == 2 ">
				<view @tap="payLi(0)" class="li">
					<image src="../../static/images/pay2.png" mode=""></image>
					<text>微信支付</text>
					<image v-if=" payIndex != 0 " class="s" src="../../static/images/pay4.png" mode=""></image>
					<image v-if=" payIndex === 0 " class="s" src="../../static/images/pay5.png" mode=""></image>
				</view>
				<view @tap="payLi(1)" class="li">
					<image src="../../static/images/pay1.png" mode=""></image>
					<text>支付宝支付</text>
					<image v-if=" payIndex != 1 " class="s" src="../../static/images/pay4.png" mode=""></image>
					<image v-if=" payIndex === 1 " class="s" src="../../static/images/pay5.png" mode=""></image>
				</view>
			</view>

			<view v-if=" userinfo.is_vip  == 1 " @tap="payLi(2)" class="li">
				<image src="../../static/images/pay3.png" mode=""></image>
				<text>余额支付</text>
				<image v-if=" payIndex != 0 " class="s" src="../../static/images/pay4.png" mode=""></image>
				<image v-if=" payIndex === 0 " class="s" src="../../static/images/pay5.png" mode=""></image>
			</view>
		</view>


		<view @tap="register()" class="register">
			<image src="../../static/images/sure.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	import HeadTtop from '../../components/head/head.vue'
	export default {
		components: {
			'HeadTtop': HeadTtop
		},
		data() {
			return {
				Title: '提交订单',
				backshow: true,
				payIndex: 0,
				list: [],
				userinfo: ''
			};
		},
		onLoad(e) {
			this.userinfo = uni.getStorageSync('userinfo')
			this.list = e
			console.log( e )
		},
		methods: {
			payLi(index) {
				this.payIndex = index
			},
			register() {
				var that = this;
				let params = {
					order_id: this.list.order_id,
					_token: uni.getStorageSync('userinfo')._token
				}
				if (that.userinfo.is_vip == 2) {
					if (this.payIndex == 0) { // 微信支付
						this.$http.HttpRequst.request(true, 'order/wxPay', params, 'POST', res => {
							uni.requestPayment({
								provider: 'wxpay',
								orderInfo: res.data, //订单数据
								success: function(res) {
									uni.showToast({
										title: '支付成功',
										icon: 'success',
										duration: 800,
										success() {
											setTimeout(res => {
												uni.switchTab({
													url: '/pages/info/home/home'
												})
											}, 800)
										}
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
					}
					if (this.payIndex == 1) { // 支付宝支付
						this.$http.HttpRequst.request(true, 'alipay/pay', params, 'POST', res => {
							uni.requestPayment({
								provider: 'alipay',
								orderInfo: res, //订单数据
								success: function(res) {
									uni.showToast({
										title: '支付成功',
										icon: 'success',
										duration: 800,
										success() {
											setTimeout(res => {
												uni.switchTab({
													url: '/pages/info/home/home'
												})
											}, 800)
										}
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
					}
				}else{ //余额支付
					if( uni.getStorageSync('userinfo').balance < this.allprice ){
						uni.showToast({
							title: '余额不足，请充值',
							icon: 'success',
							duration: 600,
							success() {
								setTimeout( res => {
									uni.redirectTo({
										url: '/pages/info/interests/interests'
									})
								},600)
							}
						});
					}else{
						this.$http.HttpRequst.request(false, 'order/balancePay', params, 'POST', res => {
							if( res.code == 200 ){
								uni.showToast({
									title: '成功',
									icon: 'success',
									duration: 600,
									success() {
										setTimeout( res => {
											uni.switchTab({
												url: '/pages/info/home/home'
											})
										},600)
									}
								});
							}else{
								uni.showToast({
									title: res.msg,
									icon: 'success',
									duration: 1000,
									success() {
										setTimeout( res => {
											uni.switchTab({
												url: '/pages/info/home/home'
											})
										},1000)
									}
								});
							}
						});
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}

	.spDet {
		overflow: hidden;
		background-color: #fff;

		.all {
			height: 90upx;
			line-height: 90upx;
			width: 690upx;
			margin: 0 auto 20upx;
			font-size: 28upx;

			.choice {
				color: #ff792a;
			}
		}

		.box {
			width: 690upx;
			margin: 30upx auto 0;

			.img {
				display: inline-block;
				width: 190upx;
				height: 190upx;
				overflow: hidden;
				margin-right: 20upx;

				image {
					width: 190upx;
					height: 190upx;
				}
			}

		}

		.text {
			display: inline-block;
			overflow: hidden;
			width: 440upx;
			height: 190upx;

			.tit {
				font-size: 28upx;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				line-height: 40upx;
				height: 80upx;
			}

			.oneday {
				font-size: 26upx;
				color: #93939e;
				line-height: 50upx;

				.choice {
					color: #ff792a;
				}
			}
		}
	}

	.payLi {
		background-color: #fff;
		margin-top: 20upx;

		.tit {
			width: 690upx;
			height: 100upx;
			line-height: 100upx;
			margin: 0 auto;
			font-size: 32upx;
		}

		.li {
			width: 690upx;
			height: 100upx;
			line-height: 100upx;
			margin: 0 auto;
			font-size: 28upx;
			border-bottom: 1upx solid #E2E2E2;

			image:first-child {
				width: 51upx;
				height: 51upx;
				float: left;
				margin: 24.5upx 20upx 0 0;
			}

			.s {
				width: 38upx;
				height: 38upx;
				margin: 31upx 0 0 0;
				float: right;
			}
		}
	}

	.register {
		width: 678upx;
		height: 182upx;
		position: fixed;
		left: 36upx;
		bottom: 40upx;
		cursor: pointer;

		image {
			width: 678upx;
			height: 182upx;
			display: block;
		}
	}
</style>
