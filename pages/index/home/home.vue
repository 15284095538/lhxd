<template>
	<view class="body">
		<!-- #ifndef MP-WEIXIN -->
		<view :style="{'height':titleBarHeight}" class=""></view>
		<!-- #endif -->
		
		<view class="search">
			<view class="content">
				<view class="int">
					<input type="text" @confirm="searchClick" confirm-type="search" @input="keywordinput" v-model="keyword" placeholder="请搜索您想要的商品" class="input" value="" />
					<view @click="searchClick" class="button">搜索</view>
				</view>
				<view @tap="cityClick()" class="city">{{ cityName }}</view>
			</view>
		</view>
		<view class="swiper">
			<swiper indicator-dots="true" indicator-color="rgba(255,255,255,0.3)" indicator-active-color="rgba(255,255,255,0.8)"
			 autoplay="true" interval="3000" circular="true">
				<swiper-item class="item" :key="index" v-for="(item,index) in imglist">
					<image :src="item.img"></image>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="menuLink">
			<view :key="index" @tap="ListClick(item.id,item.title)" class="li" v-for="(item,index) in menuLink">
				<view class="img">
					<image :src="item.img_url" mode=""></image>
				</view>
				<view class="text">{{ item.title }}</view>
			</view>
		</view>
		<view v-if="ad.length !== 0" class="ad">
			<swiper indicator-dots="true" indicator-color="rgba(255,255,255,0.3)" indicator-active-color="rgba(255,255,255,0.8)"
			 autoplay="true" class="swipers" interval="3000" circular="true">
				<swiper-item @click="advertising(item.id)" class="item" :key="index" v-for="(item,index) in ad">
					<image class="images_AD" :src="item.cover"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="RecommendHot">
			<view class="box">
				<view class="text">
					热门推荐
				</view>
				<!-- <view class="link">
					更多>
				</view> -->
			</view>
		</view>
		<!-- <view @click="layerBox($event)" v-if="layerBoxF" class="layerBox">
			<view @click="advertising(ad.id)" class="img"><image :src="ad.cover" mode=""></image></view>
		</view> -->
		<commodityList :SpList="SpList"></commodityList>
		
		<!-- 合同 -->
		<!-- <view v-if=" is_agree === 1 " class="layerFixed">
			<view class="contract">
				<scroll-view  scroll-y="true" >
					<view v-html="html"></view>
		        </scroll-view>
				<view @tap="htSuer()" class="htSuer">同意</view>
			</view>
		</view> -->
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
				keyword: '',
				layerBoxF: true,
				html: '',
				ad: [],
				cityName: '',
				is_agree: 3,
				statusBarHeight: 0,
				titleBarHeight: 0, 
			};
		},
		onLoad() {
			// const that = this
			// uni.getStorage({ //判断tokin存在
			// 	key: 'userinfo',
			// 	fail: function(res) {
			// 		uni.redirectTo({
			// 			url: '/pages/login/login'
			// 		})
			// 	}
			// });
			
		},
		created() {
			var  that = this;
			 	uni.getSystemInfo({
			 		success: function(res) {
			 			if (res.model.indexOf('iPhone') !== -1) {
							that.titleBarHeight = 44 + 'px';
			 			} else {
			 				that.titleBarHeight = 48  + 'px';
						}
							that.statusBarHeight = res.statusBarHeight  + 'px'
					},
						
			 	})
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
			htSuer(){
				var that = this;
				let params = {
					_token: uni.getStorageSync('userinfo')._token
				}
				that.$http.HttpRequst.request(true, 'app/agree', params, 'POST', res => {
						that.is_agree = 2
				});
			},
			advertising(id){
				uni.navigateTo({
					url: '/pages/index/advertising/advertising?id=' + id
				})
			},
			// layerBox(event){
			// 	this.layerBoxF = false
			// },
			keywordinput(e){
				this.keyword = e.detail.value
			},
			searchClick(){
				//console.log( this.keyword )
				uni.navigateTo({
					url: '/pages/index/search/search?keyword=' + this.keyword
				})
			},
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
						that.ad = res.data.ad
						that.html = res.data.html
						that.is_agree = res.data.is_agree
						// if( that.ad === '' ){
						// 	that.layerBoxF = false
						// }else{
						// 	that.layerBoxF = true
						// }
						if (typeof(res.data.goods) === 'string') {
							return false
						}
						that.SpList = res.data.goods
						for (let i = 0; i < that.SpList.length; i++) { //人数除余
							if (that.SpList[i].length > 4) {
								that.SpList[i].initial = `${that.SpList[i].initial/DIVISOR}万`
							}
						}
						// if( Number(uni.getStorageSync('userinfo').balance) < 2000 ){
						// 	setTimeout(res=>{
						// 		uni.showToast({
						// 			title: '余额不足,请充值',
						// 			success: 'none',
						// 			duration: 1000
						// 		});
						// 	},500)
						// }
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
	
	.ad{
		width: 100%;
		height: 200upx;
		border-top: 20upx solid #f5f5f5;
		border-bottom: 20upx solid #f5f5f5;
	}
	
	.ad .swipers {
		overflow: hidden;
		height: 200upx;
		width: 100%;
	}
	
	.ad .images_AD{
		width: 100%;
		height: 100%;
	}
	
	.ad .swiper image{
		width: 100%;
		height: 100%;
	}
	
	.layerBox{
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 9;
		background: rgba(0,0,0,0.5);
	}
	
	.layerBox .img{
		width: 80%;
		position: fixed;
		left: 10%;
		top: 50%;
		height: 200upx;
		margin-top: -100upx;
		z-index: 999;
	}
	
	.layerBox .img image{
		width: 100%;
		height: 100%;
	}
	
	.search {
		padding: 30upx;
		height: 80upx;
		line-height: 80upx;
		border-bottom: 1px solid #dedede;
		font-size: 28upx;
	}

	.search .content {
		padding: 0 120upx 0 120upx;
		height: 80upx;
		position: relative;
		
		.city{
			position: absolute;
			left: 0upx;
			bottom: 0upx;
			z-index: 9;
			font-size: 28upx;
		}
	}

	.search .int {
		background-color: #f7f7f7;
		width: 350upx;
		height: 80upx;
		border-radius: 40upx;
		background: url('../../../static/images/search.png') no-repeat 8% 50%;
		background-size: 40upx 40upx;
		padding-left: 100upx;
		border: 1px solid #dedede;
	}

	.search .int .input {
		width: 100%;
		height: 80upx;
		
	}

	.search .button {
		width: 120upx;
		position: absolute;
		right: 0;
		top: 0;
		line-height: 80upx;
		text-align: center;
	}
	
	.swiper {
		height: 370upx;
		width: 100%;
		
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
	
	.layerFixed {
		width: 100%;
		height: 100%;
		background-color: red;
		position: fixed;
		z-index: 3;
		left: 0;
		height: 100%;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		
		
		.contract{
			width: 630upx;
			height: 1000upx;
			background-color: #fff;
			margin: 140upx auto;
			border-radius: 30upx;
			overflow: hidden;
			
			.htSuer{
				width: 260upx;
				height: 60upx;
				margin: 20upx auto 0;
				background-color: #ff792a;
				border-radius: 10upx;
				text-align: center;
				line-height: 60upx;
				color: #fff;
				font-size: 30upx;
			}
			
			scroll-view{
				width: 540upx;
				height: 840upx;
				margin: 0 auto;
				padding: 30upx;
			}
		}
	
		.ListSelect {
			padding: 25upx 0 0 0;
			background-color: #fff;
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			font-size: 28upx;
	
			.bigTit {
				height: 55upx;
				line-height: 55upx;
				font-weight: bold;
				padding: 0 25upx;
			}
	
			.timelist {
				overflow: hidden;
				line-height: 55upx;
				padding: 0 25upx;
	
				.li {
					width: 140upx;
					display: inline-block;
					color: #ff792a;
					border: 1upx solid #ff792a;
					border-radius: 5px;
					overflow: hidden;
					text-align: center;
					line-height: 55upx;
					display: inline-block;
					margin-right: 25upx;
					margin: 25upx 25upx 0 0;
	
					&.active {
						background-color: #ff792a;
						color: #fff;
					}
				}
			}
	
			.smallTit {
				height: 55upx;
				line-height: 55upx;
				padding: 0 25upx;
	
				&:after {
					content: '*';
					color: #ff792a;
					line-height: 55upx;
				}
			}
	
			.picker {
				width: 700upx;
				margin: 10upx auto;
				height: 70upx;
				border: 1upx solid #E2E2E2;
				line-height: 70upx;
	
				.time {
					margin-left: 25upx;
				}
			}
	
			.sure {
				width: 100%;
				height: 100upx;
				background-color: #ff792a;
				text-align: center;
				line-height: 100upx;
				margin-top: 30upx;
				color: #fff;
				font-size: 32upx;
			}
		}
	}
</style>