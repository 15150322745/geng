<template>
	<!--相机选择-->
	<div class="com_all">
		<div class="conent">
			<div class="canvas">
				<com-canvas 
					ref='oCanvas'
					:changetesting='testingchangedata'
					:keyList='keyList'
					:camera_data='camera_data'
					:monitorId="monitorId"
					:cameraId='cameraId'
					>
				</com-canvas>
			</div>
			<div class="operation">
				<com-operation 
					ref='operation'
					@testingchange="testingchange1" 
					@canvasclear='canvasclear'
					:keyList='keyList'
					:camera_data='camera_data'
					@canvasBig='canvasBig'
					@canvasSma='canvasSma'
					:monitorId="monitorId"
					:cameraId='cameraId'
					:oRes = "oRes"
					:samples = "samples"
					>
				</com-operation>
			</div>
		</div>
	</div>
</template>

<script>
	import ComOperation from './operation'
	import ComCanvas from './canvas'
	
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
		data(){
			return {
				testingchangedata:'rectangle'
			}
		},
		components:{
			ComOperation,
			ComCanvas
		},
		mounted(){
			
		},
		methods:{
			testingchange1(testingchange){    //父组件接受operation并返回给canvas
				this.testingchangedata = testingchange
			},
			canvasclear(){                //父组件接受canvas方法传递给operation
				this.$refs.oCanvas.rectRemove()
			},
			canvasBig(oCanvasId,oSvgId,oComId){
				this.$refs.oCanvas.canvasBig(oCanvasId,oSvgId,oComId)
			},
			canvasSma(oCanvasId,oSvgId,oComId){
				this.$refs.oCanvas.canvasSma(oCanvasId,oSvgId,oComId)
			}
		}
	}
</script>

<style lang="scss">
.conent{
	width: 100%;
	height: 500px;
	display: flex;
	justify-content: space-between;
	.canvas{
		width: 630px;
		height: 500px;
	}
	.operation{
		height: 500px;
		border: 1px solid #9FC5D6;
		border-left: none;
		padding: 0px 5px;
	}			
}

</style>