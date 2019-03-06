<template>
	<view>
		<!-- #ifndef MP-WEIXIN -->
		<HeadTtop :Title="Title" :topsrc="topsrc" :backshow="backshow"></HeadTtop>
		<!-- #endif -->
		<view class="feedbacktype">
			<view class="text">意见类型</view>
			<view class="ul">
				<view @tap="typeClick(index)" class="li" :class="typeindex === index ? 'active':'' " v-for="(item,index) in type">
					{{item}}
				</view>
			</view>
		</view>
		<view class="textarea">
			<textarea v-model="textarea" placeholder="请描述您遇到的问题" />
			</view>
		<view @tap="sureClick()" class="register">
			<image src="../../../../static/images/feedbackSure.png" mode=""></image>
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
				Title: '意见反馈',
				backshow: true,
				topsrc: '../../../../static/images/back.png',
				type:['功能问题','商品问题','其它问题'],
				typeindex:0,
				textarea:''
			}
		},
		methods:{
			typeClick(index){
				this.typeindex = index
			},
			sureClick(){
				let params = {
					type: this.typeindex + 1,
					content: this.textarea,
					_token: uni.getStorageSync('userinfo')._token
				}
				
				this.$http.HttpRequst.request(false, 'index/opinion', params, 'POST', res => {
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
	page{
		background-color: #f5f5f5;
	}
	.feedbacktype{
		background-color: #fff;
		margin-top: 30upx;
		padding: 0 25upx;
		overflow: hidden;
		.text{
			font-size: 28upx;
			margin-top: 35upx;
		}
		.ul{
			font-size: 0upx;
			.li{
				width: 140upx;
				height: 55upx;
				border: 1upx solid #ff792a;
				color: #ff792a;
				text-align: center;
				font-size: 26upx;
				display: inline-block;
				border-radius: 5px;
				overflow: hidden;
				margin: 25upx 25upx 25upx 0;
				line-height: 55upx;
				cursor: pointer;
				&.active{
					background-color: #ff792a;
					color: #fff;
				}
			}
		}
	}
	.textarea{
		background-color: #fff;
		padding: 25upx;
		margin-top: 25upx;
		textarea{
			width: 700upx;
			height: 260upx;
			font-size: 28upx;
		}
	}
	.register {
		width: 678upx;
		height: 182upx;
		position: relative;
		left: 50upx;
		top: 480upx;
		cursor: pointer;
	
		image {
			width: 678upx;
			height: 182upx;
			display: block;
		}
	}
</style>
