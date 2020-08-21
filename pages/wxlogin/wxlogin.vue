<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<view>
			<view>
				<view class='header'>
					<image src='../../static/images/wxlogin.png'></image>
				</view>
				<view class='content'>
					<view>申请获取以下权限</view>
					<text>获得你的公开信息(昵称，头像、地区等)</text>
				</view>

				<button v-if="!loginFalse" class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN"
				 @getuserinfo="wxGetUserInfo">
					授权登录
				</button>

				<button v-else class='bottom' type='primary' open-type="getPhoneNumber" withCredentials="true" lang="zh_CN"
				 @getphonenumber="getPhoneNumber">
					绑定手机号
				</button>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loginFalse: false
			};
		},
		methods: {
			getPhoneNumber(e) {
				var that = this
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						var params = {
							js_code: encodeURIComponent(loginRes.code),
							_token: uni.getStorageSync('userinfo')._token,
							iv: encodeURIComponent(e.detail.iv),
							encryptedData: encodeURIComponent(e.detail.encryptedData)
						}
						that.$http.HttpRequst.request(true, 'user/decrypt_mobile', params, 'POST', data => {
							if (data.code === 200) {
								uni.switchTab({
									url: '/pages/index/home/home'
								});
								that.loginFalse = true
							} else {
								setTimeout(res => {
									uni.showLoading({
										title: data.msg,
										icon: 'success',
										duration: 1000
									});
								}, 1000)
							}
						});
					}
				});
			},
			wxGetUserInfo() {
				var that = this
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log(loginRes);

						uni.getUserInfo({
							provider: 'weixin',
							success: function(res) {
								//console.log(res)

								var params = {
									js_code: encodeURIComponent(loginRes.code),
									iv: encodeURIComponent(res.iv),
									encryptedData: encodeURIComponent(res.encryptedData)
								}
								
								that.$http.HttpRequst.request(true, 'user/get_user_info', params, 'POST', data => {
									
									console.log(data)
									
									if (data.code === 200) {
										uni.setStorage({
											key: 'userinfo',
											data: data.data
										});
										// uni.switchTab({
										// 	url: '/pages/index/home/home'
										// });
										that.loginFalse = true
									} else {
										setTimeout(res => {
											uni.showLoading({
												title: data.msg,
												icon: 'success',
												duration: 1000
											});
										}, 1000)
									}
								});
							}
						});
					}
				});
			}
		}
	}
</script>

<style>
	.header {
		margin: 90rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
	}

	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}

	.bottom {
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
	}
</style>
