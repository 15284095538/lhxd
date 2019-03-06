<template>
	<view>
		<!-- #ifndef MP-WEIXIN -->
		<HeadTtop :Title="Title" :topsrc="topsrc" :backshow="backshow"></HeadTtop>
		<!-- #endif -->
		<view class="tittext">
			请给您账号为{{ tel }}修改密码
		</view>
		<view class="Inputbox" style="background: url('../../../../static/images/pas.png') no-repeat 0 50%; background-size: 26upx 34upx;">
			<input type="password" class="int" placeholder="请输入旧密码" v-model="oldPass" />
		</view>
		<view class="Inputbox" style="background: url('../../../../static/images/pas.png') no-repeat 0 50%; background-size: 26upx 34upx;">
			<input type="password" class="int" placeholder="请输入新密码" v-model="password" />
		</view>
		<view class="Inputbox" style="background: url('../../../../static/images/pas.png') no-repeat 0 50%; background-size: 26upx 34upx;">
			<input type="password" class="int" placeholder="请确定新密码" v-model="confirmPass" />
		</view>
		<view @tap="suremodifys()" class="register">
			<image src="../../../../static/images/suremodifys.png" mode=""></image>
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
				Title: '修改密码',
				backshow: true,
				topsrc: '../../../../static/images/back.png',
				password: '',
				oldPass: '',
				confirmPass: '',
				tel:''
			}
		},
		onLoad() {
			this.tel = uni.getStorageSync('userinfo').tel
		},
		methods: {
			suremodifys() {
				if( this.password.length < 6 ){
					uni.showToast({
						title: '密码长度大于6位',
						duration: 1000,
					});
					return false
				}
				var that = this;
				let params = {
					page: this.page,
					password: this.password,
					oldPass: this.oldPass,
					confirmPass: this.confirmPass,
					_token: uni.getStorageSync('userinfo')._token
				}
				
				this.$http.HttpRequst.request(false, 'user/editPass', params, 'POST', res => {
					console.log( res )
					uni.showToast({
						title: res.msg,
						duration: 1000,
						success() {
							setTimeout(function() {
								uni.navigateBack();
							}, 1000)
						}
					});
				});
			}
		}
	}
</script>

<style lang="scss">
	.tittext {
		text-align: center;
		margin: 160upx 0;
		font-size: 30upx;
	}

	.Inputbox {
		width: 550upx;
		border-bottom: 1upx solid #d8d8d8;
		font-size: 26upx;
		padding-left: 40upx;
		margin: 10upx auto 0;
		position: relative;
		line-height: 80upx;
		margin-top: 30upx;

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
		position: relative;
		left: 50upx;
		top: 310upx;
		cursor: pointer;

		image {
			width: 678upx;
			height: 182upx;
			display: block;
		}
	}
</style>
