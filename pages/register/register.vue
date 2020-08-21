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
		<!-- <view class="Inputbox" style="background: url('../../static/images/email.png') no-repeat 0 50%; background-size: 34upx 34upx;">
			<input type="text" class="int" placeholder="请输入邮箱" v-model="email" />
		</view> -->
		<view class="Inputbox" style="background: url('../../static/images/pas.png') no-repeat 0 50%; background-size: 26upx 34upx;">
			<input type="password" class="int" placeholder="请输入密码" v-model="pas" />
		</view>
		<view class="Inputbox" style="background: url('../../static/images/code.png') no-repeat 0 50%; background-size: 29upx 32upx;">
			<input type="number" class="int" placeholder="请输入验证码" v-model="yzm" />
			<view v-on:click="settime" class="getcode">{{code}}</view>
		</view>
		<view @tap="registerClick()" class="register">
			<image src="../../static/images/register.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	import HeadTtop from '../../components/head/head.vue'
	export default {
		components: {
			'HeadTtop': HeadTtop
		},
		mounted() {

		},
		data() {
			return {
				Title: '注册',
				backshow: true,
				tel: '',
				pas: '',
				yzm: '',
				email: '',
				code: '获取验证码', // 按钮里显示的内容
				totalTime: 60, //记录具体倒计时时间
				canClick: true //添加canClick
			}
		},
		methods: {
			registerClick() {
				const that = this;
				const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
				const reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
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
				// if (that.email === '') {
				// 	uni.showToast({
				// 		title: '请输入邮箱',
				// 		icon: 'success',
				// 		mask: true,
				// 		duration: 1000
				// 	});
				// 	return false
				// }
				// if( !reg.test(that.email) ){
				// 	uni.showToast({
				// 		title: '请输入正确邮箱',
				// 		icon: 'success',
				// 		mask: true,
				// 		duration: 1000
				// 	});
				// 	return false
				// }
				if (that.pas === '') {
					uni.showToast({
						title: '请输入密码',
						icon: 'success',
						mask: true,
						duration: 1000
					});
					return false
				}
				if (that.yzm === '') {
					uni.showToast({
						title: '请输入验证码',
						icon: 'success',
						mask: true,
						duration: 1000
					});
					return false
				}
				const params = {
					tel: that.tel,
					email: that.email,
					password: that.pas,
					code: that.yzm
				}
				this.$http.HttpRequst.requestLogin(true, 'user/register', params, 'POST', ress => {
					// console.log( res )
					
					if (ress.code === 200) {
						setTimeout(function() {
							uni.navigateBack();
						}, 500)
					}
					setTimeout(res=>{
						uni.showLoading({
							title: ress.msg,
							icon: 'success',
							duration: 1000
						});
					},1000)
				})
			},
			settime: function() { //倒计时
				if (this.tel === '') {
					uni.showToast({
						title: '请输入手机号',
						icon: 'success',
						mask: true,
						duration: 1000
					});
					return false
				}
				if (!this.canClick) {
					return false
				}
				
				const params = {
					mobile: this.tel
				}
				this.$http.HttpRequst.requestLogin(false, 'sms/send', params, 'POST', res => {
					uni.showToast({
						title: res.msg,
						duration: 1000
					});
				})

				this.canClick = false
				this.code = this.totalTime + 's'
				var clock = setInterval(() => {
					this.totalTime--
					this.code = this.totalTime + 's'
					if (this.totalTime < 0) {
						clearInterval(clock)
						this.code = '发送验证码'
						this.totalTime = 60
						this.canClick = true //这里重新开启
					}
				}, 1000)
			},
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
		position: relative;
		line-height: 80upx;

		.int {
			height: 80upx;
		}

		.getcode {
			position: absolute;
			right: 0;
			top: 0;
			height: 80upx;
			font-size: 26upx;
			color: #ff792a;
			z-index: 2;
		}
	}

	.register {
		width: 678upx;
		height: 182upx;
		cursor: pointer;
		position: relative;
		left: 50upx;
		top: 250upx;

		image {
			width: 678upx;
			height: 182upx;
			display: block;
		}
	}
</style>
