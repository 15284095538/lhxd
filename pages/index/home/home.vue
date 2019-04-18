<template>
	<view class="body">
		<view class="swiper">
			<swiper indicator-dots="true" indicator-color="rgba(255,255,255,0.3)" indicator-active-color="rgba(255,255,255,0.8)"
			 autoplay="true" interval="3000" circular="true">
				<swiper-item class="item" :key="index" v-for="(item,index) in imglist">
					<image :src="item.img"></image>
				</swiper-item>
			</swiper>
			<view @tap="cityClick()" class="city">{{ cityName }}</view>
		</view>
		<view class="menuLink">
			<view :key="index" @tap="ListClick(item.id,item.title)" class="li" v-for="(item,index) in menuLink">
				<view class="img">
					<image :src="item.img_url" mode=""></image>
				</view>
				<view class="text">{{ item.title }}</view>
			</view>
		</view>
		<view class="RecommendHot">
			<view class="box">
				<view class="text">
					热门推荐
				</view>
				<view class="link">
					更多>
				</view>
			</view>
		</view>
		<commodityList :SpList="SpList"></commodityList>
	</view>
</template>

<script>
	const DIVISOR = 10000;
	import commodityList from '../../../components/commodityList/commodityList.vue'
	export default {
		components: {
			commodityList
		},
		data() {
			return {
				imglist: [],
				menuLink: [],
				SpList: [],
				onReachBottomshow: true,
				page: 1,
				cityList:[],
				cityName: ''
			};
		},
		onLoad() {
			const that = this
			uni.getStorage({ //判断tokin存在
				key: 'userinfo',
				fail: function(res) {
					uni.redirectTo({
						url: '/pages/login/login'
					})
				}
			});
		},
		onShow() {
			const that = this
			that.page = 1;
			that.onReachBottomshow = true
			that.cityName = uni.getStorageSync('cityName')
			uni.getStorage({ 
				key: 'location',
				success: function(res){
					that.getdata()
				},
				fail: function(res) {
					uni.redirectTo({
						url: '/pages/index/home/homecity'
					})
				}
			});
		},
		onReachBottom() {
			if (this.onReachBottomshow) {
				this.page++
				this.getdata()
			}
		},
		methods: {
			
			getdata() {
				var that = this;
				let params = {
					page: this.page,
					long: uni.getStorageSync('location').latitude + ',' + uni.getStorageSync('location').longitude,
					_token: uni.getStorageSync('userinfo')._token
				}
				this.$http.HttpRequst.request(true, 'index/index', params, 'POST', res => {
					if (that.page == 1) {
						that.imglist = res.data.img
						that.menuLink = res.data.classify
						if (typeof(res.data.goods) === 'string') {
							return false
						}
						that.SpList = res.data.goods
						for (let i = 0; i < that.SpList.length; i++) { //人数除余
							if (that.SpList[i].length > 4) {
								that.SpList[i].initial = `${that.SpList[i].initial/DIVISOR}万`
							}
						}
						if( Number(uni.getStorageSync('userinfo').balance) < 2000 ){
							setTimeout(res=>{
								uni.showToast({
									title: '余额不足,请充值',
									success: 'none',
									duration: 1000
								});
							},500)
						}
					} else {
						if (typeof(res.data.goods) === 'string') {
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
			ListClick(id, text) {
				uni.navigateTo({
					url: '/pages/index/list/list?id=' + id + '&text=' + text
				})
			},
			cityClick(){
				uni.redirectTo({
					url: '/pages/index/home/homecity'
				})
			}
		}
	}
</script>

<style lang="scss">
	.swiper {
		height: 370upx;
		width: 100%;
		
		.city{
			position: absolute;
			left: 30upx;
			top: 30upx;
			z-index: 9;
			color: #fff;
		}
		swiper {
			height: 370upx;
			width: 100%;
		}
		image {
			height: 370upx;
			width: 750upx;
			display: block;
		}
	}
	.menuLink {
		font-size: 0;
		padding-bottom: 20upx;
		.li {
			width: 150upx;
			height: 180upx;
			text-align: center;
			display: inline-block;
			.img {
				width: 92upx;
				height: 92upx;
				margin: 20upx auto;
				border-radius: 50%;
				overflow: hidden;
				image {
					width: 92upx;
					height: 92upx;
					display: block;
				}
			}
			.text {
				font-size: 22upx;
				color: #333333;
				font-size: 26upx;
				color: #93939e;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				line-height: 50upx;
				.choice {
					color: #ff792a;
				}
			}
		}
	}
	.RecommendHot {
		width: 100%;
		height: 90upx;
		background-color: #F5F5F5;
		.box {
			line-height: 90upx;
			padding: 0 25upx;
			.text {
				font-size: 30upx;
				color: #333333;
				float: left;
			}
			.link {
				float: right;
				font-size: 28upx;
				color: #ff792a;
			}
		}
	}
</style>