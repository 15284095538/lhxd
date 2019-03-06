<template>
	<view>
		<!-- #ifndef MP-WEIXIN -->
		<HeadTtop :Title="Title" :topsrc="topsrc" :backshow="backshow"></HeadTtop>
		<!-- #endif -->

		<view class="int">
			<view class="box">
				<input placeholder="请输入真实姓名" v-model="real_username" type="text">
			</view>
		</view>
		<view class="int">
			<view class="box">
				<input placeholder="请输入邮箱" v-model="email" type="text">
			</view>
		</view>
		<view class="int">
			<view style="border: 0;" class="box">
				<input placeholder="请输入身份证号码" v-model="id_card" type="text">
			</view>
		</view>

		<view class="upload">
			<view class="tit">请上传身份证正面</view>
			<view class="img">
				<image @tap="id_card_faceClick()" v-if=" id_card_face == '' " src="../../../static/images/authentication.png" mode=""></image>
				<image @tap="id_card_faceClick()" v-if=" id_card_face != '' " :src="id_card_face" mode=""></image>
			</view>
		</view>
		<view class="upload">
			<view class="tit">请上传身份证反面</view>
			<view class="img">
				<image @tap="id_card_conClick()" v-if=" id_card_con == '' " src="../../../static/images/authentication.png" mode=""></image>
				<image @tap="id_card_conClick()" v-if=" id_card_con != '' " :src="id_card_con" mode=""></image>
			</view>
		</view>
		<view class="upload">
			<view class="tit">请上传手持身份证照片</view>
			<view class="img">
				<image @tap="hold_id_cardClick()" v-if=" hold_id_card == '' " src="../../../static/images/authentication.png" mode=""></image>
				<image @tap="hold_id_cardClick()" v-if=" hold_id_card != '' " :src="hold_id_card" mode=""></image>
			</view>
		</view>

		<view @tap="SureClick()" class="register">
			<image src="../../../static/images/sure.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	import HeadTtop from '../../../components/head/head.vue'

	export default {
		components: {
			'HeadTtop': HeadTtop
		},
		data() {
			return {
				Title: '认证资料',
				backshow: true,
				topsrc: '../../../static/images/back.png',
				real_username: '',
				email: '',
				id_card: '',
				id_card_face: '',
				id_card_con: '',
				hold_id_card: ''
			}
		},
		methods: {
			SureClick() {
				var that = this;
				var pattern = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				if (that.real_username === '') {
					uni.showToast({
						title: '请输入真实姓名',
						icon: 'success',
						mask: true,
						duration: 1000
					});
					return false
				}
				if (!pattern.test(this.email)) {
					uni.showToast({
						title: '请输入正确邮箱',
						icon: 'success',
						mask: true,
						duration: 1000
					});
					return false
				}
				if (that.email === '') {
					uni.showToast({
						title: '请输入邮箱',
						icon: 'success',
						mask: true,
						duration: 1000
					});
					return false
				}
				if (that.id_card === '') {
					uni.showToast({
						title: '请输入身份证号码',
						icon: 'success',
						mask: true,
						duration: 1000
					});
					return false
				}
				if (that.id_card.length == 18) {

				} else {
					uni.showToast({
						title: '请输入正确身份证号码',
						icon: 'success',
						mask: true,
						duration: 1000
					});
					return false
				}
				if (that.id_card_face === '') {
					uni.showToast({
						title: '请上传身份证反面',
						icon: 'success',
						mask: true,
						duration: 1000
					});
					return false
				}
				if (that.id_card_con === '') {
					uni.showToast({
						title: '请上传身份证反面',
						icon: 'success',
						mask: true,
						duration: 1000
					});
					return false
				}
				if (that.hold_id_card === '') {
					uni.showToast({
						title: '请上传手持身份证照片',
						icon: 'success',
						mask: true,
						duration: 1000
					});
					return false
				}

				let params = {
					_token: uni.getStorageSync('userinfo')._token,
					email: this.email,
					real_username: this.real_username,
					id_card: this.id_card,
					id_card_face: this.id_card_face,
					id_card_con: this.id_card_con,
					hold_id_card: this.hold_id_card,
				}
				this.$http.HttpRequst.request(false, 'user/identityAuth', params, 'POST', res => {

					//console.log(res)

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

			},
			id_card_faceClick() {
				var that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						let params = {
							_token: uni.getStorageSync('userinfo')._token
						}
						that.$http.HttpRequst.requestUploadFile(true, 'index/upload', params, res.tempFilePaths, res => {
							that.id_card_face = res.data.img1
						});
					}
				});
			},
			id_card_conClick() {
				var that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						let params = {
							_token: uni.getStorageSync('userinfo')._token
						}
						that.$http.HttpRequst.requestUploadFile(true, 'index/upload', params, res.tempFilePaths, res => {
							that.id_card_con = res.data.img1
						});
					}
				});
			},
			hold_id_cardClick() {
				var that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						let params = {
							_token: uni.getStorageSync('userinfo')._token
						}
						that.$http.HttpRequst.requestUploadFile(true, 'index/upload', params, res.tempFilePaths, res => {
							that.hold_id_card = res.data.img1
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}

	.int {
		background-color: #fff;
		font-size: 28upx;

		.box {
			width: 690upx;
			height: 100upx;
			line-height: 100upx;
			margin: 0 auto;
			border-bottom: 1upx solid #E2E2E2;

			input {
				width: 690upx;
				height: 100upx;
				line-height: 100upx;
			}
		}
	}

	.upload {
		.tit {
			width: 690upx;
			height: 100upx;
			line-height: 100upx;
			margin: 0 auto;
			font-size: 30upx;
		}

		.img {
			height: 235upx;
			padding: 25upx;
			background-color: #fff;

			image {
				width: 235upx;
				height: 235upx;
			}
		}
	}

	.register {
		width: 678upx;
		height: 182upx;
		position: relative;
		left: 50upx;
		top: 20upx;
		cursor: pointer;

		image {
			width: 678upx;
			height: 182upx;
			display: block;
		}
	}
</style>
