<template>
	<view>
		<!-- #ifndef MP-WEIXIN -->
		<HeadTtop :Title="Title" :topsrc="topsrc" :backshow="backshow"></HeadTtop>
		<!-- #endif -->
		<view class="swiper">
			<button class="numImg" @tap="shareClick" open-type="share"></button>
			
			<swiper indicator-dots="true" indicator-color="rgba(255,121,42,0.3)" indicator-active-color="rgba(255,121,42,0.8)"
			 autoplay="true" interval="3000" circular="true">
				<swiper-item class="item" :key="item" v-for="(item,index) in goodslist.img_url">
					<image :src="item"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="price">
			<view class="tit">
				{{ goodslist.goods_name }}
			</view>
			<view class="oneday">
				<text class="choice">￥{{ goodslist.day_money }}/天</text> (普通会员)
			</view>
			<view class="onemonth">
				<text class="choice">￥{{ goodslist.vip_day_money }}/天 </text> (VIP会员)
			</view>
		</view>
		<view @tap="mapOpen()" class="service-aderss">
			<view class="text">
				<view class="li" v-for="(item,index) in goodslist.stores" :key="index" >
					<view @tap="serviceaderssMap(item.lng,item.lat,item.store_name,item.address)" class="p"><span>服务商店铺名:</span>{{item.store_name}}</view>
					<view @tap="serviceaderssMap(item.lng,item.lat,item.store_name,item.address)" class="p"><span>服务商详细地址:</span>{{item.address}}</view>
					<view @tap="serviceaderssTel(item.tel)" class="p"><span>服务商电话:</span>{{item.tel}}</view>
					<image @tap="serviceaderssMap(item.lng,item.lat,item.store_name,item.address)" src="/static/images/dh.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="service">
			<view class="tit">
				<text class="icon"></text>服务说明
			</view>
			<view class="text">
				{{ goodslist.description }}
			</view>
		</view>
		<view class="delivery">
			<view class="tit">
				<text class="icon"></text>配送方式
			</view>
			<view class="text">
				{{ goodslist.mode }}
			</view>
		</view>
		<view class="spTabbar">
			<view class="li" :key="index" @tap="spTabbarClick(index)" :class=" spTabbarindex === index ? 'active':'' " v-for="(item,index) in spTabbarlist">
				{{ item }}
			</view>
			<view style="width: 100%; overflow: hidden;">
				<view v-if=" spTabbarindex === 0 " class="container">
					<view v-html="goodslist.introduce" ></view>
				</view>
				<view v-if=" spTabbarindex === 1 " class="container">
					<view v-html="goodslist.spec" ></view>
				</view>
				<view v-if=" spTabbarindex === 2 " class="container">
					<view v-html="goodslist.problem" ></view>
				</view>
				<view v-if=" spTabbarindex === 3 " class="container">
					<view v-html="goodslist.methods" ></view>
				</view>
			</view>
		</view>
		<view class="order">
			<view @tap="phoneClick()" class="kefu">
				<image src="../../../static/images/kefu.png" mode=""></image>
				<view class="">客服</view>
			</view>
			<view class="orderText">
				押金：<text class="choice">￥{{ goodslist.day_deposit }}元</text>
			</view>
			<view @tap="sureClick()" class="sure">
				立即租赁
			</view>
		</view>
		
		<view v-if="is_Authshow" @tap="is_AuthfalseClick()" class="is_Auth">
			<image @tap.stop="is_AuthClick()" src="../../../static/images/is_Auth.png" mode=""></image>
		</view>

		<view v-if="layerFixedShow" @tap="layerFixedClick()" class="layerFixed">
			<view @tap.stop="bubbling()" class="ListSelect">
				<!-- <view class="bigTit">选择租赁期限</view>
				<view class="timelist">
					<view @tap="timelistClick(index)" :class=" timelistindex === index ? 'active':'' " v-for="(item,index) in timelist"
					 class="li">
						{{ item }}
					</view>
				</view> -->
				<view class="bigTit">选择时间</view>
				<view class="smallTit">租赁开始时间</view>
				<picker start="2018-12-11" @change="startTimeSelect" class="picker" mode="date">
					<view class="time">
						{{ startTime }}
					</view>
				</picker>
				<view class="smallTit">租赁结束时间</view>
				<picker start="startTime" @change="endTimeSelect" class="picker" mode="date">
					<view class="time">
						{{ endTime }}
					</view>
				</picker>
				<view class="smallTit">附近取货门店</view>
				<picker :range="textList" @change="addressSelect" range-key="store_name" class="picker" mode="selector">
					<view class="time">
						{{address}}
					</view>
				</picker>
				<view @tap="orderCLick()" class="sure">
					确定
				</view>
			</view>
		</view>
		
		<!-- 合同 -->
		<view v-if="htSuerShow" @tap="htSuerShowClick()" class="layerFixed">
			<view class="contract">
				<scroll-view  scroll-y="true" >
					<view v-html="goodslist.hetong"></view>
                </scroll-view>
				<view @tap="htSuer()" class="htSuer">同意</view>
			</view>
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
				Title: '商品详情',
				backshow: true,
				topsrc: '../../../static/images/back.png',
				spTabbarlist: ['商品介绍', '规格参数', '常见问题', '使用方法'],
				spTabbarindex: 0,
				layerFixedShow: false,
				textList: [],
				timelist: ['日租', '月租'],
				startTime: '请选择开始时间',
				endTime: '请选择结束时间',
				address: '请选择收货地址',
				goods_id: '',
				goodslist: [],
				addressId: '',
				is_Authshow:false,
				htSuerShow: false,
				getshareurl: '',
				is_open_auth: 0
			};
		},
		onLoad(e) {
			this.goods_id = e.goods_id;
			this.getdata()
		},
		methods: {
			onShareAppMessage(){
				return {
				  title: this.goodslist.goods_name,
				  imageUrl: this.goodslist.img_url[0],
				  path: '/pages/index/home/home'
				}
			},
			shareClick(){ // 分享
				uni.share({
				    provider: "weixin",
				    scene: "WXSceneSession",
				    type: 0,
				    href: this.getshareurl,
				    title: this.goodslist.goods_name,
				    summary: this.goodslist.description,
				    imageUrl: this.goodslist.img_url[0],
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				});
			},
			getdata() {
				var that = this;
				let params = {
					goods_id: this.goods_id,
					long: uni.getStorageSync('location').latitude + ',' + uni.getStorageSync('location').longitude,
					_token: uni.getStorageSync('userinfo')._token
				}
				this.$http.HttpRequst.request(true, 'index/show', params, 'POST', res => {
					
					const regex = new RegExp('<img', 'gi');
					res.data.introduce = res.data.introduce.replace(regex, `<img style="width: 100%;"`);
					res.data.spec = res.data.spec.replace(regex, `<img style="width: 100%;"`);
					res.data.problem = res.data.problem.replace(regex, `<img style="width: 100%;"`);
					res.data.methods = res.data.methods.replace(regex, `<img style="width: 100%;"`);
					that.goodslist = res.data
				});
				this.$http.HttpRequst.request(true, 'app/getshareurl', {}, 'POST', res => {
					that.getshareurl = res.data
				});
				
				this.$http.HttpRequst.request(true, 'index/getIsOpenAuth', {}, 'POST', res => {
					that.is_open_auth = res.data.is_open_auth
				});
			},
			spTabbarClick(index) {
				this.spTabbarindex = index
			},
			htSuer(){ //同意合同
				if( this.goodslist.is_Auth == 2 || this.goodslist.is_Auth == 1 ){
					if( this.is_open_auth == 0 ){
						this.is_Authshow = true
						return false
					}
				}
				var that = this;
				let params = {
					good_id: this.goods_id,
					long: uni.getStorageSync('location').latitude + ',' + uni.getStorageSync('location').longitude,
					_token: uni.getStorageSync('userinfo')._token
				}
				this.$http.HttpRequst.request(true, 'order/getStore', params, 'POST', res => {
					if (res.code == 200) {
						that.textList = res.data
					}
					//console.log(that.textList = res.data)
				});
				this.layerFixedShow = true
			},
			sureClick() {
				const that = this
				uni.getStorage({ //判断tokin存在
					key: 'userinfo',
					fail: function(res) {
						
						// #ifdef  MP-WEIXIN
							uni.redirectTo({
								url: '/pages/wxlogin/wxlogin'
							})
						// #endif
						
						// #ifdef  APP-PLUS
							uni.redirectTo({
								url: '/pages/login/login'
							})
						// #endif
						return false
					}
				});
				
				
				
				this.htSuerShow = true
			},
			htSuerShowClick(){
				this.htSuerShow = !this.htSuerShow
			},
			layerFixedClick() {
				this.layerFixedShow = !this.layerFixedShow
			},
			bubbling() {

			},
			phoneClick(){ // 拨打电话
				uni.makePhoneCall({
					phoneNumber: this.goodslist.kefu_tel
				});
			},
			serviceaderssTel(tel){
				uni.makePhoneCall({
					phoneNumber: tel
				});
			},
			serviceaderssMap(lng,lat,store_name,address){
				uni.openLocation({
					latitude: Number(lat),
					longitude: Number(lng),
					name: store_name,
					address: address,
					success: function () {
						console.log('success');
					}
				});
			},
			addressSelect(e) {
				this.address = this.textList[e.detail.value].store_name
				this.addressId = this.textList[e.detail.value].id
			},
			startTimeSelect(e) {
				this.startTime = e.detail.value
			},
			endTimeSelect(e) {
				this.endTime = e.detail.value
			},
			is_AuthfalseClick(){
				this.is_Authshow = false
			},
			is_AuthClick(e){
				if( this.goodslist.is_Auth == 1 ){
					uni.navigateTo({
						url: '/pages/info/authentication/authentication'
					})
				}else{
					uni.showToast({
						title: '审核中请等待',
						icon: 'success',
						mask: true,
						duration: 1000
					});
					this.is_Authshow = false
				}
			},
			orderCLick() {
				let startTime = Date.parse(new Date(this.startTime))
				let endTime = Date.parse(new Date(this.endTime))
				if (this.startTime == '请选择开始时间') {
					uni.showToast({
						title: '请选择开始时间',
						duration: 1000
					});
					return false
				}
				if (this.endTime == '请选择结束时间') {
					uni.showToast({
						title: '请选择结束时间',
						duration: 1000
					});
					return false
				}
				if (startTime >= endTime) {
					uni.showToast({
						title: '请选择大于一天的时间',
						icon: 'none',
						duration: 1000
					});
					return false
				}
				if (this.addressId == '') {
					uni.showToast({
						title: '请选择门店地址',
						duration: 1000
					});
					return false
				}
				
				if( uni.getStorageSync('userinfo').is_vip == 1 ){
					var money = this.goodslist.vip_day_money
				}else{
					var money = this.goodslist.day_money
				}
				
				uni.navigateTo({
					url: '/pages/payment/payment?startTime=' + this.startTime + '&endTime=' + this.endTime + '&addressId=' + this.addressId +
						'&good_id=' + this.goods_id + '&day_money=' + money + '&day_deposit=' + this.goodslist.day_deposit
				})
			}
		}
	}
