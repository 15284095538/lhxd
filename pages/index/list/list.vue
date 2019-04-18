<template>
	<view>
		<!-- #ifndef MP-WEIXIN -->
		<HeadTtop :Title="Title" :topsrc="topsrc" :backshow="backshow"></HeadTtop>
		<!-- #endif -->

		<view class="tabbar">
			<view @tap="tabbarliClick(0)" :class=" tabbarindex === 0 ? 'active':'' " class="li region">
				{{ fordata.areaName }}
				<image v-if=" tabbarindex != 0 " class="imgOne" src="../../../static/images/list1.png"></image>
				<image v-if=" tabbarindex === 0 " class="imgOne" src="../../../static/images/list1-1.png"></image>
			</view>
			<view @tap="tabbarliPriceClick(1)" :class=" tabbarindex === 1 ? 'active':'' " class="li price">
				价格
				<image class="imgTwo" src="../../../static/images/list2.png"></image>
				<image v-if=" PriceClick === 1 " class="imgTwo" src="../../../static/images/list2-1.png"></image>
				<image v-if=" PriceClick === 2 " class="imgTwo" src="../../../static/images/list2-2.png"></image>
			</view>
			<view @tap="tabbarliClick(2)" :class=" tabbarindex === 2 ? 'active':'' " class="li num">
				销量
			</view>
		</view>

		<view class="list">
			<commodityList :SpList="SpList"></commodityList>
		</view>

		<view @tap="layerFixedClick($event)" v-if=" tabbarindex === 0 " :class="  tabbarindex === 0 ? 'fadeIn':'' " class="layerFixed">
			
			 <scroll-view class="scroll-view_H" scroll-y style="height: 400rpx;">
                <view class="region">
                	<view :key="index" class="li" @tap="areaClick(item.areaName,item.areaId)" v-for="(item,index) in condition.area">
                		{{ item.areaName }}
                	</view>
                </view>
            </scroll-view>
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
		data() {
			return {
				Title: '地坪研磨机',
				backshow: true,
				topsrc: '../../../static/images/back.png',
				id: '',
				tabbarindex: 0,
				PriceClick: 0,
				imgOneSrc: '',
				regionList: [],
				renttype: ['日租', '月租'],
				renttypeindex: 0,
				SpList: [],
				page:1,
				fordata:{
					areaName:'',
					areaId:'',
					sort:'',
					price:'',
				},
				condition:[],
			};
		},
		onLoad(options) {
			this.Title = options.text
			this.id = options.id

			//#ifdef MP-WEIXIN
			uni.setNavigationBarTitle({
				title: this.Title
			});
			//#endif
			
			this.getcondition();
			
			this.page = 1;
			this.onReachBottomshow = true
			
		},
		onReachBottom() {
			if (this.onReachBottomshow) {
				this.page++
				this.getdata()
			}
		},
		onPageScroll(){
			this.tabbarindex = 5;
		},
		methods: {
			tabbarliClick(index) {
				this.tabbarindex = index;
				this.PriceClick = 0;
				this.fordata.price = '';
				if( index == 2 ){
					this.fordata.sort = this.condition.sort.back;
				}else{
					this.fordata.sort = '';
				}
				this.page = 1
				this.getdata()
			},
			tabbarliPriceClick(index) {
				this.tabbarindex = index;
				this.page = 1
				this.fordata.sort = '';
				this.PriceClick++;
				if (this.PriceClick === 3) {
					this.PriceClick = 1;
				}
				if( this.PriceClick == 1 ){
					this.fordata.price = this.condition.price.high
				}else if( this.PriceClick == 2 ){
					this.fordata.price = this.condition.price.low
				}else{
					this.fordata.price = ''
				}
				this.getdata()
			},
			layerFixedClick(event) {
				this.tabbarindex = 5;
			},
			areaClick(name,id){
				this.fordata.areaName = name
				this.fordata.areaId = id
				this.getdata()
			},
			getcondition(){
				var that = this;
				let params = {
					long: uni.getStorageSync('location').latitude + ',' + uni.getStorageSync('location').longitude,
					_token: uni.getStorageSync('userinfo')._token
				}
				that.$http.HttpRequst.request(true, 'index/condition', params, 'POST', res => {
					console.log( res )
					if( res.code == 200 ){
						that.condition = res.data
						that.fordata.areaName = res.data.area[0].areaName
						that.fordata.areaId = res.data.area[0].areaId,
						that.fordata.price = ''
						that.fordata.sort = ''
					}
					this.getdata();
				});
			},
			getdata() {
				var that = this;
				let params = {
					page: this.page,
					classify: this.id,
					areaId: this.fordata.areaId,
					sort: this.fordata.sort,
					price: this.fordata.price,
					long: uni.getStorageSync('location').latitude + ',' + uni.getStorageSync('location').longitude,
					_token: uni.getStorageSync('userinfo')._token
				}
				this.$http.HttpRequst.request(true, 'index/goods_list', params, 'POST', res => {
					if (that.page == 1) {
						if( typeof(res.data) === 'string' ){
							return false
						}
						that.SpList = res.data
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
							that.SpList = that.SpList.concat(res.data);
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

	.list {
		margin-top: 25upx;
	}

	.tabbar {
		height: 88upx;
		width: 100%;
		background-color: #fff;
	}

	.tabbar .active {
		color: #ff792a;
	}

	.tabbar .li {
		height: 88upx;
		line-height: 88upx;
		display: inline-block;
		font-size: 26upx;
		width: 250upx;
		text-align: center;
		position: relative;
	}

	.tabbar .li .imgOne {
		width: 16upx;
		height: 7upx;
		position: absolute;
		left: 75%;
		top: 50%;
		margin-top: -3.5upx;
	}

	.tabbar .li .imgTwo {
		width: 17upx;
		height: 19upx;
		position: absolute;
		left: 75%;
		top: 50%;
		margin-top: -9.5upx;
	}

	.tabbar .li:last-child .imgOne {
		left: 85%;
	}


	.layerFixed {
		width: 100%;
		height: 100%;
		background-color: red;
		position: fixed;
		left: 0;
		top: 179upx;
		overflow: hidden;
		background-color: rgba(0, 0, 0, 0.5);
	}

	/* #ifdef MP-WEIXIN */
	.layerFixed {
		top: 88upx;
	}

	/* #endif */

	.layerFixed .region {
		background-color: #fff;
		padding: 0 25upx 25upx;
		overflow: hidden;
	}

	.layerFixed .region .li {
		height: 75upx;
		font-size: 26upx;
		line-height: 75upx;
		border-bottom: 1upx solid #e2e2e2;
	}

	.layerFixed .time {
		background-color: #fff;
		padding: 25upx;
		overflow: hidden;
	}

	.layerFixed .time .li {
		display: inline-block;
		width: 140upx;
		height: 55upx;
		line-height: 55upx;
		text-align: center;
		font-size: 26upx;
		color: #ff792a;
		border: 1upx solid #ff792a;
		margin-right: 25upx;
		border-radius: 5px;
		overflow: hidden;
	}

	.layerFixed .time .active {
		background-color: #ff792a;
		color: #fff;
	}

	.fadeIn {
		animation: FadeIn 0.3s;
	}

	@keyframes FadeIn {
		from {
			opacity: 0;
			transform: translateY(-100%)
		}

		to {
			opacity: 1;
			transform: translateY(0)
		}
	}
</style>
