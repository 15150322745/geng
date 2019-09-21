<template>
	<!--画布-->
	<div class="com_canvas" ref='mycom_canvas'>
		<canvas class="myCanvas" ref="canvas"></canvas>
		<div class="svgAll" ref='svg'></div>
				<p>{{keyList}}</p>
				<p>{{camera_data}}</p>
	</div>
</template>
<script>
	import Svg from '../../../../../static/js/svg'
	import SvgDraggable from '../../../../../static/js/svg.draggable'
	import SvgDraw from '../../../../../static/js/svg.draw'
	import SvgPath from '../../../../../static/js/svg.path'
	import SvgResize from '../../../../../static/js/svg.resize'
	import SvgSelect from '../../../../../static/js/svg.select'

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
		data(){
			return {
				canvas:'',
				ctx:'',
				poly1:''
			}
		},
		created(){
//			this.init();
		},
		mounted(){
			this.oshow();
			this.$bus.on('operationdata'+this.camera_data+this.keyList,(canvasdata)=>{
				this.canvasdata = canvasdata
			})
		},
		methods:{
			oshow(){
				this.canvas = this.$refs.canvas;
		      	this.ctx = this.canvas.getContext("2d");
		     	this.poly1 = SVG(this.$refs.svg);
			},
			init(){
				let _this = this
				var imgObj = new Image(); //创建image对象
				var ws = new WebSocket('ws://localhost:8081')
				ws.onmessage = function(e){
					imgObj.src = 'data:image/png;base64,'+e.data
				}
				imgObj.onload = function(){
		            _this.ctx.drawImage(this, 0, 0, _this.canvas.width, _this.canvas.height);
		        }	
			}
		}
	}
</script>

<style lang="scss">
	@import "../../../../../static/css/svg.select.css";
	.com_canvas{
		width: 630px;
		height: 500px;
		position: relative;
		border: 1px solid #9FC5D6;
		.myCanvas{
			position: absolute;
			width: 630px;
			height: 500px;
		}
		.svgAll{
			position: absolute;
			width: 630px;
			height: 500px;
		}
	}
</style>