<script>
	export default {
		data() {
			return {
				version: 1
			}
		},
		onLaunch: function() {
			this.version = plus.runtime.version
			uni.getSystemInfo({
				success: (res) => {
					//检测当前平台，如果是安卓则启动安卓更新  
					if (res.platform == "android") {
						this.AndroidCheckUpdate();
						console.log(1)
					}
				}
			})
		},
		onShow: function() {},
		onHide: function() {},
		methods: {
			AndroidCheckUpdate() {
				// var _this = this;
				// this.$http.HttpRequst.request(true, 'app/getdownurl', {}, 'POST', res => {
				// 	if (res.data.an_version_num > this.version) {
				// 		uni.showToast({
				// 			title: '有新的版本发布，程序已启动自动更新。新版本下载完成后将自动弹出安装程序。',
				// 			mask: false,
				// 			duration: 5000,
				// 			icon: "none"
				// 		});
				// 		var dtask = plus.downloader.createDownload(res.data.an_url, {}, function(d, status) {
				// 			// 下载完成
				// 			if (status == 200) {
				// 				plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename), {}, {}, function(error) {
				// 					uni.showToast({
				// 						title: '安装失败',
				// 						mask: false,
				// 						duration: 1500
				// 					});
				// 				})
				// 			} else {
				// 				uni.showToast({
				// 					title: '更新失败',
				// 					mask: false,
				// 					duration: 1500
				// 				});
				// 			}
				// 		});
				// 		dtask.start();
				// 	}
				// });
			},
		}
	}
</script>

<style>
	/*每个页面公共css */
	body {
		color: #333;
		background-color: #ffffff;
		font-family: '微软雅黑';
		margin: 0 auto;
		-webkit-tap-highlight-color: transparents
	}

	* {
		margin: 0px;
		padding: 0px;
		list-style: none;
		outline: none;
	}
	
	.no_data{
		font-size: 24upx;
		color: #e6e6e6;
		text-align: center;
	}
	
	.no_data image{
		width: 150upx;
		height: 150upx;
		display: block;
		margin: 80upx auto 20upx;
	}
</style>
