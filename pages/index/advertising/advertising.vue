<template>
	<view class="">
		<!-- #ifndef MP-WEIXIN -->
		<HeadTtop :Title="Title" :topsrc="topsrc" :backshow="backshow"></HeadTtop>
		<!-- #endif -->
		
		<view v-html="list.content" class="list">
			
		</view>
	</view>
</template>

<script>
	import HeadTtop from "../../../components/head/head.vue"
	
	export default {
		components: {
			HeadTtop
		},
		data(){
			return{
				Title: '广告详情',
				backshow: true,
				topsrc: '../../../static/images/back.png',
				list: {},
			    id: ''
			}
		},

		onLoad(e) {
			this.id = e.id
			this.getdata()
		},
		methods:{
			getdata() {
				var that = this;
				let params = {
					id: this.id,
					_token: uni.getStorageSync('userinfo')._token
				}
				this.$http.HttpRequst.request(true, 'ad/info', params, 'POST', res => {
					that.list = res.data
				});
			},
		}
	}
</script>

<style>
	page {
		background-color: #f5f5f5;
	}
	
	.list{
		padding: 30upx;
	}
</style>