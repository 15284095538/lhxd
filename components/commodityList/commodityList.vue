<template>
	<view class="SpList">
		<view class="box">
			<view :key="index" @tap="detailsClick(item.goods_id)" class="li" v-for="(item,index) in SpList">
				<view class="img">
					<image :src="item.cover" mode=""></image>
				</view>
				<view class="text">
					<view class="tit">{{ item.goods_name }}</view>
					<view class="oneday">
						VIP:<text class="choice">￥{{ item.vip_day_money }}/天</text>
						<text>&nbsp;&nbsp;</text>
						会员<text class="choice">￥{{ item.day_money }}/天</text>
					</view>
					<view class="bottom">
						<view class="num">
							<image src="../../../static/images/indexNum.png" class="numImg"></image>
							已有
							<text class="choice">{{item.initial}}</text>
							人付款
						</view>
						<!-- <view class="address">
							<image src="../../../static/images/indexStore.png" class="numImg"></image>
							{{item.deunce}}
						</view> -->
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			SpList: {
				type: Array
			}
		},
		data() {
			return {

			};
		},
		methods:{
			detailsClick(goods_id){
				uni.navigateTo({
					url: '/pages/index/details/details?goods_id=' + goods_id
				})
			}
		}
	}
</script>

<style lang="scss" >
	.SpList {
		width: 100%;
		background-color: #F5F5F5;
		min-height: 380upx;
		padding-bottom: 40upx;
		overflow: hidden;

		.box {
			padding: 0 25upx;
			overflow: hidden;

			.li {
				width: 650upx;
				padding: 25upx;
				height: 200upx;
				background-color: #fff;
				margin-top: 25upx;
				border-radius: 10upx;
				box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

				&:first-child {
					margin-top: 0;
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

				.bottom {
					width: 650upx;
					height: 80upx;
					line-height: 80upx;
					border-top: 1upx solid #e2e2e2;
					color: #93939e;
					font-size: 0;

					.choice {
						color: #ff792a;
					}

					.num {
						display: inline-block;
						width: 325upx;
						vertical-align: top;
						font-size: 28upx;

						.numImg {
							width: 28upx;
							height: 28upx;
							display: inline-block;

						}
					}

					.address {
						font-size: 28upx;
						display: inline-block;
						width: 325upx;

						.numImg {
							width: 28upx;
							height: 25upx;
							display: inline-block;

						}
					}
				}
			}
		}
	}
</style>
