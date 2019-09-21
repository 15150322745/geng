<template>
	<!--启动监控-->
	<div class="p_startup">
		<div class="c_head">
			<div class="c_head_left">
				<Button class="c_button" @click="stopCheck()">停止监控</Button>
		    	<Button class="c_delay">延时<br />时间</Button>
		    	<Button class="c_delay">计数<br />清零</Button>
			    <div class="c_startup_text">
			    	<p>塑件:<span><Icon type="md-checkmark" /></span></p>
			    	<p>模腔:<span></span></p>
			    </div>
			    <div class="c_startup_text">
			    	<p>周期:<span>0</span></p>
			    	<p>塑件异常:<span>0</span></p>
			    	<p>模腔异常:<span>0</span></p>
			    </div>
			    <div class="c_com_switch">
			    	<com-camera-state></com-camera-state>
			    </div>
			</div>
		    <div>
		    	<img src=""/>
		    	<Button class="c_round" icon="md-arrow-round-forward"></Button>
		    </div>
		</div>
		<div class="c_con">
			<!--模块化-->
			<com-camera></com-camera>
		</div>
	</div>
</template>

<script>
	import ComCamera from './com/monitor'
	import ComCameraState from '../../components/ioslaver'
	
	export default {
		name: 'startup',
		data () {
			return {
				animal:'塑件'
			}
		},
		components:{
			ComCamera,
			ComCameraState
		},
		computed:{
			qtmachine() {
				return this.$store.state.qtObjects.qtmachine
			}
		},
		methods:{
			stopCheck() {
		        this.qtmachine.stopCheck();
		    },
		}
	}
</script>

<style lang="scss">
	.p_startup{
		.c_head{
			display:flex;
			justify-content: space-between;
			.c_head_left{
				width: 90%;
				display:flex;
			}
			.c_startup_text{
				border: 1px solid deepskyblue;
				margin: 2px;
				border-radius: 5px;
				padding: 3px 10px 3px 5px ;
				height: 62.5px;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
			}
			.c_button{
				width: 15%;
				height: 62.8px;
				margin-right: 5px;
				background: #9FC5D6;
			}
			.c_round{
				height: 62.8px;
				background: #9FC5D6;
			}
			.c_delay{
				width: 5%;
				height: 62.8px;
				margin: 0;
				padding: 0;
				margin-right: 5px;
				background: #9FC5D6;
			}
			.c-radio{
				height: 62.8px;
				line-height: 62.8px;
				border: 1px solid deepskyblue;
				border-radius: 5px;
				margin-right: 5px;
				padding-left: 5px;
			}
			.c_com_switch{
				border: 1px solid deepskyblue;
				border-radius: 5px;
				display: flex;
				width: 23%;
				height: 62px;
				flex-wrap: wrap;
				text-align: center;
				justify-content: space-around;
				font-size: 2px;
			}
		}
	}
</style>
