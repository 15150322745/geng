<template>
	<!--相机选择-->
	<div class="com_all">
		<div class="conent">
			<div class="canvas">
				<com-canvas 
					ref='oCanvas'
					:keyList='keyList'
					:camera_data='camera_data'
					>
				</com-canvas>
			</div>
			<div class="operation">
				<com-operation 
					ref='operation'
					:keyList='keyList'
					:camera_data='camera_data'
					></com-operation>
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
				type:String,
				required:true
			},
			camera_data:{
				type:String,
				required:true
			}
		},
		components:{
			ComOperation,
			ComCanvas
		},
		methods:{
			
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