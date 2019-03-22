<template>
	<view>
		<!-- #ifndef MP-WEIXIN -->
		<HeadTtop :Title="Title" :topsrc="topsrc" :backshow="backshow"></HeadTtop>
		<!-- #endif -->

		<view class="infocontent">
			<view class="li">
				<view class="text">头像</view>
				<image @tap="chooseImage()" class="portrait" :src="header" ></image>
				<image class="arrow" src="../../../static/images/myright.png" mode=""></image>
			</view>
			<view class="li">
				<view class="text">昵称</view>
				<input type="text" v-model="username" class="int" />
				<image class="arrow" src="../../../static/images/myright.png" mode=""></image>
			</view>
			<view class="li">
				<view class="text">手机号</view>
				<view class="int">
					{{ tel }}
				</view>
				<image class="arrow" src="../../../static/images/myright.png" mode=""></image>
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
				Title: '修改个人资料',
				backshow: true,
				topsrc: '../../../static/images/back.png',
				header:'',
				username: '阴雨小城11',
				tel: '136****5260'
			}
		},
		onLoad() {
			this.header = uni.getStorageSync('userinfo').header
			this.username = uni.getStorageSync('userinfo').username
			this.tel = uni.getStorageSync('userinfo').tel
		},
		methods: {
			chooseImage() {
				var that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success: function(res) {
						let params = {
							_token: uni.getStorageSync('userinfo')._token
						}
						that.$http.HttpRequst.requestUploadFile(true, 'index/upload', params, res.tempFilePaths , res => {
							that.header = res.data.img1
						});
					}
				});
			},
			SureClick(){
				let params = {
					header: this.header,
					username: this.username,
					tel: this.tel,
					_token: uni.getStorageSync('userinfo')._token
				}
				this.$http.HttpRequst.request(false, 'user/edit', params, 'POST' , res => {
					
					uni.setStorage({
						key: 'userinfo',
						data: res.data
					});
					
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
	page {
		background-color: #f5f5f5;
	}

	.infocontent {
		background-color: #fff;
		padding: 25upx;
		overflow: hidden;
		margin-top: 30upx;

		.li {
			height: 100upx;
			border-bottom: 1upx solid #e2e2e2;
			line-height: 100upx;
			position: relative;
			font-size: 28upx;

			&:last-child {
				border: 0;
			}

			.int {
				width: 400upx;
				height: 100upx;
				text-align: right;
				position: absolute;
				right: 40upx;
				top: 0;
			}

			.portrait {
				width: 80upx;
				height: 80upx;
				position: absolute;
				right: 40upx;
				top: 10upx;
				border-radius: 50%;
				overflow: hidden;
			}

			.arrow {
				width: 14upx;
				height: 26upx;
				position: absolute;
				right: 0;
				top: 38upx;
			}
		}
	}

	.register {
		width: 678upx;
		height: 182upx;
		position: relative;
		left: 50upx;
		top: 620upx;
		cursor: pointer;

		image {
			width: 678upx;
			height: 182upx;
			display: block;
		}
	}
</style>
