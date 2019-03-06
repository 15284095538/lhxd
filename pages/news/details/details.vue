<template>
	<view>
		<!-- #ifndef MP-WEIXIN -->
		<HeadTtop :Title="Title" :topsrc="topsrc" :backshow="backshow"></HeadTtop>
		<!-- #endif -->
		
		<view v-html="list.content" class="vHtml">
			
		</view>
	</view>
</template>

<script>
	import HeadTtop from "../../../components/head/head.vue"
	export default {
		components: {
			HeadTtop
		},
		data() {
			return {
				Title: '消息详情',
				backshow: true,
				topsrc: '../../../static/images/back.png',
				list:[]
			};
		},
		onLoad(e) {
			this.id = e.id;
			this.getdata()
		},
		methods: {
			getdata() {
				var that = this;
				let params = {
					id: this.id,
					_token: uni.getStorageSync('userinfo')._token
				}
				this.$http.HttpRequst.request(true, 'message/getMessageInfo', params, 'POST', res => {
					that.list = res.data
				});
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F5F5F5;
	}
	.vHtml{
		padding: 30upx;
		font-size: 28upx;
		line-height: 60upx;
		text-indent: 20upx;
	}
</style>
