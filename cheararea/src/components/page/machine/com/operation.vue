<template>
	<!--操作控制-->
	<div class="com_operation">
		<div class="com_top">
			<p>抓拍模板图像</p>
			<div class="com_top_div">
				<div>
					<RadioGroup v-model="vertical" vertical 
						@on-change='radiochange'
					>
				        <Radio label="shi">
				            <span>实时图像</span>
				        </Radio>
				        <Radio label="ban">
				            <span>模板图像</span>
				        </Radio>	        
			   		</RadioGroup>
			   	</div>
				<Select v-model='samplemodel' style="width:80px" size="small"
					@on-change="oChange"
					@on-open-change="oPenChange"
				>
			        <Option v-for="item in samples" :value="item.sampleId" :key="item.sampleId"
					>
						{{ item.sampleId }}
					</Option>
					<!-- <Option v-for="(value,index) in samples" :value="value.sampleId" :key="index"
					>
						{{ value.sampleId }}
					</Option> -->
			    </Select>
			</div>
		    <Button icon="ios-close-circle" class="btn" @click="requestDelSample()" 

			>
				删除选中模块
			</Button>
		</div>
		
		<div class="com_center">
			<p>绘制检测区域</p>
			<RadioGroup v-model="testing" class="com_center_radio" @on-change="testingchange">
		        <Radio label="rectangle" value="rectangle">
		            	矩形
		        </Radio>
		        <Radio label="basemap" value="basemap">
		             	拖动画布
		        </Radio>     
	   		</RadioGroup>	
	   		<Button icon="ios-close-circle" class="btn" @click="rectRemove">删除所有区域</Button>
	   		<div class="com_center_but">
	   			<Button @click="canvasBig">+</Button>
		   		<Button @click="canvasSma">-</Button>
	   		</div>   		
		</div>
		<div class="com_bom">
			<p>手动测试</p>
			<div>
				<Button @click="requestManualGrap()">手动抓拍</Button>
				<Button @click="requestManualCheck()">手动测试</Button>
			</div>
		</div>
		<!-- 弹窗 -->
		<Modal
			v-model="modal_grapl"
			:closable="false"
			@on-ok="oOk()"
		>
			<p style="text-align:center">是否选择图像为模板图像</p>
		</Modal>

		<Modal
			v-model="modal_del"
			:closable="false"
			@on-ok="oDel()"
		>
			<p style="text-align:center">是否删除模板图像</p>
		</Modal>
	</div>
</template>

