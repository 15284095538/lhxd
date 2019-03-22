<template>
	<view>
		<!-- #ifndef MP-WEIXIN -->
		<HeadTtop :Title="Title" :backshow="backshow"></HeadTtop>
		<!-- #endif -->
		<view class="logo">
			<image src="../../static/images/logo.png" mode=""></image>
		</view>
		<view class="Inputbox" style="background: url('../../static/images/tel.png') no-repeat 0 50%; background-size: 22upx 34upx;">
			<input type="number" class="int" placeholder="请输入手机号码" v-model="tel" />
		</view>
		<view class="Inputbox" style="background: url('../../static/images/pas.png') no-repeat 0 50%; background-size: 26upx 34upx;">
			<input type="password" class="int" placeholder="请输入密码" v-model="pas" />
		</view>
		<view @tap="forget()" class="forget">忘记密码？</view>
		<view @tap="loginClick()" class="login">
			<image src="../../static/images/login.png" mode=""></image>
		</view>
		<view @click="registerClick()" class="register">
			还没有账号，去注册
		</view>
	</view>
</template>

<script>
	import HeadTtop from '../../components/head/head.vue'

	export default {
		components: {
			'HeadTtop': HeadTtop
		},
		data() {
			return {
				Title: '登录',
				backshow: false,
				tel: '',
				pas: '',
			}
		},
		methods: {
			registerClick() {
				uni.navigateTo({
					url: '/pages/register/register'
				});
			},
			forget() { 
				uni.navigateTo({
					url: '/pages/forgetpas/forgetpas'
				});
			},
			loginClick() {
				const that = this;
				const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if (!myreg.test(that.tel)) {
					uni.showToast({
						title: '请输入正确手机号',
						duration: 1000
					});
					return false
				}
				if (that.tel === '') {
					uni.showToast({
						title: '请输入手机号',
						icon: 'success',
						mask: true,
						duration: 1000
					});
					return false
				}
				if (that.pas === '') {
					uni.showToast({
						title: '请输入密码',
						icon: 'success',
						mask: true,
						duration: 1000
					});
					return false
				}
				const params = {
					tel: that.tel,
					password: that.pas
				}
				this.$http.HttpRequst.requestLogin(true, 'user/login', params, 'POST', res => {
					//console.log(ress)
					const data = res
					if (data.code === 200) {
						uni.setStorage({
							key: 'userinfo',
							data: data.data
						});
						uni.switchTab({
							url: '/pages/index/home/home'
						});
					}else{
						setTimeout(res=>{
							uni.showLoading({
								title: data.msg,
								icon: 'success',
								duration: 1000
							});
						},1000)
					}
					
				})
			}
		}
	}
</script>

<style lang="scss">
	.logo {
		width: 290upx;
		height: 290upx;
		margin: 100upx auto;

		image {
			width: 290upx;
			height: 290upx;
			display: block;
		}
	}

	.Inputbox {
		width: 550upx;
		border-bottom: 1upx solid #d8d8d8;
		font-size: 26upx;
		padding-left: 40upx;
		margin: 10upx auto 0;

		.int {
			height: 80upx;
			line-height: 80upx;
		}
	}

	.forget {
		width: 590upx;
		margin: 20upx auto 0;
		text-align: right;
		font-size: 26upx;
		color: #ff792a;
	}

	.login {
		width: 678upx;
		height: 182upx;
		cursor: pointer;
		margin: 250upx auto 0;

		image {
			width: 678upx;
			height: 182upx;
			display: block;
		}
	}

	.register {
		width: 590upx;
		margin: -30upx auto 0;
		font-size: 26upx;
		color: #ff792a;
		text-align: center;
		position: relative;
		z-index: 2;
	}
</style>
