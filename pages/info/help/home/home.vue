<template>
	<view>
		<!-- #ifndef MP-WEIXIN -->
		<HeadTtop :Title="Title" :topsrc="topsrc" :backshow="backshow"></HeadTtop>
		<!-- #endif -->

		<view class="menuLink">
			<view @click="details(3)" class="li">
				<text class="text">配送说明</text>
				<image class="link" src="../../../../static/images/myright.png" mode=""></image>
			</view>
			<view @click="details(4)" class="li">
				<text class="text">售后服务</text>
				<image class="link" src="../../../../static/images/myright.png" mode=""></image>
			</view>
			<view @click="details(5)" class="li">
				<text class="text">客户服务</text>
				<image class="link" src="../../../../static/images/myright.png" mode=""></image>
			</view>
			<view @click="details(6)" class="li">
				<text class="text">关于APP</text>
				<image class="link" src="../../../../static/images/myright.png" mode=""></image>
			</view>
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
				Title: '帮助中心',
				backshow: true,
				topsrc: '../../../../static/images/back.png',
			}
		},
		methods:{
			details(type){
				let tit = '';
				if( type === 3 ){
					tit = '配送说明'
				}else if( type === 4 ){
					tit = '售后服务'
				}else if( type === 5 ){
					tit = '客户服务'
				}else{
					tit = '关于APP'
				}
				uni.navigateTo({
					url:'/pages/info/help/details/details?type=' + type + '&tit=' + tit
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F5F5F5;
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
</style>
