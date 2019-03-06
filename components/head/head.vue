<template>

	<view class="Top_bar">

		<view class="header">
			<view @click="back" v-if="backshow" class="img">
				<image :src="topsrc"></image>
			</view>
			<view class="text"> {{ Title }} </view>
		</view>
	</view>
</template>

<script>
	const BACK = 1;
	export default {
		props: {
			Title: {
				type: String,
				default: '登录'
			},
			backshow: {
				type: Boolean,
				default: true
			},
			topsrc: {
				type: String,
				default: '../../static/images/back.png'
			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: BACK
				})
			}
		}
	}
</script>

<style lang="scss">
	.Top_bar {
		background-color: #fff;
		border-bottom: 1px solid #e2e2e2;
		color: #333;
	}

	.header {
		width: 100%;
		height: 91upx;
		line-height: 90upx;
		
		text-align: center;
		position: relative;
		flex: 1;
		flex-direction: column;
		

		.img {
			width: 100upx;
			height: 90upx;

			image {
				width: 19upx;
				height: 35upx;
				display: block;
				position: absolute;
				left: 25upx;
				top: 50%;
				margin-top: -17.5upx;
			}
		}

		.text {
			width: 400upx;
			height: 90upx;
			line-height: 90upx;
			position: absolute;
			left: 50%;
			top: 0;
			margin-left: -200upx;
			text-align: center;
			font-size: 36upx;
			
		}
	}
</style>
