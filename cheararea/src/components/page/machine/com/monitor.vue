<template>
	<!--相机选择-->
	<div class="com_camera">
		<div class="camera">
			<Button @click="click(value.cmonitorId)"
				    v-for="(value,index) of list" 
					:key="index" 
					:value="value" 
					:class="{btnbackcol : camera_type == value.cmonitorId}"
			>
				相机{{value.cmonitorId}}
			</Button>
		</div>
		
		<div>
			<div class="conent">
				<com-all
					v-for="(value,index) of list" :key="''+value.cmonitorId+index" :value="value"
					v-show="camera_type == value.cmonitorId"
					:camera_data='camera_data'
					:keyList='value.cmonitorId'
					:monitorId="monitorId"
					:cameraId='camera_type'
					:oRes = "oRes" 
					:samples = "samples"
					>
				</com-all>
			</div>
		</div>
	</div>
</template>

<script>
	import ComAll from './cmonitor'
	
	export default {
		props:{
			camera_data:{
				type:Number,
				required:true
			},
			monitorId:{
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
				camera_type : 1,
				list:[
					// {
					// 	oId:'相机一',
					// 	oKey:'svg1'
					// },
					// {
					// 	oId:'相机二',
					// 	oKey:'svg2'
					// },
					// {
					// 	oId:'相机三 ',
					// 	oKey:'svg3'
					// }
				]
			}
		},
		components:{
			ComAll
		},
		computed:{
			qtmonitor(){
				return this.$store.state.qtObjects.qtmonitor
			}
		},
		mounted(){
			this.list = this.qtmonitor.monitors[0].cmonitors
		},
		methods:{
			click(oId){
				this.camera_type = oId
			}
		}
	}
</script>

<style lang="scss">
	.com_camera{
		width: 800px;
		height: 500px;
		.btnbackcol{
			background: #9FC5D6
		}
		.camera{
			width: 100%;
			height: 35px;	
		}
		.conent{
			.content{
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
		}
	}
</style>