</script>

<style lang="scss">
	.swiper {
		height: 320upx;
		width: 100%;
		position: relative;
		border-bottom: 1upx solid #e2e2e2;
		
		.numImg{
			position: absolute;
			right: 15upx;
			top: 15upx;
			width: 48upx;
			height: 48upx;
			z-index: 99;
			background-color: transparent;
			text-align: center;
			background: url(../../../static/images/share.png) no-repeat center center;
			background-size: 100% 100%;
			
			&:after{
				border: 0;
			}
		}

		swiper {
			height: 320upx;
			width: 100%;
		}

		image {
			height: 320upx;
			width: 750upx;
			display: block;
		}
	}

	.price {
		border-bottom: 20upx solid #f5f5f5;
		height: 180upx;
		overflow: hidden;
		padding: 25upx;

		.tit {
			font-size: 32upx;
			line-height: 60upx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.oneday {
			font-size: 28upx;
			line-height: 60upx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.onemonth {
			font-size: 28upx;
			line-height: 60upx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.choice {
			color: #ff792a;
		}
	}

	.service {
		border-bottom: 20upx solid #f5f5f5;
		height: 240upx;
		overflow: hidden;
		padding: 25upx;
		font-size: 28upx;

		.tit {
			font-size: 32upx;
			font-weight: bold;
			line-height: 70upx;

			.icon {
				display: block;
				float: left;
				margin: 25upx 10upx 0 0;
				width: 5upx;
				height: 20upx;
				background-color: #ff792a;
			}
		}

		.text {
			line-height: 55upx;
			padding-left: 10upx;
		}
	}

	.delivery {
		border-bottom: 20upx solid #f5f5f5;
		height: 190upx;
		overflow: hidden;
		padding: 25upx;
		font-size: 28upx;

		.tit {
			font-size: 32upx;
			font-weight: bold;
			line-height: 70upx;

			.icon {
				display: block;
				float: left;
				margin: 25upx 10upx 0 0;
				width: 5upx;
				height: 20upx;
				background-color: #ff792a;
			}
		}

		.text {
			line-height: 55upx;
			padding-left: 10upx;
		}
	}

	.spTabbar {
		line-height: 90upx;
		padding-bottom: 100upx;

		.li {
			width: 187.5upx;
			font-size: 28upx;
			text-align: center;
			border-bottom: 1upx solid #E2E2E2;
			display: inline-block;

			&.active {
				color: #ff792a;
				border-bottom: 1upx solid #ff792a;
			}
		}

		.container {
			padding: 25upx 25upx 25upx 25upx;
			font-size: 28upx;
			line-height: 40upx;
			border-bottom: 30upx solid #f5f5f5;
			
			img{
				width: 100%;
			}
		}
	}

	.order {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100upx;
		display: flex;
		background-color: #fff;
		line-height: 100upx;
		font-size: 28upx;
		z-index: 2;

		.orderText {
			flex: 1;
			padding-left: 25upx;
		}
		
		.kefu{
			width: 100upx;
			display: inline-block;
			height: 100upx;
			text-align: center;
			border-right: 1upx solid #e2e2e2;
			line-height: 20upx;
			
			image{
				width: 40upx;
				height: 40upx;
				margin: 15upx 0 15upx 0;
			}
		}

		.sure {
			width: 210upx;
			text-align: center;
			background-color: #ff792a;
			color: #fff;
			display: inline-block;
		}

		.choice {
			color: #ff792a;
			font-size: 32upx;
		}
	}

	.layerFixed {
		width: 100%;
		height: 100%;
		background-color: red;
		position: fixed;
		z-index: 3;
		left: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		
		
		.contract{
			width: 690upx;
			height: 1060upx;
			background-color: #fff;
			position: absolute;
			left: 50%;
			top: 50%;
			margin-left: -345upx;
			margin-top: -530upx;
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
				width: 570upx;
				height: 900upx;
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
	.is_Auth{
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.5);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 9;
		
		image{
			width: 700upx;
			height: 409upx;
			position: absolute;
			left: 50%;
			top: 50%;
			margin: -204.5upx 0 0 -350upx;
			z-index: 99;
		}
	}
	
	.service-aderss{
		border-bottom: 20upx solid #f5f5f5;
		overflow: hidden;
		padding: 25upx;
		
		.li{
			line-height: 50upx;
			border-bottom: 1px solid #e2e2e2;
			padding: 25upx 60upx 25upx 0;
			font-size: 28upx;
			position: relative;
			
			image{
				position: absolute;
				right: 0upx;
				top: 50%;
				width: 60upx;
				height: 60upx;
				margin: -30upx 0 0 0;
				
			}
			span{
				font-weight: bold;
				font-size: 30upx;
				margin-right: 5px;
			}
		}
	}
</style>
