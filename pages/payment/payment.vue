<template>
	<view>
		<!-- #ifndef MP-WEIXIN -->
		<HeadTtop :Title="Title" :backshow="backshow"></HeadTtop>
		<!-- #endif -->

		<view class="payment">
			<view class="smallTit">姓名</view>
			<view class="inputBox">
				<input type="text" class="text" v-model="username" placeholder="请输入姓名" />
			</view>
			<view class="smallTit">身份证号</view>
			<view class="inputBox">
				<input type="text" class="text" v-model="id_card" placeholder="请输入身份证号" />
			</view>
			<view class="smallTit">手机号</view>
			<view class="inputBox">
				<input type="text" class="text" v-model="mobile" placeholder="请输入手机号" />
			</view>
			<view class="smallTit">选择住宅地址</view>
			<view @tap="showPickerClick()" style="padding-left: 20upx;" class="inputBox">
				{{ adrinfo }}
			</view>
			<view class="smallTit">详细地址</view>
			<view class="inputBox">
				<input type="text" class="text" v-model="address" placeholder="请输入详细地址" />
			</view>
		</view>

		<div class="mpvue-picker">
			<div :class="{'pickerMask':showPicker}" @click="maskClick" catchtouchmove="true"></div>
			<div class="mpvue-picker-content " :class="{'mpvue-picker-view-show':showPicker}">
				<div class="mpvue-picker__hd" catchtouchmove="true">
					<div class="mpvue-picker__action" @click="pickerCancel">取消</div>
					<div class="mpvue-picker__action" @click="pickerConfirm">确定</div>
				</div>
				<picker-view indicator-style="height: 40px;" class="mpvue-picker-view" :value="pickerValue" @change="pickerChange">
					<block>
						<picker-view-column>
							<div class="picker-item" v-for="(item,index) in provinceDataList" :key="index">{{item.label}}</div>
						</picker-view-column>
						<picker-view-column>
							<div class="picker-item" v-for="(item,index) in cityDataList" :key="index">{{item.label}}</div>
						</picker-view-column>
						<picker-view-column>
							<div class="picker-item" v-for="(item,index) in areaDataList" :key="index">{{item.label}}</div>
						</picker-view-column>
					</block>
				</picker-view>
			</div>
		</div>

		<view @tap="addOrder()" class="pay">
			<view class="text">
				共租赁 <text class="choice">{{ allday }}</text> 天，合计 <text class="choice">￥{{ allprice }}</text> 元
			</view>
			<view class="sure">去结算</view>
		</view>

	</view>
</template>

