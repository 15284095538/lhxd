<script>
	export default {
		onLaunch: function() {
			//#ifndef H5
			uni.getLocation({
				type: 'wgs84',
				success: function(res) {
					let location = {
						longitude: res.longitude,
						latitude: res.latitude
					}
					uni.setStorage({
						key: 'location',
						data: location
					});
				}
			});
			//#endif
			//#ifdef H5
			let location = {
				longitude: 104.06563984766076,
				latitude: 30.53723692976744
			}
			uni.setStorage({
				key: 'location',
				data: location
			});
			//#endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
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
</style>
