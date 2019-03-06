<template>
	<view>
		<!-- #ifndef MP-WEIXIN -->
		<HeadTtop :Title="Title" :topsrc="topsrc" :backshow="backshow"></HeadTtop>
		<!-- #endif -->

		<view class="orderTop">
			<view @click="orderTypeClic(0)" :class=" orderTypeindex === 0 ? 'active':'' " class="li">
				<text>全部</text>
			</view>
			<view @click="orderTypeClic(1)" :class=" orderTypeindex === 1 ? 'active':'' " class="li">
				<text>待付款</text>
			</view>
			<view @click="orderTypeClic(2)" :class=" orderTypeindex === 2 ? 'active':'' " class="li">
				<text>待取货</text>
			</view>
			<view @click="orderTypeClic(3)" :class=" orderTypeindex === 3 ? 'active':'' " class="li">
				<text>租赁中</text>
			</view>
			<view @click="orderTypeClic(4)" :class=" orderTypeindex === 4 ? 'active':'' " class="li">
				<text>已完成</text>
			</view>
		</view>

		<view class="list">
			<view v-for=" (item,index) in list.data " :key="index" class="li">
				<view @tap="orderliClick(item.id)" class="tit">
					<view class="address">{{ item.store.store_name }}</view>
					<view class="type">
						<text v-if=" item.status == 1 ">待付款</text>
						<text v-if=" item.status == 2 ">待取货</text>
						<text v-if=" item.status == 3 ">租赁中</text>
						<text v-if=" item.status == 5 ">已完成</text>
						<text v-if=" item.status == 6 ">已取消</text>
					</view>
				</view>
				<view @tap="orderliClick(item.id)" class="details">
					<view class="img">
						<image :src="item.good.img" mode=""></image>
					</view>
					<view class="text">
						<view class="h5">{{ item.good.goods_name }}</view>
						<view class="oneday">
							<text class="choice">￥{{ item.good_price }}/天 </text>({{ item.day }}天)
						</view>
						<view class="onemonth">
							<text class="choice">￥{{ item.cash_pledge }}</text> (押金)
						</view>
					</view>
				</view>
				<view class="info">
					<text class="fl"> <text>共需支付 :</text> <text class="choice">￥{{ item.amount }}元</text></text>
					<view class="fr">
						<view @tap.stop="cancelOrder(item.id)" v-if=" item.status == 1 " class="btn">
							取消订单
						</view>
						<view @tap.stop="confirmOrder(item.id)" v-if=" item.status == 2 " class="btn choice">
							确认收货
						</view>
						<view @tap.stop="apppayOrder(item.id,item.amount)" v-if=" item.status == 1 " class="btn choice">
							支付
						</view>
						<view @tap.stop="finishOrder(item.id)" v-if=" item.status == 3 " class="btn choice">
							还货
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import HeadTtop from '../../../../components/head/head.vue'
	export default {
		components: {
			'HeadTtop': HeadTtop
		},
		data() {
			return {
				Title: '我的订单',
				backshow: true,
				topsrc: '../../../../static/images/back.png',
				orderTypeindex: 0,
				status: 0,
				page: 1,
				onReachBottomshow: true,
				list: [],
				userinfo: []
			}
		},
		onLoad() {
			this.userinfo = uni.getStorageSync('userinfo')
		},
		onShow() {
			this.page = 1
			this.onReachBottomshow = true
			this.getData()
		},
		onReachBottom() {
			if (this.onReachBottomshow) {
				this.page++
				this.getData()
			}
		},
		methods: {
			orderTypeClic(index) {
				this.orderTypeindex = index
				if (this.orderTypeindex == 0) { // 全部
					this.status = 0
				} else if (this.orderTypeindex == 1) { //代付款
					this.status = 1
				} else if (this.orderTypeindex == 2) { //待取货
					this.status = 2
				} else if (this.orderTypeindex == 3) { // 租赁中
					this.status = 3
				} else { //已完成
					this.status = 5
				}
				this.page = 1;
				this.onReachBottomshow = true
				this.getData()
			},
			orderliClick(id) {
				uni.navigateTo({
					url: "/pages/info/order/details/details?order_id=" + id
				})
			},
			cancelOrder(order_id) { //取消订单
				var that = this;
				let params = {
					order_id: order_id,
					_token: uni.getStorageSync('userinfo')._token
				}
				this.$http.HttpRequst.request(false, 'user/cancelOrder', params, 'POST', res => {
					if (res.code == 200) {
						uni.showToast({
							title: '成功',
							duration: 600,
							success() {
								setTimeout(res => {
									that.page = 1
									that.onReachBottomshow = true
									that.getData()
								}, 600)
							}
						});
					}
				});
			},
			confirmOrder(order_id) { //确定收货
				var that = this;
				let params = {
					order_id: order_id,
					_token: uni.getStorageSync('userinfo')._token
				}
				this.$http.HttpRequst.request(false, 'user/confirmOrder', params, 'POST', res => {
					if (res.code == 200) {
						uni.showToast({
							title: '成功',
							duration: 600,
							success() {
								setTimeout(res => {
									that.page = 1
									that.onReachBottomshow = true
									that.getData()
								}, 600)
							}
						});
					}
				});
			},
			finishOrder(order_id) { //完成订单
				var that = this;
				let params = {
					order_id: order_id,
					_token: uni.getStorageSync('userinfo')._token
				}
				this.$http.HttpRequst.request(false, 'user/finishOrder', params, 'POST', res => {
					if (res.code == 200) {
						uni.showToast({
							title: '成功',
							duration: 600,
							success() {
								setTimeout(res => {
									that.page = 1
									that.onReachBottomshow = true
									that.getData()
								}, 600)
							}
						});
					}
				});
			},
			apppayOrder(order_id,allprice) { //订单支付
				var that = this;
				let params = {
					order_id: order_id,
					_token: uni.getStorageSync('userinfo')._token
				}

				if (that.userinfo.is_vip == 2) {
					uni.showActionSheet({
						itemList: ['微信支付', '支付宝支付'],
						success: function(res) {
							if (res.tapIndex === 0) {
								that.$http.HttpRequst.request(true, 'order/wxPay', params, 'POST', res => { //微信支付
									console.log(JSON.stringify(res.data))
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
														that.page = 1
														that.onReachBottomshow = true
														that.getData()
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
														that.page = 1
														that.onReachBottomshow = true
														that.getData()
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
				} else { // 余额支付
					uni.showActionSheet({
						itemList: ['余额支付'],
						success: function(res) {
							if( res.tapIndex == 0 ){
								if( uni.getStorageSync('userinfo').balance < Number(allprice) ){
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
									that.$http.HttpRequst.request(false, 'order/balancePay', params, 'POST', res => {
										if( res.code == 200 ){
											uni.showToast({
												title: '成功',
												icon: 'success',
												duration: 600,
												success() {
													setTimeout( res => {
														that.page = 1
														that.onReachBottomshow = true
														that.getData()
													},800)
												}
											});
										}
									});
								}
							}
						}
					});
				}


			},
			getData() {
				var that = this;
				let params = {
					status: this.status,
					page: this.page,
					_token: uni.getStorageSync('userinfo')._token
				}
				this.$http.HttpRequst.request(true, 'user/myOrder', params, 'POST', res => {
					if (res.code == 200) {
						if (that.page == 1) {
							that.list = res.data
						} else {
							if (res.data.data == '') {
								that.onReachBottomshow = false
							} else {
								that.list.data = that.list.data.concat(res.data.data);
							}
						}
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F5F5F5;
	}

	.orderTop {
		height: 85upx;
		line-height: 85upx;
		background-color: #fff;
		font-size: 28upx;
		display: flex;

		.li {
			flex: 1;
			text-align: center;

			&.active {
				color: #ff792a;

				text {
					border-bottom: 5upx solid #ff792a;
					padding-bottom: 10upx;
				}
			}
		}
	}

	.list {

		.li {
			padding: 0 25upx;
			margin-top: 25upx;
			background-color: #fff;
			font-size: 28upx;

			.tit {
				height: 80upx;
				border-bottom: 1upx solid #E2E2E2;
				line-height: 80upx;

				.address {
					float: left;
				}

				.type {
					float: right;
					color: #ff792a;
				}
			}

			.details {
				height: 170upx;
				padding: 25upx 0;
				border-bottom: 1upx solid #E2E2E2;
				display: flex;

				.img {
					display: inline-block;
					width: 170upx;
					height: 170upx;

					image {
						width: 170upx;
						height: 170upx;
					}
				}

				.text {
					width: 500upx;
					margin-left: 30upx;
					display: inline-block;

					.choice {
						color: #ff792a;
					}

					.h5 {
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
						line-height: 45upx;
					}

					.oneday {
						line-height: 45upx;
						color: #93939e;
					}

					.onemonth {
						line-height: 40upx;
						color: #93939e;
					}
				}
			}

			.info {
				padding: 20upx 0;
				height: 60upx;
				line-height: 60upx;

				.fl {
					float: left;
				}

				.choice {
					color: #ff792a;
					margin-left: 10upx;
				}

				.fr {
					float: right;

					.btn {
						width: 140upx;
						height: 60upx;
						border: 1upx solid #E2E2E2;
						text-align: center;
						line-height: 60upx;
						display: inline-block;
						margin: 5upx 20upx 0 0;
						border-radius: 3px;
						font-size: 26upx;
						color: #909090;

						&:last-child {
							margin-right: 0;
						}
					}

					.choice {
						border: 1upx solid #ff792a;
						color: #ff792a;
					}
				}
			}
		}
	}
</style>