<script>
	import provinceData from '../../request/province.js';
	import cityData from '../../request/city.js';
	import areaData from '../../request/area.js';
	import HeadTtop from '../../components/head/head.vue'
	export default {
		components: {
			'HeadTtop': HeadTtop,
		},
		data() {
			return {
				Title: '输入订单信息',
				backshow: true,
				name: '',
				adrinfo: '请选择',
				pickerValueDefault: [0, 0, 0],
				provinceDataList: [],
				cityDataList: [],
				areaDataList: [],
				showPicker: false,
				startTime: '',
				endTime: '',
				addressId: '',
				good_id: '',
				username: '',
				id_card: '',
				address: '',
				mobile: '',
				day_money:'',//日租金
				day_deposit:'',//押金
			};
		},
		onLoad(e) {
			this.startTime = e.startTime
			this.endTime = e.endTime
			this.addressId = e.addressId
			this.good_id = e.good_id
			this.day_money = e.day_money
			this.day_deposit = e.day_deposit
			this.provinceDataList = provinceData;
			this.cityDataList = cityData[this.pickerValueDefault[0]];
			this.areaDataList = areaData[this.pickerValueDefault[0]][this.pickerValueDefault[1]];
			this.pickerValue = this.pickerValueDefault;
		},
		methods: {
			addOrder() {
				const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if (this.username == '') {
					uni.showToast({
						title: '请输入姓名',
						duration: 1000
					});
					return false
				}
				if (this.id_card == '') {
					uni.showToast({
						title: '请输入身份证号',
						duration: 1000
					});
					return false
				}
				if (this.id_card.length == 18) {

				} else {
					uni.showToast({
						title: '请输入正确身份证号码',
						icon: 'success',
						mask: true,
						duration: 1000
					});
					return false
				}

				if (!myreg.test(this.mobile)) {
					uni.showToast({
						title: '请输入正确手机号',
						duration: 1000
					});
					return false
				}
				if (this.mobile === '') {
					uni.showToast({
						title: '请输入手机号',
						icon: 'success',
						mask: true,
						duration: 1000
					});
					return false
				}
				if (this.adrinfo == '请选择') {
					uni.showToast({
						title: '请选择地区',
						duration: 1000
					});
					return false
				}
				if (this.address == '') {
					uni.showToast({
						title: '请输入详细地址',
						duration: 1000
					});
					return false
				}



				var that = this;
				let params = {
					good_id: this.good_id,
					username: this.username,
					store_id: this.addressId,
					id_card: this.id_card,
					start_time: this.startTime,
					end_time: this.endTime,
					areaname: this.adrinfo,
					address: this.address,
					mobile: this.mobile,
					_token: uni.getStorageSync('userinfo')._token
				}
				this.$http.HttpRequst.request(false, 'order/addOrder', params, 'POST', res => {
					if( res.code == 200 ){
						uni.navigateTo({
							url: '/pages/pay/pay?allday=' + that.allday + '&allprice=' + that.allprice + '&day_money=' + that.day_money + '&day_deposit=' + that.day_deposit + '&cover=' + res.data.good.cover + '&goods_name=' + res.data.good.goods_name + '&order_num=' + res.data.order_num + '&order_id=' + res.data.id
						})
					}
				});
				console.log(params)
			},
			showPickerClick() {
				this.showPicker = true;
			},
			show() {
				setTimeout(() => {
					this.showPicker = true;
				}, 0);
			},
			maskClick() {
				this.pickerCancel();
			},
			pickerCancel() {
				this.showPicker = false;
				this._$emit('onCancel');
			},
			pickerConfirm(e) {
				this.showPicker = false;
				this._$emit('onConfirm');

				this.adrinfo = this.provinceDataList[this.pickerValue[0]].label + this.cityDataList[this.pickerValue[1]].label +
					this.areaDataList[this.pickerValue[2]].label
			},
			showPickerView() {
				this.showPicker = true;
			},
			handPickValueDefault() {
				if (this.pickerValueDefault !== [0, 0, 0]) {
					if (this.pickerValueDefault[0] > provinceData.length - 1) {
						this.pickerValueDefault[0] = provinceData.length - 1;
					}
					if (this.pickerValueDefault[1] > cityData[this.pickerValueDefault[0]].length - 1) {
						this.pickerValueDefault[1] = cityData[this.pickerValueDefault[0]].length - 1;
					}
					if (this.pickerValueDefault[2] > areaData[this.pickerValueDefault[0]][this.pickerValueDefault[1]].length - 1) {
						this.pickerValueDefault[2] = areaData[this.pickerValueDefault[0]][this.pickerValueDefault[1]].length - 1;
					}
				}
			},
			pickerChange(e) {
				let changePickerValue = e.mp.detail.value;
				if (this.pickerValue[0] !== changePickerValue[0]) {
					// 第一级发生滚动
					this.cityDataList = cityData[changePickerValue[0]];
					this.areaDataList = areaData[changePickerValue[0]][0];
					changePickerValue[1] = 0;
					changePickerValue[2] = 0;
				} else if (this.pickerValue[1] !== changePickerValue[1]) {
					// 第二级滚动
					this.areaDataList =
						areaData[changePickerValue[0]][changePickerValue[1]];
					changePickerValue[2] = 0;
				}
				this.pickerValue = changePickerValue;

				this._$emit('onChange');
			},
			_$emit(emitName) {
				let pickObj = {
					label: this._getLabel(),
					value: this.pickerValue,
					cityCode: this._getCityCode()
				};
				this.$emit(emitName, pickObj);
			},
			_getLabel() {
				let pcikerLabel =
					this.provinceDataList[this.pickerValue[0]].label +
					'-' +
					this.cityDataList[this.pickerValue[1]].label +
					'-' +
					this.areaDataList[this.pickerValue[2]].label;
				return pcikerLabel;
			},
			_getCityCode() {
				return this.areaDataList[this.pickerValue[2]].value;
			}
		},
		computed: {
			allday(){
				let startTime = Date.parse(new Date(this.startTime))
				let endTime = Date.parse(new Date(this.endTime))
				return Math.floor((endTime-startTime)/86400000)
			},
			allprice(){
				return (this.allday * Number(this.day_money)) + Number(this.day_deposit)
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}

	.payment {
		background-color: #fff;
		font-size: 28upx;
		padding: 25upx;

		.smallTit {
			height: 55upx;
			line-height: 55upx;
			margin: 20upx 0;

			&:after {
				content: '*';
				color: #ff792a;
				line-height: 55upx;
			}
		}

		.inputBox {
			height: 70upx;
			line-height: 70upx;
			border: 1upx solid #E2E2E2;
			border-radius: 5px;
			overflow: hidden;
			position: relative;

			.text {
				padding-left: 30upx;
				line-height: 70upx;
				height: 70upx;
				font-size: 28upx;
			}

			.picker {
				padding-left: 30upx;
				line-height: 70upx;
				height: 70upx;
				font-size: 28upx;
			}

			.getcode {
				position: absolute;
				right: 20upx;
				top: 0;
				height: 80upx;
				font-size: 26upx;
				color: #ff792a;
				z-index: 2;
				line-height: 70upx;
				height: 70upx;
			}
		}
	}

	.pay {
		height: 100upx;
		position: relative;
		left: 0;
		top: 220upx;
		display: flex;
		line-height: 100upx;
		font-size: 28upx;
		background-color: #fff;

		.text {
			flex: 1;
			overflow: hidden;
			padding-left: 60upx;

			.choice {
				color: #ff792a;
			}
		}

		.sure {
			width: 210upx;
			height: 100upx;
			text-align: center;
			color: #fff;
			background-color: #ff792a;
		}
	}

	.pickerMask {
		position: fixed;
		z-index: 1000;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		font-size: 28upx;
	}

	.mpvue-picker-content {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		transition: all 0.3s ease;
		transform: translateY(100%);
		z-index: 3000;
	}

	.mpvue-picker-view-show {
		transform: translateY(0);
	}

	.mpvue-picker__hd {
		display: flex;
		padding: 18px 30px;
		background-color: #fff;
		position: relative;
		text-align: center;
		font-size: 14px;
	}

	.mpvue-picker__hd:after {
		content: ' ';
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		height: 1px;
		border-bottom: 1px solid #e5e5e5;
		color: #e5e5e5;
		transform-origin: 0 100%;
		transform: scaleY(0.5);
	}

	.mpvue-picker__action {
		display: block;
		flex: 1;
		color: #1aad19;
	}

	.mpvue-picker__action:first-child {
		text-align: left;
		color: #888;
	}

	.mpvue-picker__action:last-child {
		text-align: right;
	}

	.picker-item {
		text-align: center;
		line-height: 40px;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 14px;
	}

	.mpvue-picker-view {
		position: relative;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 200px;
		background-color: rgba(255, 255, 255, 1);
	}
</style>
