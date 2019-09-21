<template>
	<!--相机选择-->
	<div class="com_camera">
		<!-- <div class="camera" v-model='camera_type'> -->
		<div class="camera">
			<Button @click="click(value.oId,index)"
				    v-for="(value,index) of list" :key="index" :value="value"
			>
				{{value.oId}}
			</Button>
		</div>
		
		<div>
			<div class="conent">
				<com-all
					v-for="(value,index) of list" :key="value.oId+index" :value="value"
					v-show="camera_type == value.oId"
					:camera_data='camera_data'
					:keyList='value.oKey'>
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
				type:String,
				required:true
			}
		},
		data(){
			return {
				camera_type : '相机一',
				list:[
					{
						oId:'相机一',
						oKey:'svg1'
					},
					{
						oId:'相机二',
						oKey:'svg2'
					},
					{
						oId:'相机三 ',
						oKey:'svg3'
					}
				]
			}
		},
		components:{
			ComAll
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