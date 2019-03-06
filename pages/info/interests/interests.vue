<template>
	<view>
		<!-- #ifndef MP-WEIXIN -->
		<HeadTtop :Title="Title" :topsrc="topsrc" :backshow="backshow"></HeadTtop>
		<!-- #endif -->

		<view class="balance">
			<image src="../../../static/images/interests1.png" mode=""></image>
			<view class="text">
				<view class="price">￥{{ userinfo.balance }}</view>
				<view class="company">余额</view>
			</view>
		</view>

		<view class="int">
			<text>充值金额：</text>
			<view class="input">
				<text v-if=" userinfo.is_vip == 2 ">{{ price }}</text>
				<input v-if=" userinfo.is_vip == 1 " v-model="price" type="text" value="" />元
			</view>
		</view>

		<view class="ts">
			提示：预充值后升级为会员，可享受折扣和免押金，第一次充值必须充值2000元，之后可自定义充值。
		</view>

		<view @tap="addOrder()" class="register">
			<image src="../../../static/images/interests2.png" mode=""></image>
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
				Title: '会员权益',
				backshow: true,
				topsrc: '../../../static/images/back.png',
				price: 2000,
				userinfo: [],
				order_id: '',
			}
		},
		onLoad() {
			this.userinfo = uni.getStorageSync('userinfo')
			if (this.userinfo.is_vip == 2) {
				this.price = 2000
			} else {
				this.price = ''
			}
		},
		methods: {
			getUserino() { // 获取个人信息
				var that = this;
				let params = {
					_token: uni.getStorageSync('userinfo')._token
				}
				this.$http.HttpRequst.requestLogin(true, 'user/userInfo', params, 'POST', res => {
					if (res.code === 200) {
						uni.setStorage({
							key: 'userinfo',
							data: res.data
						});
					}
				})
			},
			addOrder() { // 创建订单
				if (this.price == '') {
					uni.showToast({
						title: '请输入充值金额',
						icon: 'success',
						duration: 800
					});
					return false
				}
				var that = this;
				let params = {
					amount: this.price,
					_token: uni.getStorageSync('userinfo')._token
				}
				that.$http.HttpRequst.request(true, 'order/addVipOrder', params, 'POST', res => {
					that.order_id = res.data.id
					that.SureClick()
				});
			},
			SureClick() {
				var that = this;
				let params = {
					order_id: this.order_id,
					type: 1,
					_token: uni.getStorageSync('userinfo')._token
				}
				uni.showActionSheet({
					itemList: ['微信支付', '支付宝支付'],
					success: function(res) {
						if (res.tapIndex === 0) {
							that.$http.HttpRequst.request(true, 'order/wxPay', params, 'POST', res => { //微信支付
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
													that.getUserino()
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
						if (res.tapIndex === 1) {
							that.$http.HttpRequst.request(true, 'alipay/pay', params, 'POST', res => { //支付宝支付
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
													that.getUserino()
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

	.balance {
		height: 360upx;
		width: 750upx;
		background-color: #fff;
		position: relative;

		image {
			width: 699upx;
			height: 320upx;
			position: absolute;
			left: 24.5upx;
			top: 20upx;
		}

		.text {
			text-align: center;
			width: 100%;
			font-size: 48upx;
			position: absolute;
			left: 0upx;
			top: 120upx;
			height: 120upx;
			line-height: 60upx;
			color: #fff;

			.company {
				font-size: 28upx;
			}
		}
	}

	.int {
		height: 100upx;
		line-height: 100upx;
		background-color: #fff;
		margin-top: 30upx;
		padding: 0 25upx;
		font-size: 28upx;

		.input {
			float: right;

			input {
				height: 100upx;
				width: 300upx;
				text-align: right;
				float: left;
			}
		}
	}

	.ts {
		width: 660upx;
		margin: 20upx auto 0;
		font-size: 28upx;
	}

	.register {
		width: 678upx;
		height: 182upx;
		position: relative;
		left: 50upx;
		top: 420upx;
		cursor: pointer;

		image {
			width: 678upx;
			height: 182upx;
			display: block;
		}
	}
</style>
