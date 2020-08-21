<template>
	<view class="">
		<!-- #ifndef MP-WEIXIN -->
		<HeadTtop :Title="Title" :topsrc="topsrc" :backshow="backshow"></HeadTtop>
		<!-- #endif -->
		
		<view class="list">
			<commodityList :SpList="SpList"></commodityList>
		</view>
	</view>
</template>

<script>
	import HeadTtop from "../../../components/head/head.vue"
	import commodityList from "../../../components/commodityList/commodityList.vue"
	
	export default {
		components: {
			HeadTtop,
			commodityList
		},
		data(){
			return{
				Title: '搜索',
				backshow: true,
				topsrc: '../../../static/images/back.png',
				SpList: [],
			    keyword: ''
			}
		},
		onReachBottom() {
			if (this.onReachBottomshow) {
				this.page++
				this.getdata()
			}
		},
		onLoad(e) {
			this.keyword = e.keyword
			this.getdata()
		},
		methods:{
			getdata() {
				var that = this;
				let params = {
					page: this.page,
					keyword: this.keyword,
					long: uni.getStorageSync('location').latitude + ',' + uni.getStorageSync('location').longitude,
					_token: uni.getStorageSync('userinfo')._token
				}
				this.$http.HttpRequst.request(true, 'Index/search', params, 'POST', res => {
					if (that.page == 1) {
						if( typeof(res.data) === 'string' ){
							return false
						}
						that.SpList = res.data.goods
						for (let i = 0; i < that.SpList.length; i++) { //人数除余
							if (that.SpList[i].length > 4) {
								that.SpList[i].initial = `${that.SpList[i].initial/DIVISOR}万`
							}
						}
						//console.log( that.SpList )
					} else {
						if (typeof(res.data) === 'string') {
							that.onReachBottomshow = false
						} else {
							that.SpList = that.SpList.concat(res.data.goods);
							// 							if (that.page * 10 != that.SpList.length) {
							// 								
							// 							}
						}
					}
				});
			},
		}
	}
</script>

<style>
	page {
		background-color: #f5f5f5;
	}
</style>