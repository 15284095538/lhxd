<template>
	<view>
		<!-- #ifndef MP-WEIXIN -->
		<HeadTtop :Title="Title" :topsrc="topsrc" :backshow="backshow"></HeadTtop>
		<!-- #endif -->
		<view v-html="content.content" class="html">

		</view>
	</view>
</template>

<script>
	import HeadTtop from '../../../../components/head/head.vue'
	export default {
		components: {
			'HeadTtop': HeadTtop
		},
		onLoad(e) {
			this.Title = e.tit
			this.type = e.type
			//#ifdef MP-WEIXIN
			uni.setNavigationBarTitle({
				title: this.Title
			});
			//#endif
			this.getData();
		},
		data() {
			return {
				Title: '配送说明',
				backshow: true,
				topsrc: '../../../../static/images/back.png',
				type: '',
				content: ''
			}
		},
		methods: {
			getData() {
				var that = this;
				let params = {
					classify: this.type,
					_token: uni.getStorageSync('userinfo')._token
				}

				this.$http.HttpRequst.request(true, 'index/help_me', params, 'POST', res => {
					that.content = res.data
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F5F5F5;
	}

	.html {
		padding: 0 25upx;
	}
</style>
