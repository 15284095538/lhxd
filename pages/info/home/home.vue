<template>
	<view>
		<view class="userinfo">
			<image class="infoBg" src="../../../static/images/intop.png" mode=""></image>
			<view class="userAvatarUrl">
				<image :src="header" mode=""></image>
			</view>
			<view @tap="modifyinfo()" class="info">
				<view class="text">
					{{ username }}
				</view>
				<view class="text">
					<image src="../../../static/images/phone.png" mode=""></image>{{ tel }}
				</view>
			</view>
			<image @tap="modifyinfo()" class="more" src="../../../static/images/info.png" mode=""></image>
		</view>

		<view class="menuLink">
			<view @tap="orderClick()" class="li">
				<image class="icon" src="../../../static/images/my1.png" mode=""></image>
				<text class="text">我的订单</text>
				<image class="link" src="../../../static/images/myright.png" mode=""></image>
			</view>
			<view @tap="depositClick()" class="li">
				<image class="icon" src="../../../static/images/my2.png" mode=""></image>
				<text class="text">我的押金</text>
				<image class="link" src="../../../static/images/myright.png" mode=""></image>
			</view>
			<view @tap="interests()" class="li">
				<image class="icon" src="../../../static/images/my6.png" mode=""></image>
				<text class="text">会员权益</text>
				<image class="link" src="../../../static/images/myright.png" mode=""></image>
			</view>
			<view @tap="authentication()" class="li">
				<image class="icon" src="../../../static/images/my7.png" mode=""></image>
				<text class="text">认证资料上传</text>
				<image class="link" src="../../../static/images/myright.png" mode=""></image>
			</view>
			<view @tap="helpClick()" class="li">
				<image class="icon" src="../../../static/images/my3.png" mode=""></image>
				<text class="text">帮助中心</text>
				<image class="link" src="../../../static/images/myright.png" mode=""></image>
			</view>
			<view @tap="setup()" class="li">
				<image class="icon" src="../../../static/images/my4.png" mode=""></image>
				<text class="text">我的设置</text>
				<image class="link" src="../../../static/images/myright.png" mode=""></image>
			</view>
			<view @tap="makePhoneCall()" class="li">
				<image class="icon" src="../../../static/images/my5.png" mode=""></image>
				<text class="text">投诉电话</text>
				<image class="link" src="../../../static/images/myright.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				header: '',
				username: '',
				tel: '',
				AuthInfo: []
			};
		},
		onShow() {
			this.header = uni.getStorageSync('userinfo').header
			this.username = uni.getStorageSync('userinfo').username
			this.tel = uni.getStorageSync('userinfo').tel
			this.getIdentityAuthInfo()
			this.getUserino()
		},
		methods: {
			setup() {
				uni.navigateTo({
					url: '/pages/info/setup/home/home'
				})
			},
			modifyinfo() {
				uni.navigateTo({
					url: '/pages/info/modifyinfo/modifyinfo'
				})
			},
			orderClick() {
				uni.navigateTo({
					url: '/pages/info/order/home/home'
				})
			},
			depositClick() {
				uni.navigateTo({
					url: '/pages/info/deposit/home/home'
				})
			},
			helpClick() {
				uni.navigateTo({
					url: '/pages/info/help/home/home'
				})
			},
			interests() {
				uni.navigateTo({
					url: '/pages/info/interests/interests'
				})
			},
			authentication() {

				if (this.AuthInfo.is_Auth === 1) {
					uni.navigateTo({
						url: '/pages/info/authentication/authentication'
					})
				} else if (this.AuthInfo.is_Auth === 2) {
					uni.showToast({
						title: '审核中请等待',
						icon: 'success',
						mask: true,
						duration: 1000
					});
				} else {
					uni.showToast({
						title: '资料认证成功',
						icon: 'success',
						mask: true,
						duration: 1000
					});
				}
			},
			getIdentityAuthInfo() {
				var that = this
				let params = {
					_token: uni.getStorageSync('userinfo')._token
				}
				this.$http.HttpRequst.request(true, 'user/getIdentityAuthInfo', params, 'POST', res => {
					that.AuthInfo = res.data
				});
			},
			makePhoneCall(){
				uni.makePhoneCall({
					phoneNumber: uni.getStorageSync('userinfo').complaint_tel
				});
			},
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
		},
	}
</script>

<style lang="scss">
	.userinfo {
		height: 320upx;
		position: relative;
		overflow: hidden;

		.infoBg {
			position: absolute;
			width: 100%;
			left: 0;
			top: 0;
			height: 320upx;
		}

		.more {
			position: absolute;
			right: 25upx;
			top: 50%;
			width: 17upx;
			height: 29upx;
			margin-top: -14.5upx;
			z-index: 2;
		}

		.userAvatarUrl {
			width: 140upx;
			height: 140upx;
			position: absolute;
			left: 40upx;
			top: 100upx;
			z-index: 2;

			image {
				width: 136upx;
				height: 136upx;
				border: 2upx solid #fff;
				border-radius: 50%;
				overflow: hidden;
			}
		}

		.info {
			width: 500upx;
			height: 100upx;
			position: absolute;
			left: 275upx;
			top: 120upx;

			.text {
				height: 50upx;
				line-height: 50upx;
				color: #ffffff;
				font-size: 32upx;

				image {
					width: 22upx;
					height: 31upx;
					margin: 10upx 5upx 0 0;
					float: left;
				}
			}
		}
	}

	.menuLink {
		background-color: #fff;

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
</style>
