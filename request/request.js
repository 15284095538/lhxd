const baseUrl = "https://ojcc168.com/port/"; //测试环境

const HttpRequst = {};

HttpRequst.request = function(loading, url, params, method, callBack) { // request封装
	if (loading == true) {
		uni.showLoading({
			title: '加载中'
		});
	}
	uni.request({
		url: baseUrl + url,
		data: params,
		dataType: "json",
		header: {
			'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
		},
		method: method,
		success: function(res) {
			if (loading == true) {
				uni.hideLoading(); //隐藏提示框
			}

			if (res.data.code === 400) {

				uni.showToast({
					title: '请重新登录！',
					duration: 1000,
					success() {
						setTimeout(function() {
							
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
						}, 1000)
					}
				});
			}

			//console.log(res.data);
			callBack(res.data);
		},
		complete: function() {
			if (loading == true) {
				uni.hideLoading(); //隐藏提示框
			}
		}
	})
}

HttpRequst.requestLogin = function(loading, url, params, method, callBack) { // request封装
	if (loading == true) {
		uni.showLoading({
			title: '加载中'
		});
	}
	uni.request({
		url: baseUrl + url,
		data: params,
		dataType: "json",
		header: {
			'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
		},
		method: method,
		success: function(res) {
			if (loading == true) {
				uni.hideLoading(); //隐藏提示框
			}
			//console.log(res.data);
			callBack(res.data);
		},
		complete: function() {
			if (loading == true) {
				uni.hideLoading(); //隐藏提示框
			}
		}
	})
}

HttpRequst.requestUploadFile = function(loading, url, params, tempFilePaths, callBack) { //文件上传
	if (loading == true) {
		uni.showLoading({
			title: '上传中'
		});
	}
	uni.uploadFile({
		url: baseUrl + url,
		filePath: tempFilePaths[0],
		name: 'file',
		formData: params,
		success: (uploadFileRes) => {
			if (loading == true) {
				uni.hideLoading(); //隐藏提示框
			}
			callBack(JSON.parse(uploadFileRes.data))
		}
	});
}



module.exports = {
	HttpRequst: HttpRequst,
}
