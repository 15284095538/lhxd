<template>
	<view>
		<!-- #ifndef MP-WEIXIN -->
		<HeadTtop :Title="Title" :topsrc="topsrc" :backshow="backshow"></HeadTtop>
		<!-- #endif -->
		<view class="newsList">
			<view class='li' @tap="details(item.id)" v-for=' (item,index) in list.data' :key="index">
				<!-- <view class='tit'>
					<view class='spot' v-if='item.status'></view>{{item.content}}
				</view> -->
				<view class='describe'>{{item.content}}</view>
				<view class='time'>{{item.update_time}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import HeadTtop from "../../../components/head/head.vue"
	export default {
		components: {
			HeadTtop
		},
		data() {
			return {
				Title: '消息',
				backshow: false,
				topsrc: '../../../static/images/back.png',
				list: [],
				onReachBottomshow: true,
				page: 1
			};
		},
		onLoad() {

		},
		onShow() {
			this.page = 1;
			this.onReachBottomshow = true
			this.getdata()
		},
		onReachBottom() {
			if (this.onReachBottomshow) {
				this.page++
				this.getdata()
			}
		},
		methods: {
			getdata() {
				var that = this;
				let params = {
					page: this.page,
					_token: uni.getStorageSync('userinfo')._token
				}
				this.$http.HttpRequst.request(true, 'message/getMessage', params, 'POST', res => {

					if (that.page == 1) {
						that.list = res.data
					} else {
						if (typeof(res.data) === '') {
							that.onReachBottomshow = false
						} else {
							that.list.data = that.list.data.concat(res.data.data);
						}
					}
				});
			},
			details(id) {
				uni.navigateTo({
					url: '/pages/news/details/details?id=' + id
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #f5f5f5;
	}

	.newsList .li {
		width: 630rpx;
		padding: 30rpx;
		overflow: hidden;
		background-color: #fff;
		margin: 30rpx auto 0;
		border-radius: 30rpx;
	}

	.newsList .li .tit {
		height: 40rpx;
		line-height: 40rpx;
		font-size: 28rpx;
	}

	.newsList .li .tit .spot {
		width: 10rpx;
		height: 10rpx;
		background-color: #f36501;
		float: left;
		border-radius: 50%;
		margin: 18rpx 30rpx 0 0;
	}

	.newsList .li .describe {
		height: 40rpx;
		line-height: 40rpx;
		font-size: 24rpx;
		color: #8b8b8b;
		margin: 10rpx auto 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.newsList .li .time {
		height: 40rpx;
		line-height: 40rpx;
		font-size: 24rpx;
		color: #8b8b8b;
		margin: 10rpx auto 0;
		text-align: right;
	}
</style>
