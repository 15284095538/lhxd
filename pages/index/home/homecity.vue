<template>
	<view>
		<view class="li" :key="index" @tap="liClick(item.latitude,item.longitude,item.areaName)" v-for="(item,index) in cityList" >{{item.areaName}}</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				cityList: []
			}
		},
		onLoad(){
			this.getcity()
		},
		methods:{
			getcity(){
				var that = this;
				let params = {
					_token: uni.getStorageSync('userinfo')._token
				}
				this.$http.HttpRequst.request(true, 'index/get_city', params, 'POST', res => {
					if( res.code == 200 ){
						that.cityList = res.data
						uni.getStorage({ //判断tokin存在
							key: 'cityName',
							fail: function(res) {
								let location = {
									longitude: that.cityList[0].longitude,
									latitude: that.cityList[0].latitude
								}
								uni.setStorage({
									key: 'location',
									data: location
								});
								uni.setStorage({
									key: 'cityName',
									data: that.cityList[0].areaName
								});
							}
						});
						this.cityName = uni.getStorageSync('cityName')
					}
				});
			},
			liClick(latitude,longitude,areaName){
				let location = {
					longitude: longitude,
					latitude: latitude
				}
				uni.setStorage({
					key: 'location',
					data: location
				});
				uni.setStorage({
					key: 'cityName',
					data: areaName
				});
				uni.switchTab({
					url: '/pages/index/home/home'
				})
			}
		}
	}
</script>

<style>
	.li{
		height: 100upx;
		line-height: 100upx;
		padding: 0 30upx;
		border-bottom: 1upx solid #E2E2E2;
		font-size: 28upx;
	}
</style>