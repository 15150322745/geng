<template>
	<!--手动抓拍-->
	<div class="p_manual">
		<div class="c_head">
			<div class="c_head_left">
		    	<Button class="c_button" @click="goToNewPage('/')">停止</Button>
		    	<Button class="c_delay">延时<br />时间</Button>
		    	
			    <RadioGroup v-model="animal" class="c-radio">

			        <Radio v-for='(value,index) of plastic_mold' :key="index" value="value"
			        	   :label='value.label'
			        	   @click="click(value.label)"
			        >
			        </Radio>

			    </RadioGroup>
			    
			    <div class="c_com_switch">
			    	<com-camera-state></com-camera-state>
			    </div>
			    <span class="c_text">等待注塑机信号</span>
			</div>
		    <div>
		    	<img src=""/>
		    	<Button class="c_round" icon="md-arrow-round-forward"></Button>
		    </div>
		</div>
		<div class="c_con">
			<com-camera v-for="(value,index) of plastic_mold" :key="index" value="value"
				        :camera_data="value.oKey"
				        v-show="animal == value.label"
			>	
			</com-camera>
		</div>
	</div>
</template>

<script>
	import ComCamera from './com/monitor'
	import ComCameraState from '../../components/ioslaver'
	
	export default {
		name: 'manual',
		data () {
			return {
				animal:'塑件',
				plastic_mold:[
					{
						label:'塑件',
						oKey:"su"
					},
					{
						label:'模腔',
						oKey:"mo"
					}
				]
			}
		},
		components:{
			ComCamera,
			ComCameraState
		},
		mounted(){
			
		},
		methods:{
			goToNewPage(path, params) {
		        if(params){
		          this.$router.push(path + '/' + params)
		        }else{
		          this.$router.push(path)
		        }
		    },
		    click(label){
		    	this.animal = label
		    }
		}
	}
</script>

<style lang="scss">
	.p_manual{
		.c_head{
			display:flex;
			justify-content: space-between;
			.c_head_left{
				width: 90%;
				margin-bottom: 3px;
				display:flex;
			}
			.c_text{
				height: 62.5px;
				line-height: 62.5px;
				color: red;
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
