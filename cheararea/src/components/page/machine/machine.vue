<template>
	<!--主页面-->
	<div class="p_head">
		<div class="c_head">
			<div class="c_head_left">
				<Button @click="onStartCheck()" class="c_button">启动监控</Button>
		    	<Button @click="onManualGrap()" class="c_button">自动抓拍</Button>
		    	<Button class="c_delay">延时<br />时间</Button>
			    <RadioGroup v-model="animal" class="c-radio">
			        <Radio v-for='(value,index) of plastic_mold' :key="index" value="value"
			        	   :label='value.monitorName'
			        	   @click="click(value.monitorName)"
			        >
			        </Radio>

			    </RadioGroup>
			    <div class="c_com_switch">
			    	<com-camera-state></com-camera-state>
			    </div>

			</div>
		    <div>
		    	<!--右箭头-->
		    	<img src=""/>
		    	<Button class="c_round" icon="md-arrow-round-forward" @click="btnclick"></Button>
		    </div>

		</div>
		<!-- {{$store.state.modal_state}} -->
		<!-- 设置 -->
		<div class="p_btn" v-if="p_btn">
			<setting @obtnclick="btnclick"></setting>
		</div>

		<Modal
			v-model="$store.state.modal_state"
			:closable="false"
			class="c_modal">
			<p>{{$store.state.modal_monitor}}</p>
			<p>{{$store.state.modal_camer}}</p>
			<p>{{$store.state.modal_msg}}</p>
		</Modal>
		<div class="c_con">
			<com-camera v-for="(value,index) of plastic_mold" :key="index" value="value"
				        :camera_data="value.monitorId"
				        v-show="animal == value.monitorName"
						:monitorId="value.monitorId"
						:oRes = "oRes" 
						:samples = "samplesList"
			>	
			</com-camera>
		</div>
		
	</div>
</template>

<script>
	import ComCamera from './com/monitor'
	import ComCameraState from '../../components/ioslaver'
	import Setting from '../../components/setting/setting'
	import { mapState } from "vuex"
	
	export default {
		name: 'Monitor',
		props:{
			oRes:{
				type:Boolean,
				required:true
			},
			samplesList:{
				type:Array,
				required:true
			},
		},
		data () {
			return {
				// animal:"monitor2",
				animal:this.$store.state.qtObjects.qtmonitor.monitors[0].monitorName,
				plastic_mold:[
					// {
					// 	label:'塑件',
					// 	oKey:"su"
					// },
					// {
					// 	label:'模腔',
					// 	oKey:"mo"
					// }
				],
				p_btn:false,
				flagNum:0,
			}
		},
		components:{
			ComCamera,
			ComCameraState,
			Setting,
		},
		computed:{
			qtmachine() {
				return this.$store.state.qtObjects.qtmachine
			},
			qtmonitor(){
				return this.$store.state.qtObjects.qtmonitor
			}
		},
		mounted(){
			this.plastic_mold = this.qtmonitor.monitors
		},
		methods:{
			onStartCheck() {
				this.qtmachine.startCheck();
			},
			onManualGrap(){
				
			},
		    click(label){
		    	this.animal = label
			},
			btnclick(){
				this.flagNum++;
				if(this.flagNum%2==1){
					this.p_btn = true;
				}else{
					this.p_btn = false;
				}
				
			}
		}
	}
</script>

<style lang="scss">
	.p_head{
		position: relative;
		.c_head{
			display:flex;
			justify-content: space-between;
			.c_head_left{
				width: 90%;
				margin-bottom: 3px;
				display:flex;
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
				width: 21%;
				height: 62px;
				flex-wrap: wrap;
				text-align: center;
				justify-content: space-around;
				font-size: 2px;
			}
		}
	}
</style>
