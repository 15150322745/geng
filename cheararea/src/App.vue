<template>
	<keep-alive>
		<router-view v-if="isRouter" style='width: 800px; height: 600px;' 
			:oRes = "oRes"
			:samplesList = "samples"
		/>
		<!-- <router-view style='width: 800px; height: 600px;'
			:oRes = "oRes"
			:samplesList = "samples"
		/> -->
	</keep-alive>
</template>

<script>
	import { QWebChannel } from '../static/js/qwebchannel'
	export default {
		name: 'App',
		data(){
			return {
				isRouter:false,
				oRes:'',
				samples:[],
				delareas:false,

			}
		},
		created(){
			// this.initWs()
		},
		destroyed() {
			// 清除websocket
		},
		mounted(){
			// var wsurl = 'ws://192.168.31.130:1303'
			var wsurl = 'ws://192.168.31.216:1303'
			var socket = new WebSocket(wsurl);
			var flag = '';
			let that = this;
			//打开链接
			socket.onopen = function () {
				new QWebChannel(socket, function (chl) {
					that.$store.dispatch('setSocket',chl.objects)
					window.chl = chl.objects
					// console.log(chl.objects)
					that.isRouter = true;
					chl.objects.qtmachine.startCheckSuccess.connect(function(){
						that.$router.push({path:'startup'})
					});
					chl.objects.qtmachine.startCheckFailed.connect(function(msg,monitorId,camerId){
						that.$store.commit('MODAL_STATE',true)
						that.$store.commit('MSG',msg)
						that.$store.commit('MONITORID',monitorId)
						that.$store.commit('CAMERID',camerId)
					});
					chl.objects.qtmachine.stopCheckSuccess.connect(function(){
						that.$router.push({path:'/'})
					});
					//抓拍
					chl.objects.qtmonitor.responseManualGrab.connect(function(monitorId,camerId,res,msg){
						// console.log(monitorId)
						// console.log(camerId)
						// console.log(msg)
						// console.log(res)
						that.oRes = res
						that.$store.commit('ORES',res)
					})
					//获取所有模板
					chl.objects.qtmonitor.responseSamples.connect(function(monitorId,camerId,samples){
						// console.log(monitorId)
						// console.log(camerId)
						// console.log(samples)
						that.samples = samples
						that.$store.commit('SAMPLES',samples)
					})
					//删除某一样板
					chl.objects.qtmonitor.responseDelSample.connect(function(monitorId,camerId,sampleId,succ){
						// console.log(monitorId)
						// console.log(camerId)
						// console.log(sampleId)
						// console.log(succ)
						that.$store.commit('DELSAMPLED',sampleId)
					})
					//手动测试
					chl.objects.qtmonitor.responseManualCheck.connect(function(monitorId,camerId,res,msg){
						// console.log(monitorId)
						// console.log(camerId)
						// console.log(res)
						// console.log(msg)
					})
					//获取图像
					chl.objects.qtmonitor.responseSampleImage.connect(function(monitorId,camerId,sampleId,base64Img){
						// console.log(monitorId)
						// console.log(camerId)
						// console.log(sampleId)
						// console.log(base64Img)
						that.$store.commit('BASE64IMG',base64Img)
					})
					
					//信号qtioslaver
					chl.objects.qtioslaver.xChanged.connect(function(data){
						// console.log(data.charCodeAt().toString(2))
						that.$store.commit('IOSSTATE',data.charCodeAt().toString(2))
						// console.log(data&0x01)
						// console.log(data&0x02)
						// console.log(data&0x04)
						// console.log(data&0x08)
						// console.log(data&0x10)
						// console.log(data&0x20)
						// console.log(data&0x40)
						// console.log(data&0x80)
					})
					chl.objects.qtioslaver.yChanged.connect(function(dat){
						// console.log(dat)
						that.$store.commit('YIOSSTATE',dat.charCodeAt().toString(2))
					})

					//canvas部分

					//获取所有区域
					chl.objects.qtmonitor.responseCheckAreas.connect(function(monitorId,camerId,caJson){
						// console.log(monitorId)
						// console.log(camerId)
						// console.log(caJson)
						that.$store.commit('CHECKAREA',caJson)
					})
					//删除所有绘制区域
					chl.objects.qtmonitor.responseDelAllCheckArea.connect(function(monitorId,camerId){
						// console.log(monitorId)
						// console.log(camerId)
						that.delareas = true
						that.$store.commit('DELALLAREAS',that.delareas)
					})
					//添加检测区域
					chl.objects.qtmonitor.responseAddCheckArea.connect(function(monitorId,camerId,caJson){
						// console.log(monitorId)
						// console.log(camerId)
						// console.log(caJson)
						// console.log(caJson.checkAreaId)
						that.$store.commit('CAID',caJson.checkAreaId)
						that.$store.commit('ADDCHECKAREA',caJson)
					})
					//删除单一检测区域
					chl.objects.qtmonitor.responseDelCheckArea.connect(function(monitorId,camerId,caId){
						// console.log(monitorId)
						// console.log(camerId)
						// console.log(caId)
						that.$store.commit('ONEID',caId)
					})
					//responseEditCheckArea编辑检测区域
					chl.objects.qtmonitor.responseEditCheckArea.connect(function(monitorId,camerId,caId,caJson){
						// console.log(monitorId)
						// console.log(camerId)
						// console.log(caId,'app')
						// console.log(caJson)
						that.$store.commit('CHECKONEJSON',caJson)
						that.$store.commit('CHECKONEID',caId)
					})
				})
			};
			//接收数据
			socket.onmessage = function (event) {
				var data = event.data;
				console.log(data)
			};
			//关闭链接
			socket.onclose = function () {
				console.log("on_ws_close");
			};
			//链接错误
			socket.onerror = function (error) {
				console.log("web channel error: " + error);
			};
		},
		activated(){

		},
		methods:{
			strToBinary(str){
				var result = [];
				var list = str.split("");
				for(var i=0;i<list.length;i++){
					if(i != 0){
						result.push(" ");
					}
					var item = list[i];
					var binaryStr = item.charCodeAt().toString(2);
					result.push(binartStr);
				}   
				return result.join("");
			},
			
		}
	}	
</script>

<style>
	
	.ivu-modal-footer {
		padding: 12px 18px 12px 18px;
		text-align: center;
	}
	.ivu-modal {
		width: 400px !important;
		position: fixed;
		left: 100px;
		top: 200px;
	}

</style>