<script>
	export default {
		props:{
			keyList:{           
				type:Number,
				required:true
			},
			camera_data:{
				type:Number,
				required:true
			},
			monitorId:{
				type:Number,
				required:true
			},
			cameraId:{
				type:Number,
				required:true
			},
			oRes:{
				type:Boolean,
				required:true
			},
			samples:{
				type:Array,
				required:true
			},

		},
        data () {
            return {
                vertical: 'shi',
				testing:'rectangle',
				samplemodel: '',
				modal_grapl:false,
				modal_del:false,
                samplesList: [
                    
				],
				sampleId:'',
				flag:'',
				oNum:null
            }
		},
		computed:{
			qtmonitor(){
				return this.$store.state.qtObjects.qtmonitor
			},
			sample(){
				return this.$store.state.samples
			},
			delsampled(){
				return this.$store.state.delsampled
			},
			ores(){
				return this.$store.state.ores
			},
		},
		watch:{
			'samples':{
				handler(newvalue,oldvalue){
					// console.log(newvalue)
					this.samplesList = newvalue
					// console.log(this.samplesList)

				},
				immediate:true,
				deep:true
			},
			'sample':{
				handler(newvalue,oldvalue){
					// console.log(newvalue)
					this.samplesList = newvalue
				}
			},
			'delsampled':{
				handler(newvalue,oldvalue){
					//获取模板对象
					this.qtmonitor.requestSamples(this.monitorId,this.cameraId)
				}
			},
			'ores':{
				handler(newvalue,oldvalue){
					//获取模板对象
					this.qtmonitor.requestSamples(this.monitorId,this.cameraId)
					this.$store.state.ores = null
				}
			},
		},
		updated(){
			if(this.flag=='muban'){
				
				// console.log(this.samplesList)
				//添加了判断
				// if(!this.samplesList[0]){
				// 	this.samplemodel=1
				// }else{
				// 	this.samplemodel=this.samplesList[0].sampleId
				// }

				this.samplemodel=this.samplesList[0].sampleId
				
				this.flag = ''
			}
			// console.log($('.ivu-select-selected-value').text())
			this.oNum = parseInt($('.ivu-select-selected-value').text())
			// console.log(typeof($('.ivu-select-selected-value').text()))
		},
        methods : {
        	testingchange(){  //operation的radio改变是发送状态给父组件 //选中矩形
				// this.$emit('testingchange',this.testing)
				this.$bus.emit('operationdata'+''+this.camera_data+this.keyList,this.testing) //使用 vue-bus
        	},
        	canvasBig(){					
        		this.$emit('canvasBig',''+this.camera_data+''+this.keyList+'canvas',this.camera_data+''+this.keyList+'svg',this.camera_data+''+this.keyList)
        	},
        	canvasSma(){
        		this.$emit('canvasSma',''+this.camera_data+''+this.keyList+'canvas',this.camera_data+''+this.keyList+'svg',this.camera_data+''+this.keyList)
			},
			requestManualCheck(){   //手动测试
				this.qtmonitor.requestManualCheck(this.monitorId,this.cameraId)
			},
			rectRemove(){ //接受父组件的canvasclear，删除绘制区域
				this.$emit('canvasclear')
				this.qtmonitor.requestDelAllCheckerArea(this.monitorId,this.cameraId)
        	},			
			radiochange(label){  //选中模板图像
				// console.log(this.sampleId)
				this.$bus.emit('operationvertical'+''+this.camera_data+this.keyList,this.vertical) //使用 vue-bus
				// console.log(label)
				this.qtmonitor.requestSamples(this.monitorId,this.cameraId)
				// console.log(label)  //第一次获取不到可以放在watch中实现
				//或者项目加载就执行sample
				if(label == 'ban'){
					this.flag = 'muban'
					// console.log(this.samplesList)
					// this.samplemodel=this.samplesList[0].sampleId
				}				
			},
			requestManualGrap(){   //手动抓拍
				this.modal_grapl = true //浮层
				//变为模板图像
				if(this.vertical == 'shi'){
					this.vertical = 'ban'
					this.$bus.emit('operationvertical'+''+this.camera_data+this.keyList,this.vertical) //使用 vue-bus
				}
				//点击手动抓拍
				this.qtmonitor.requestManualGrab(this.monitorId,this.cameraId)
				//获取模板对象
				this.qtmonitor.requestSamples(this.monitorId,this.cameraId)
			},
			oOk(){
				this.qtmonitor.requestSamples(this.monitorId,this.cameraId)
				// console.log(this.samplesList)
				// if(this.samplesList){
				// 	this.samplemodel=this.samplesList[0].sampleId
				// }
				this.flag = 'muban'
			},
			oDel(){
				if(this.samplesList){
					this.samplemodel=this.samplesList[0].sampleId
				}
			},
			oChange(value){  //下拉索引
				// console.log(this.monitorId,this.cameraId,value)
				this.qtmonitor.requestSampleImage(this.monitorId,this.cameraId,value)
				this.sampleId = value
			},
			oPenChange(){ //展开下拉
				if(this.vertical == 'shi'){
					this.vertical = 'ban'
					this.$bus.emit('operationvertical'+''+this.camera_data+this.keyList,this.vertical) //使用 vue-bus
				}
				this.qtmonitor.requestSamples(this.monitorId,this.cameraId)
			},
			requestDelSample(){   //删除选中模块
			// console.log()
				this.modal_del = true
				if(this.vertical == 'shi'){
					this.vertical = 'ban'
					this.$bus.emit('operationvertical'+''+this.camera_data+this.keyList,this.vertical) //使用 vue-bus
				}
				//删除
				// console.log(this.oNum)
				if(this.oNum){
					this.qtmonitor.requestDelSample(this.monitorId,this.cameraId,this.oNum)
					// this.oNum = null
				}
				//获取模板
				this.qtmonitor.requestSamples(this.monitorId,this.cameraId)
			},
			
        }
    }
</script>

<style lang="scss">
	.com_operation{
		font-size: 20px;
		width: 158px;
		.btn{
			width: 100%;
		}
		p{
			text-align: center;
		}
		.com_top{
			border: 1px solid #00BFFF;
			padding: 8px;
			border-radius: 5px;
			margin: 10px 0px;
			.com_top_div{
				display: flex;
				align-items: flex-end;
				div{
					margin-bottom: 5px;
				}
			}			
		}
		.com_center{
			margin: 10px 0px;
			border: 1px solid #00BFFF;
			padding: 0px 8px;
			border-radius: 5px;
			p{
				margin: 10px 0px 5px 0px;
			}
			.com_center_radio{
				display: flex;
			}
			button{
				margin-top: 10px;
			}
			.com_center_but{
				button{
					margin: 0;
					width: 45%;
				}
				margin: 10px 0px;
				display: flex;
				justify-content: space-around;
			}
		}
		.com_bom{
			margin: 10px 0px;
			border: 1px solid #00BFFF;
			padding: 8px;
			border-radius: 5px;
			div{
				text-align: center;
				button{
					width: 100%;
					margin: 10px 0 0 0;
				}
			}
		}
	}
</style>