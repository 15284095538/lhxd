<template>
	<view>
		<!-- #ifndef MP-WEIXIN -->
		<HeadTtop :Title="Title" :topsrc="topsrc" :backshow="backshow"></HeadTtop>
		<!-- #endif -->
		
		<view class="address">
			<view class="con">
				<view class="info">
					<text class="name">{{ details.order_user_info.username }}</text>
					<text class="tel">{{ details.store.tel }}</text>
				</view>
				<view class="region">
					<image src="../../../../static/images/locationIcon.png" mode=""></image>{{ details.order_user_info.address }}
				</view>
			</view>
		</view>
		
		<view class="Spinfo">
			<view class="Spinfotit">
				<view class="Spinfoaddress">{{ details.store.address }}</view>
				<view class="type">
					<text v-if=" details.status == 1 ">待付款</text>
					<text v-if=" details.status == 2 ">待取货</text>
					<text v-if=" details.status == 3 ">租赁中</text>
					<text v-if=" details.status == 5 ">已完成</text>
					<text v-if=" details.status == 6 ">已取消</text>
				</view>
			</view>
			<view class="details">
				<view class="img">
					<image :src="details.good.img_url" mode=""></image>
				</view>
				<view class="text">
					{{ details.good.goods_name }}
				</view>
			</view>
		</view>
		
		<view class="orderinfo">
			<view class="li">
				租赁时间：{{ details.start_time }}-{{ details.end_time }}
			</view>
			<view class="li">
				租赁天数：{{ details.day }}天
			</view>
			<view class="li">
				租赁价格：￥{{ details.good_price }}/天
			</view>
			<view class="li">
				押金：￥{{ details.cash_pledge }}元
			</view>
		</view>
		
		<view class="orderBtn">
			<text class="fl"> <text>共需支付 :</text> <text class="choice">￥{{ details.amount }}元</text></text>
			<view class="fr">
				<view @tap.stop="cancelOrder(details.id)" v-if=" details.status == 1 " class="btn">
					取消订单
				</view>
				<view @tap.stop="confirmOrder(details.id)" v-if=" details.status == 2 " class="btn choice">
					确认收货
				</view>
				<view @tap.stop="apppayOrder(details.id,details.amount)" v-if=" details.status == 1 " class="btn choice">
					支付
				</view>
				<view @tap.stop="finishOrder(details.id)" v-if=" details.status == 3 " class="btn choice">
					还货
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
				topsrc: '../../../../static/images/back-w.png',
				order_id: '',
				details:[]
			}
		},
		onLoad(e) {
			this.order_id = e.order_id
			this.userinfo = uni.getStorageSync('userinfo')
			this.getData()
		},
		methods:{
			getData(){
				var that = this;
				let params = {
					order_id: this.order_id,
					_token: uni.getStorageSync('userinfo')._token
				}
				this.$http.HttpRequst.request(true, 'order/orderDetail', params, 'POST', res => {
					if (res.code == 200) {
						that.details = res.data
					}
				});
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
								setTimeout( res => {
									uni.navigateBack()
								},600)
							}
						});
					}
				});
			},
			confirmOrder(order_id){//确定收货
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
								setTimeout( res => {
									uni.navigateBack()
								},600)
							}
						});
					}
				});
			},
			finishOrder(order_id){ //完成订单
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
								setTimeout( res => {
									uni.navigateBack()
								},600)
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
		}
	}
</script>

<style>
	page {
		background-color: #F5F5F5;
	}
	.Top_bar{
		background-color: #ff5f40;
		border-bottom: 0 !important;
		color: #fff !important;
	}
	.address{
		height: 85upx;
		background: linear-gradient(#ff5f40, #fa7729);
		padding: 85upx 0 0 0;
	}
	.address .con{
		width: 650upx;
		height: 120upx;
		background-color: #fff;
		margin: 0 auto;
		border-radius: 5px;
		overflow: hidden;
		padding: 25upx;
	}
	.address .con .info{
		font-size: 28upx;
		margin-top: 20upx;
	}
	.address .con .info .tel{
		margin-left: 25upx;
	}
	.address .con .region{
		color: #909090;
		font-size: 26upx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		margin-top: 20upx;
	}
	.address .con .region image{
		width: 18upx;
		height: 22upx;
		margin-right: 25upx;
	}
	.Spinfo{
		width: 650upx;
		padding: 0 25upx 25upx 25upx;
		margin: 110upx auto;
		background-color: #fff;
		border-radius: 5px;
		overflow: hidden;
		font-size: 28upx;
	}
	.Spinfo .Spinfotit{
		height: 80upx;
		border-bottom: 1upx solid #E2E2E2;
		line-height: 80upx;
	}
	.Spinfo .Spinfotit .Spinfoaddress{
		float: left;
	}
	.Spinfo .Spinfotit .type{
		float: right;
		color: #ff792a;
	}
	.Spinfo .details{
		height: 170upx;
		padding: 25upx 0;
		display: flex;
	}
	.Spinfo .details .img{
		display: inline-block;
		width: 170upx;
		height: 170upx;
	}
	.Spinfo .details .img image{
		width: 170upx;
		height: 170upx;
	}
	.Spinfo .details .text{
		margin-left: 30upx;
		display: inline-block;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		line-height: 45upx;
		margin-top: 45upx;
	}
	.orderinfo{
		width: 650upx;
		height: 500upx;
		background-color: #fff;
		border-radius: 5px;
		margin: -85upx auto 0;
		padding: 0 25upx;
		font-size: 28upx;
	}
	.orderinfo .li{
		border-bottom: 1upx solid #E2E2E2;
		height: 99upx;
		line-height: 99upx;
	}
	.orderinfo .li:last-child{
		border: 0;
	}
	
	.orderBtn{
		padding: 20upx 0;
		height: 60upx;
		line-height: 60upx;
		background-color: #fff;
		margin-top: 60upx;
		font-size: 28upx;
	}
	.orderBtn .fl{
		float: left;
		margin-left: 25upx;
	}
	.orderBtn .choice{
		color: #ff792a;
		margin-left: 10upx;
	}
	.orderBtn .fr{
		float: right;
		margin-right: 25upx;
	}
	.orderBtn .fr .btn{
		width: 120upx;
		height: 60upx;
		border: 1upx solid #E2E2E2;
		text-align: center;
		line-height: 60upx;
		display: inline-block;
		margin: 5upx 20upx 0 0;
		border-radius: 3px;
		font-size: 26upx;
		color: #909090;
	}
	.orderBtn .fr .btn:last-child{
		margin-right: 0;
	}
	.orderBtn .fr .choice{
		border: 1upx solid #ff792a;
		color: #ff792a;
		float: right;
	}
</style>
