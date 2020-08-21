<template>
	<view>
		<!-- #ifndef MP-WEIXIN -->
		<HeadTtop :Title="Title" :topsrc="topsrc" :backshow="backshow"></HeadTtop>
		<!-- #endif -->

		<view class="depositList">
			<view class="box">
				
				<view v-if="SpList.data == ''" class="no_data">
					<image src="../../../../static/images/no_data.png" mode=""></image>
					暂无数据
				</view>
				
				<view @tap="detailsClick(item.status)" :key="index" class="li" v-for="(item,index) in SpList.data">
					<view class="status">
						<text v-if=" item.status === 1 " >待退还</text>
						<text v-if=" item.status === 2 " >待审核</text>
						<text v-if=" item.status === 3 " >已退还</text>
					</view>
					<view class="top">
						<view class="img">
							<image :src="item.good.img_url" mode=""></image>
						</view>
						<view class="text">
							<view class="tit">{{ item.good.goods_name }}</view>
							<view class="oneday">
								<text class="choice">￥{{ item.good.day_money }}/天</text>(普通会员)
							</view>
							<view class="onemonth">
								<text class="choice">￥{{ item.good.vip_day_money }}/天</text>(VIP会)
							</view>
						</view>
					</view>
					<view class="bottom">
						<view class="fl">
							<text class="choice">￥{{ item.cash_pledge }}</text> (押金)
						</view>
						<view v-if=" item.status === 1 " @tap="myCashPledge(item.id)" class="btn">
							退押金
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
				Title: '我的押金',
				backshow: true,
				topsrc: '../../../../static/images/back.png',
				page:1,
				onReachBottomshow: true,
				SpList: []
			};
		},
		onLoad() {
			this.getdata()
		},
		onReachBottom() {
			if (this.onReachBottomshow) {
				this.page++
				this.getdata()
			}
		},
		methods:{
			getdata(){
				var that = this;
				let params = {
					page: this.page,
					_token: uni.getStorageSync('userinfo')._token
				}
				this.$http.HttpRequst.request(true, 'user/myCashPledge', params, 'POST', res => {
					if( res.code == 200 ){
						if (that.page == 1) {
							that.SpList = res.data
						}else{
							if ( res.data.data == '') {
								that.onReachBottomshow = false
							} else {
								that.SpList.data = that.SpList.data .concat(res.data.data);
							}
						}
					}
				});
			},
			myCashPledge(id){
				var that = this;
				let params = {
					cash_pledge_id: id,
					_token: uni.getStorageSync('userinfo')._token
				}
				this.$http.HttpRequst.request(false, 'user/drawback', params, 'POST', res => {
					if( res.code == 200 ){
						uni.showToast({
							title: '成功',
							duration: 600,
							success() {
								setTimeout( res => {
									that.getdata()
								},600)
							}
						});
					}
				});
			},
			detailsClick(status){
				if( status != 1 ){
					uni.navigateTo({
						url: '/pages/info/deposit/details/details?status=' + status
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}

	.depositList {
		width: 100%;
		background-color: #F5F5F5;
		min-height: 380upx;
		padding-bottom: 40upx;

		.box {
			padding: 0 25upx;
			overflow: hidden;

			.li {
				width: 650upx;
				padding: 25upx;
				height: 340upx;
				background-color: #fff;
				margin-top: 25upx;
				border-radius: 10upx;
				overflow: hidden;
				box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
				
				.status{
					height: 40upx;
					text-align: right;
					color: #ff792a;
					font-size: 24upx;
					margin-bottom: 10upx;
					line-height: 40upx;
				}
				
				.top{
					overflow: hidden;
					padding-bottom: 30upx;
				}

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
					}

					.oneday {
						font-size: 26upx;
						color: #93939e;
						line-height: 50upx;

						.choice {
							color: #ff792a;
						}
					}

					.onemonth {
						font-size: 26upx;
						color: #93939e;
						line-height: 50upx;

						.choice {
							color: #ff792a;
						}
					}
				}

				.bottom {
					width: 650upx;
					height: 80upx;
					line-height: 80upx;
					border-top: 1upx solid #e2e2e2;
					color: #93939e;
					font-size: 28upx;

					.fl {
						float: left;

						.choice {
							color: #ff792a;
						}
					}

					.btn {
						float: right;
						height: 50upx;
						width: 140upx;
						text-align: center;
						border: 1upx solid #ff792a;
						color: #ff792a;
						line-height: 50upx;
						border-radius: 3px;
						margin-top: 15upx;
					}
				}
			}
		}
	}
</style>
