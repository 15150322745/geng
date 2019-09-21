<template>
	<div class="com_camera_state">
		<!-- {{$store.state.iosState}} -->
		<div class="c_switch">
	    	<span class="c_switch_span">
	    		<p>开模</p>
	    		<i-switch size="small" class="c_switch_span_switch" :value='moldopen'></i-switch>
	    	</span>
	    	<span class="c_switch_span">
	    		<p>安全门</p>
	    		<i-switch size="small" class="c_switch_span_switch" :value='emergency'></i-switch>
	    	</span>
	    	<span class="c_switch_span">
	    		<p>顶退</p>
	    		<i-switch size="small" class="c_switch_span_switch" :value='ejector'></i-switch>
	    	</span>
	    	<span class="c_switch_span">
	    		<p>合模</p>
	    		<i-switch size="small" class="c_switch_span_switch" :value='moldcloseon'></i-switch>
	    	</span>
	    	
	    	<span class="c_switch_span">
	    		<p>射胶</p>
	    		<i-switch size="small" class="c_switch_span_switch" :value='injection'></i-switch>
	    	</span>
	    	<span class="c_switch_span">
	    		<p>顶出</p>
	    		<i-switch size="small" class="c_switch_span_switch" :value='ejection'></i-switch>
	    	</span>
	    	<span class="c_switch_span">
	    		<p>合模</p>
	    		<i-switch size="small" class="c_switch_span_switch" :value='moldcloseoff'></i-switch>
	    	</span>
	    	<span class="c_switch_span">
	    		<p>中子</p>
	    		<i-switch size="small" class="c_switch_span_switch" :value='neutron'></i-switch>
	    	</span>
	    	<span class="c_switch_span">
	    		<p>全自动</p>
	    		<i-switch size="small" class="c_switch_span_switch" :value='automatic'></i-switch>
	    	</span>
	    	<span class="c_switch_span">
	    		<p style='margin: 0;'>NG</p>
	    		<i-switch size="small" class="c_switch_span_switch" :value='ong'></i-switch>
	    	</span>
	    </div>
	</div>
</template>

<script>
	import {mapState} from "vuex"
	export default {
		data(){
			return {
				iosArr:[],
				moldopen:null, //开模
				emergency:null, //安全门
				ejector:null, //顶退
				moldcloseon:null, //合模
				injection:null, //射胶

				yiosArr:[],
				ejection:null, //顶出
				moldcloseoff:null, //合模
				neutron:null, //中子
				automatic:null, //全自动
				ong:null, //ng
			}
		},
		computed:{
			qtioslaver() {
				return this.$store.state.qtObjects.qtioslaver
			},
			onState(){
				return this.$store.state.iosState
			},
			offState(){
				return this.$store.state.yiosState
			},
		},
		watch:{
			'onState':function(value){
				// console.log(value)
				var _this = this;
				for(var i = 0;i<value.length;i++){
					_this.iosArr.push(value[i])
				}
				if(this.iosArr[7]==0){ //开模
					this.moldopen = true
				}else{
					this.moldopen = false
				}
				if(this.iosArr[6]==0){ //安全门
					this.emergency = true
				}else{
					this.emergency = false
				}
				if(this.iosArr[5]==0){ //顶退
					this.ejector = true
				}else{
					this.ejector = false
				}
				if(this.iosArr[4]==0){ //合模
					this.moldcloseon = true
				}else{
					this.moldcloseon = false
				}
				if(this.iosArr[3]==0){ //射胶
					this.injection = true
				}else{
					this.injection = false
				}
				
				if(this.iosArr.length == 8){
					this.iosArr = []
				}
			},
			'offState':function(val){
				// console.log(val)
				var _this = this;
				for(var i = 0;i<val.length;i++){
					_this.yiosArr.push(val[i])
				}
				if(this.yiosArr[7]==0){ //开模
					this.ejection = true
				}else{
					this.ejection = false
				}
				if(this.yiosArr[6]==0){ //安全门
					this.moldcloseoff = true
				}else{
					this.moldcloseoff = false
				}
				if(this.yiosArr[5]==0){ //顶退
					this.neutron = true
				}else{
					this.neutron = false
				}
				if(this.yiosArr[4]==0){ //合模
					this.automatic = true
				}else{
					this.automatic = false
				}
				if(this.yiosArr[3]==0){ //射胶
					this.ong = true
				}else{
					this.ong = false
				}
				
				if(this.yiosArr.length == 8){
					this.yiosArr = []
				}
			}
		}
		// updated(){
		// 	console.log(this.iosState)
		// }

	}
</script>

<style lang="scss">
	.com_camera_state{
		.c_switch{
			display: flex;
			width: 100%;
			flex-wrap: wrap;
			text-align: center;
			justify-content: space-around;
			.c_switch_span{
				height: 29px;
				.c_switch_span_switch{
					margin-top: -10px;
				}
			}
		}
	}
</style>