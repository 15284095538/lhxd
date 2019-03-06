<template>
	<view>
		<!-- #ifndef MP-WEIXIN -->
		<HeadTtop :Title="Title" :backshow="backshow"></HeadTtop>
		<!-- #endif -->
		<view class="content">
			<view class="menu">
				<scroll-view scroll-y :style="{ height: scrollviewHeight + 'px' }">
					<view :key="index" @tap="menuLiClick(index,item.id)" class="li" :class=" menulistindex === index ? 'active':'' "
					 v-for="(item,index) in menulist">
						{{ item.title }}
					</view>
				</scroll-view>
			</view>
			<view class="container">
				<scroll-view @scrolltolower="containerpage()" scroll-y :style="{ height: scrollviewHeight + 'px' }">
					<view class="ul">
						<view :key="index" @tap="detailsClick(item.goods_id)" class="li" v-for="(item,index) in spList">
							<view class="img">
								<image :src="item.cover" mode=""></image>
							</view>
							<view class="text">
								{{ item.goods_name }}
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import HeadTtop from '../../../components/head/head.vue'

	const MPWEIXINSW = 1100;
	const APPPLUSSW = 1070;
	const H5SW = 1110;

	export default {
		data() {
			return {
				Title: '分类',
				backshow: false,
				menulist: [],
				menulistindex: 0,
				id: '',
				scrollviewHeight: '',
				GetwindowWidth: '',
				spList: [],
				page: 1,
				onReachBottomshow: true,
			}
		},
		components: {
			'HeadTtop': HeadTtop
		},
		onLoad() {
			const that = this;
			uni.getSystemInfo({ //计算scroll-view高度
				success: function(res) {
					that.GetwindowWidth = res.windowWidth
				}
			});
			//#ifdef MP-WEIXIN
			this.scrollviewHeight = MPWEIXINSW * this.GetwindowWidth / 750
			//#endif
			//#ifdef APP-PLUS
			this.scrollviewHeight = APPPLUSSW * this.GetwindowWidth / 750
			//#endif
			//#ifdef H5
			this.scrollviewHeight = H5SW * this.GetwindowWidth / 750
			//#endif

			this.getmenulist();
		},
		methods: {
			getmenulist() {
				var that = this;
				let params = {
					pid: 0,
					_token: uni.getStorageSync('userinfo')._token
				}
				this.$http.HttpRequst.request(true, 'index/classify', params, 'POST', res => {
					if (res.code === 200) {
						that.menulist = res.data;
						that.id = res.data[0].id;
						that.getspList();
					}
				});
			},
			getspList() {
				var that = this;
				let params = {
					page: that.page,
					classify: that.id,
					pagesize: that.pagesize,
					_token: uni.getStorageSync('userinfo')._token
				}
				this.$http.HttpRequst.request(true, 'index/goods_list', params, 'POST', res => {
					if (res.code === 200) {
						if (that.page == 1) {
							if (typeof(res.data) === 'string') {
								that.spList = []
							} else {
								that.spList = res.data;
							}
						} else {
							if (typeof(res.data) === 'string') {
								that.onReachBottomshow = false
							} else {
								that.spList = that.spList.concat(res.data);
								// 							if (that.page * 10 != that.SpList.length) {
								// 								
								// 							}
							}
						}
					}
				});
			},
			containerpage() {
				if (this.onReachBottomshow) {
					this.page++
					this.getspList()
				}
			},
			menuLiClick(index, id) {
				this.menulistindex = index;
				this.id = id;
				this.page = 1;
				this.onReachBottomshow = true
				this.getspList();
			},
			detailsClick(id) {
				uni.navigateTo({
					url: '/pages/index/details/details?goods_id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	.menu {
		width: 170upx;
		float: left;

		.li {
			width: 170upx;
			height: 100upx;
			text-align: center;
			line-height: 100upx;
			font-size: 26upx;
			background-color: #fff;

			&.active {
				color: #ff792a;
				border-left: 1upx solid #ff792a;
			}
		}
	}

	.container {
		float: right;
		width: 560upx;
		margin-left: 20upx;
		overflow: hidden;

		.ul {
			overflow: hidden;
			background-color: #fff;
		}

		.li {

			float: left;
			width: 186upx;
			text-align: center;
			font-size: 28upx;
			padding: 25upx 0;
			
			
			.text{
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				width: 150upx;
				margin: 0 auto;
			}

			.img {
				width: 186upx;
				height: 120upx;

				image {
					width: 125upx;
					height: 85upx;
					display: block;
					margin: 17.5upx auto 0;
				}
			}
		}
	}
</style>
