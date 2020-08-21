<template>
	<view>
		<!-- #ifndef MP-WEIXIN -->
		<HeadTtop :Title="Title" :topsrc="topsrc" :backshow="backshow"></HeadTtop>
		<!-- #endif -->

		<view class="menuLink">

			<view v-if="wxFalse" @tap="modifypas()" class="li">
				<text class="text">修改密码</text>
				<image class="link" src="../../../../static/images/myright.png" mode=""></image>
			</view>
			<view @tap="feedback()" class="li">
				<text class="text">意见反馈</text>
				<image class="link" src="../../../../static/images/myright.png" mode=""></image>
			</view>
		</view>
		<view v-if="wxFalse" @tap="reLogin()" class="register">
			<image src="../../../../static/images/loginOut.png" mode=""></image>
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
				Title: '设置',
				backshow: true,
				topsrc: '../../../../static/images/back.png',
				wxFalse: true
			}
		},
		onLoad() {
			// #ifdef  MP-WEIXIN
				this.wxFalse = false
			// #endif
		},
		methods: {
			modifypas() {
				uni.navigateTo({
					url: "/pages/info/setup/modifypas/modifypas"
				})
			},
			feedback() {
				uni.navigateTo({
					url: "/pages/info/setup/feedback/feedback"
				})
			},
			reLogin() {
				uni.removeStorage({
					key: 'userinfo',
					success: function(res) {
						uni.redirectTo({
							url: "/pages/login/login"
						})
					}
				});
			}
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}

	.menuLink {
		background-color: #fff;
		margin-top: 20upx;
		padding: 0 25upx;

		.li {
			height: 100upx;
			line-height: 100upx;
			vertical-align: middle;
			overflow: hidden;
			border-bottom: 1upx solid #e2e2e2;
			font-size: 28upx;

			.icon {
				width: 50upx;
				height: 50upx;
				margin: 23upx 20upx 0 0;
				float: left;
			}

			.link {
				width: 14upx;
				height: 26upx;
				float: right;
				margin: 37upx 0 0 0;
			}

			&:last-child {
				border: 0;
			}
		}
	}

	.register {
		width: 678upx;
		height: 182upx;
		position: fixed;
		left: 50upx;
		bottom: 40upx;
		cursor: pointer;

		image {
			width: 678upx;
			height: 182upx;
			display: block;
		}
	}
</style>
