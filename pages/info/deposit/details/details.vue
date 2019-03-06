<template>
	<view>
		<!-- #ifndef MP-WEIXIN -->
		<HeadTtop :Title="Title" :topsrc="topsrc" :backshow="backshow"></HeadTtop>
		<!-- #endif -->
		
		<view class="examine">
			<view class="img">
				<image src="../../../../static/images/examine.png" mode=""></image>
			</view>
			<view class="state">{{ state }}</view>
			<text class="txt">{{ txt }}</text>
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
				Title: '审核',
				backshow: true,
				topsrc: '../../../../static/images/back.png',
				status:'',
				state:''
			};
		},
		onLoad(e) {
			this.status = e.status
			if( this.status == 2 ){
				this.state = '审核中'
				this.txt = '您已申请退回押金，平台正在审核中。'
			}else{
				this.state = '已退还'
				this.txt = '已退还押金，注意查收'
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	.examine{
		width: 600upx;
		height: 300upx;
		position: fixed;
		left: 50%;
		top: 50%;
		margin: -150upx 0 0 -300upx;
		text-align: center;
		.img{
			width: 115upx;
			height: 115upx;
			margin: 0 auto;
			image{
				width: 115upx;
				height: 115upx;
			}
		}
		.state{
			font-size: 28upx;
			margin: 60upx auto 30upx;
		}
		.txt{
			font-size: 30upx;
			color: #a2a2a2;
		}
	}
</style>
