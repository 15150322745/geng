<template>
	<!--画布-->
	<div class="com_canvas" ref='mycom_canvas' :id="oComId()">
		<div id="d_btn" v-if="d_btn">
			<Button type="primary" shape="circle" icon="ios-settings" size="small" @click="add1()"></Button>
			<Button type="primary" shape="circle" icon="md-arrow-round-forward" size="small" @click="add2()"></Button>
			<Button type="primary" shape="circle" icon="md-close" size="small" @click="add3()"></Button>
		</div>
		<div id="btn1" v-show="btn1">
			<com-btn1></com-btn1>
		</div>
		<div id="btn2" v-show="btn2">
			<com-btn2
			:btn2Id='btn2Id'
			:btn2List='btn2Click'
			:btn2Img='btn2Img'
			@btn2quxiao='quxiao'
			:monitorId='monitorId'
			:cameraId='cameraId'
			:btn2width='btn2width'
			:btn2height='btn2height'
			>
			
			</com-btn2>
		</div>
		<div>
			<canvas class="myCanvas" ref="canvas" :id="oCanvasId()"></canvas>
			<div class="svgAll" ref='svg' :id="oSvgId()" v-show="svgshow">
				<!-- <div id="divsvg"></div> -->
			</div>
			<div id="divsvg" v-show="svgdivshow">

			</div>
		</div>
	</div>
</template>
<script>
	import Svg from '../../../../../static/js/svg'
	import SvgDraggable from '../../../../../static/js/svg.draggable'
	import SvgDraw from '../../../../../static/js/svg.draw'
	import SvgPath from '../../../../../static/js/svg.path'
	import SvgResize from '../../../../../static/js/svg.resize'
	import SvgSelect from '../../../../../static/js/svg.select'
	import ComBtn1 from './components/btn1'
	import comBtn2 from './components/btn2'

	export default {
		props:{
			changetesting:{          //props接受父组件的值
				type:String,
				required:true
			},
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
		},
		data(){
			return {
				canvas:'',
				ctx:'',
				d_btn:false,
				poly1:'',
                x:0,
                y:0,
                width:0,
                height:0,
				oX:0,
				oY:0,
				oW:0,
				oH:0,
				oXW:0,
				oYH:0,
				shape:'',
				operationdata:{
					canvasdata:'rectangle',
					operation:'shi',
				},
				caArray:[],
				casJson:{
					boundingRect:[],
					contours:[[]],
					groupId:1,
					ignoreAreas:[],
					positionId:2,
					shape:'',
					subAreas:[]
				},
				checkAreaId:0,
				oCaid:'',
				changeJson:{
					boundingRect:[],
					contours:[[]],
					groupId:1,
					ignoreAreas:[],
					positionId:2,
					shape:'',
					subAreas:[]
				},
				sx:0,
				sy:0,
				delAreaId:0,
				oEv:null,
				svgshow:false,
				svgdivshow:false,
				btn2:false,
				btn1:false,
				btn2Id:NaN,
				btn2List:{},
				btn2Img:'',
				btn2Click:{},
				btn2width:0,
				btn2height:0,
				rect:null,
				subig:null,
			}
		},
		components:{
			ComBtn1,
			comBtn2
		},
		created(){
            // this.init();
            this.info()
		},
		mounted(){
			this.oshow();

			//选中矩形
			this.$bus.on('operationdata'+this.camera_data+this.keyList,(canvasdata)=>{
				this.operationdata.canvasdata = canvasdata
			})
			//选中模板
			this.$bus.on('operationvertical'+this.camera_data+this.keyList,(operation)=>{
				this.operationdata.operation = operation
			})
        },
        computed:{
			qtmonitor(){
				return this.$store.state.qtObjects.qtmonitor
			},
			checkarea(){
				return this.$store.state.checkarea
			},
			caId(){
				return this.$store.state.caId
			},
			addcheckarea(){
				return this.$store.state.addcheckarea
			},
			delallarea(){
				return this.$store.state.delallarea
			},
			oneId(){
				return this.$store.state.oneId
			},
			checkonejson(){ //编辑区域
				return this.$store.state.checkonejson
			},
			checkoneid(){
				return this.$store.state.checkoneid
			},
			base64img(){
				return this.$store.state.base64img
			},
		},
		watch:{
			'checkoneid':{ //编辑区域
				handler(newvalue){
					var ev = event || ev
					// console.log(this.checkonejson.checkAreaId)
					$('.'+this.checkonejson.checkAreaId).remove()
					// console.log('编辑区域')
					var _this = this
					this.$store.state.checkoneid = null


					// if(!$(this.checkonejson.checkAreaId+this.checkonejson.shape).selector){
					// 	console.log('需要创建',_this.subig)
					// 	// console.log(this.checkonejson)
					// 	// console.log(this.checkonejson.subAreas)
					// 	// console.log(this.checkonejson.subAreas.length)
					// 	var svgdiv=$('<div></div>')
					// 	svgdiv.attr('id',this.checkonejson.checkAreaId+this.checkonejson.shape)
					// 	svgdiv.css({"left":this.checkonejson.boundingRect[0],"top":this.checkonejson.boundingRect[1]
					// 	,"width":this.checkonejson.boundingRect[2],"height":this.checkonejson.boundingRect[3]})
					// 	$('#divsvg').append(svgdiv)
					// 	// console.log($(this.checkonejson.checkAreaId+this.checkonejson.shape).selector)
					// 	_this.subig = SVG($(this.checkonejson.checkAreaId+this.checkonejson.shape).selector)
					// 	//设置重点检测区域
					// 	for(let j=0;j<this.checkonejson.subAreas.length;j++){
					// 		var substr = ''
					// 		for(let a=0;a<this.checkonejson.subAreas[j].length;a++){
					// 			substr+=this.checkonejson.subAreas[j][a]+' '
					// 		}
					// 		var newsub = 'M'+substr+'Z'
					// 		_this.subig.path(newsub)
					// 		.stroke("blue")
					// 		.opacity(0.5)
					// 		.addClass('my-path')
					// 		.addClass('path')
					// 		.addClass(this.checkonejson.checkAreaId)
					// 	}
					// 	//设置不检测区域
					// 	for(let j=0;j<this.checkonejson.ignoreAreas.length;j++){
					// 		var substr = ''
					// 		for(let a=0;a<this.checkonejson.ignoreAreas[j].length;a++){
					// 			substr+=this.checkonejson.ignoreAreas[j][a]+' '
					// 		}
					// 		var newig = 'M'+substr+'Z'
					// 		_this.subig.path(newig)
					// 		.stroke("blue")
					// 		.fill('blue')
					// 		.opacity(0.5)
					// 		.addClass('path')
					// 		.addClass(this.checkonejson.checkAreaId)
					// 	}
					// }else{
					// 	console.log('不需要创建',_this.subig)
					// 	//设置重点检测区域
					// 	for(let j=0;j<this.checkonejson.subAreas.length;j++){
					// 		var substr = ''
					// 		for(let a=0;a<this.checkonejson.subAreas[j].length;a++){
					// 			substr+=this.checkonejson.subAreas[j][a]+' '
					// 		}
					// 		var newsub = 'M'+substr+'Z'
					// 		_this.subig.path(newsub)
					// 		.stroke("blue")
					// 		.opacity(0.5)
					// 		.addClass('my-path')
					// 		.addClass('path')
					// 		.addClass(this.checkonejson.checkAreaId)
					// 	}
					// 	//设置不检测区域
					// 	for(let j=0;j<this.checkonejson.ignoreAreas.length;j++){
					// 		var substr = ''
					// 		for(let a=0;a<this.checkonejson.ignoreAreas[j].length;a++){
					// 			substr+=this.checkonejson.ignoreAreas[j][a]+' '
					// 		}
					// 		var newig = 'M'+substr+'Z'
					// 		_this.subig.path(newig)
					// 		.stroke("blue")
					// 		.fill('blue')
					// 		.opacity(0.5)
					// 		.addClass('path')
					// 		.addClass(this.checkonejson.checkAreaId)
					// 	}
					// }



					this.poly1.rect(this.checkonejson.boundingRect[2],this.checkonejson.boundingRect[3])
					.move(this.checkonejson.boundingRect[0],this.checkonejson.boundingRect[1])
					.stroke("red")
					.opacity(0.5)
					.addClass('my-rect')
					.addClass(this.checkonejson.checkAreaId)
					.on('click',function(ev){
						_this.poly1.off('mousedown')
						_this.poly1.off('mouseup')
						ev = ev || event
						// console.log('编辑区域图形点击')
						_this.delAreaId = _this.checkonejson.checkAreaId
						_this.btn2List = _this.checkonejson
						$("g").remove()
						//先清除所有外边框
						// SVG.select('.my-rect').selectize(false).resize('stop').draggable('stop',ev)
						//添加单独一个边框
						this.selectize().selectize({deepSelect:true}).resize().draggable(ev);
						//添加三个按钮
						_this.x = this.attr().x
						_this.y = this.attr().y
						$("#d_btn").css({"left":_this.x,"top":_this.y+this.attr().height})
						this.on('mousedown',function(){
							$("#d_btn").css({"left":_this.x,"top":_this.y+this.attr().height})
						})
						//鼠标抬起触发dom位移
						this.on('mouseup',function(ev){
							_this.d_btn = true
							$("#d_btn").css({"left":_this.x,"top":_this.y+this.attr().height})
							//位移先清空要发送的数据
							_this.changeJson.boundingRect = []
							_this.changeJson.contours = [[]]
							_this.changeJson.groupId = 1
							_this.changeJson.ignoreAreas = []
							_this.changeJson.subAreas = []
							_this.changeJson.positionId = 2
							_this.changeJson.shape = ''
							//需要发送的数据
							_this.oX = this.attr().x
							_this.oY = this.attr().y
							_this.oW = this.attr().width
							_this.oH = this.attr().height
							_this.changeJson.shape = "rect"
							_this.changeJson.boundingRect.push(_this.oX)
							_this.changeJson.boundingRect.push(_this.oY)
							_this.changeJson.boundingRect.push(_this.oW)
							_this.changeJson.boundingRect.push(_this.oH)
							_this.oXW = _this.oX + _this.oW 
							_this.oYH = _this.oY + _this.oH
							_this.changeJson.contours[0].push(_this.oX,_this.oY,_this.oXW,_this.oY,_this.oXW,_this.oYH,_this.oX,_this.oYH)
							//编辑图形接口
							_this.qtmonitor.requestEditCheckArea(_this.monitorId,_this.cameraId,_this.checkonejson.checkAreaId,JSON.stringify(_this.changeJson))

						})
						//改变大小
						this.on("resizedone", function(ev) {
							_this.changeJson.boundingRect = []
							_this.changeJson.contours = [[]]
							_this.changeJson.groupId = 1
							_this.changeJson.ignoreAreas = []
							_this.changeJson.subAreas = []
							_this.changeJson.positionId = 2
							_this.changeJson.shape = ''
							//添加数据
							_this.oX = this.attr().x
							_this.oY = this.attr().y
							_this.oW = this.attr().width
							_this.oH = this.attr().height
							_this.changeJson.shape = "rect"
							_this.changeJson.boundingRect.push(_this.oX)
							_this.changeJson.boundingRect.push(_this.oY)
							_this.changeJson.boundingRect.push(_this.oW)
							_this.changeJson.boundingRect.push(_this.oH)
							_this.oXW = _this.oX + _this.oW 
							_this.oYH = _this.oY + _this.oH
							_this.changeJson.contours[0].push(_this.oX,_this.oY,_this.oXW,_this.oY,_this.oXW,_this.oYH,_this.oX,_this.oYH)
							_this.qtmonitor.requestEditCheckArea(_this.monitorId,_this.cameraId,newvalue.checkAreaId,JSON.stringify(_this.changeJson))
							//添加按钮
							$("#d_btn").css({"left":_this.oX,"top":_this.oY+_this.oH})
							//设置宽高
							_this.btn2width = _this.oW
							_this.btn2height = _this.oH

						});
						this.on('mouseout',function(){
							// console.log(_this)
							_this.mapping()
							this.off('mouseout')
						})
					})

				}
			},
			'delallarea':{ //删除全部
				handler(newvalue,oldvalue){
					if(newvalue){
						this.rectRemove()
						this.$store.state.delallarea = null
						$('.path').remove()
						SVG.select('.my-rect').selectize(false).resize('stop').draggable('stop')
					}
				}
			},
			'addcheckarea':{ //判断qt或者web是否绘制图形
				handler(newvalue,oldvalue){
					// console.log('绘制区域')
					var ev = event || ev
					var _this = this
					this.poly1.rect(newvalue.boundingRect[2],newvalue.boundingRect[3])
					.move(newvalue.boundingRect[0],newvalue.boundingRect[1])
					.stroke("red")
					.opacity(0.5)
					.addClass('my-rect')
					.addClass(newvalue.checkAreaId)
					.on('click',function(ev){
						// console.log('绘制区域图形点击')
						_this.delAreaId = newvalue.checkAreaId
						_this.btn2List = newvalue
						_this.poly1.off('mousedown')
						_this.poly1.off('mouseup')
						$("g").remove()
						//先清除所有外边框
						// SVG.select('.my-rect').selectize(false).resize('stop').draggable('stop',ev)
						//添加单独一个边框
						this.selectize().selectize({deepSelect:true}).resize().draggable(ev);
						//添加三个按钮
						_this.x = this.attr().x
						_this.y = this.attr().y
						$("#d_btn").css({"left":_this.x,"top":_this.y+this.attr().height})
						this.on('mousedown',function(){
							$("#d_btn").css({"left":_this.x,"top":_this.y+this.attr().height})
						})
						//鼠标抬起触发dom位移
						this.on('mouseup',function(ev){
							_this.d_btn = true
							$("#d_btn").css({"left":_this.x,"top":_this.y+this.attr().height})
							//位移先清空要发送的数据
							_this.changeJson.boundingRect = []
							_this.changeJson.contours = [[]]
							_this.changeJson.groupId = 1
							_this.changeJson.ignoreAreas = []
							_this.changeJson.subAreas = []
							_this.changeJson.positionId = 2
							_this.changeJson.shape = ''

							//需要发送的数据
							_this.oX = this.attr().x
							_this.oY = this.attr().y
							_this.oW = this.attr().width
							_this.oH = this.attr().height
							_this.changeJson.shape = "rect"
							_this.changeJson.boundingRect.push(_this.oX)
							_this.changeJson.boundingRect.push(_this.oY)
							_this.changeJson.boundingRect.push(_this.oW)
							_this.changeJson.boundingRect.push(_this.oH)
							_this.oXW = _this.oX + _this.oW 
							_this.oYH = _this.oY + _this.oH
							_this.changeJson.contours[0].push(_this.oX,_this.oY,_this.oXW,_this.oY,_this.oXW,_this.oYH,_this.oX,_this.oYH)
							//编辑图形接口
							_this.qtmonitor.requestEditCheckArea(_this.monitorId,_this.cameraId,newvalue.checkAreaId,JSON.stringify(_this.changeJson))
							//设置宽高
							_this.btn2width = _this.oW
							_this.btn2height = _this.oH
						})

						//改变大小
						this.on("resizedone", function(ev) {
							_this.changeJson.boundingRect = []
							_this.changeJson.contours = [[]]
							_this.changeJson.groupId = 1
							_this.changeJson.ignoreAreas = []
							_this.changeJson.subAreas = []
							_this.changeJson.positionId = 2
							_this.changeJson.shape = ''

							_this.oX = this.attr().x
							_this.oY = this.attr().y
							_this.oW = this.attr().width
							_this.oH = this.attr().height
							_this.changeJson.shape = "rect"
							_this.changeJson.boundingRect.push(_this.oX)
							_this.changeJson.boundingRect.push(_this.oY)
							_this.changeJson.boundingRect.push(_this.oW)
							_this.changeJson.boundingRect.push(_this.oH)
							_this.oXW = _this.oX + _this.oW 
							_this.oYH = _this.oY + _this.oH
							_this.changeJson.contours[0].push(_this.oX,_this.oY,_this.oXW,_this.oY,_this.oXW,_this.oYH,_this.oX,_this.oYH)
							_this.qtmonitor.requestEditCheckArea(_this.monitorId,_this.cameraId,newvalue.checkAreaId,JSON.stringify(_this.changeJson))

							//添加按钮
							$("#d_btn").css({"left":_this.oX,"top":_this.oY+_this.oH})
						});
						this.on('mouseout',function(){
							// console.log(_this)
							_this.mapping()
							this.off('mouseout')
						})

					})
				}
			},
			'caId':{
				handler(newvalue,oldvalue){
					this.checkAreaId = newvalue
				}
			},
			'checkarea':{ //添加所有绘制区域
				handler(newvalue,oldvalue){
					// console.log('获取所有')
					var ev = event || ev
					var _this = this
					if(newvalue.length!==0){
						for(let i = 0; i < newvalue.length; i++){


							// if(!$(newvalue[i].checkAreaId+newvalue[i].shape).selector){
							// 	// console.log(_this.subig,"之前有区域")
							// 	for(let j=0;j<newvalue[i].subAreas.length;j++){
							// 		var substr = ''
							// 		for(let a=0;a<newvalue[i].subAreas[j].length;a++){
							// 			substr+=newvalue[i].subAreas[j][a]+' '
							// 		}
							// 		var newsub = 'M'+substr+'Z'
							// 		_this.subig.path(newsub)
							// 		.stroke("blue")
							// 		.opacity(0.5)
							// 		.addClass('my-path')
							// 		.addClass('path')
							// 		.addClass(newvalue[i].checkAreaId)
							// 	}
							// 	//设置不检测区域
							// 	for(let j=0;j<newvalue[i].ignoreAreas.length;j++){
							// 		var substr = ''
							// 		for(let a=0;a<newvalue[i].ignoreAreas[j].length;a++){
							// 			substr+=newvalue[i].ignoreAreas[j][a]+' '
							// 		}
							// 		var newig = 'M'+substr+'Z'
							// 		_this.subig.path(newig)
							// 		.stroke("blue")
							// 		.fill('blue')
							// 		.opacity(0.5)
							// 		.addClass('path')
							// 		.addClass(newvalue[i].checkAreaId)
							// 	}
							// }else{
							// 	// console.log(_this.subig,'之前没有区域')
							// 	// console.log(newvalue)
							// 	var svgdiv=$('<div></div>')
							// 	svgdiv.attr('id',newvalue[i].checkAreaId+newvalue[i].shape)
							// 	svgdiv.css({"left":newvalue[i].boundingRect[0],"top":newvalue[i].boundingRect[1]
							// 	,"width":newvalue[i].boundingRect[2],"height":newvalue[i].boundingRect[3]})
							// 	// console.log($(newvalue[i].checkAreaId+newvalue[i].shape).selector)
							// 	$('#divsvg').append(svgdiv)
							// 	_this.subig = SVG($(newvalue[i].checkAreaId+newvalue[i].shape).selector)
							// 	//设置重点检测区域
							// 	for(let j=0;j<newvalue[i].subAreas.length;j++){
							// 		var substr = ''
							// 		for(let a=0;a<newvalue[i].subAreas[j].length;a++){
							// 			substr+=newvalue[i].subAreas[j][a]+' '
							// 		}
							// 		var newsub = 'M'+substr+'Z'
							// 		_this.subig.path(newsub)
							// 		.stroke("blue")
							// 		.opacity(0.5)
							// 		.addClass('my-path')
							// 		.addClass('path')
							// 		.addClass(newvalue[i].checkAreaId)
							// 	}
							// 	//设置不检测区域
							// 	for(let j=0;j<newvalue[i].ignoreAreas.length;j++){
							// 		var substr = ''
							// 		for(let a=0;a<newvalue[i].ignoreAreas[j].length;a++){
							// 			substr+=newvalue[i].ignoreAreas[j][a]+' '
							// 		}
							// 		var newig = 'M'+substr+'Z'
							// 		_this.subig.path(newig)
							// 		.stroke("blue")
							// 		.fill('blue')
							// 		.opacity(0.5)
							// 		.addClass('path')
							// 		.addClass(newvalue[i].checkAreaId)
							// 	}
							// }
							

							_this.rect=this.poly1.rect(newvalue[i].boundingRect[2],newvalue[i].boundingRect[3])
							.move(newvalue[i].boundingRect[0],newvalue[i].boundingRect[1])
							.stroke("red")
							.opacity(0.5)
							.addClass('my-rect')
							.addClass(newvalue[i].checkAreaId)
							.on('click',function(ev){
								_this.poly1.off('mousedown')
								_this.poly1.off('mouseup')
								// _this.delAreaId = i+1
								// console.log(_this.delAreaId)
								_this.delAreaId = newvalue[i].checkAreaId
								// console.log(newvalue[i].checkAreaId)
								_this.btn2List = newvalue[i]
								$("g").remove()
								//先清除所有外边框
								// SVG.select('.my-rect').selectize(false).resize('stop').draggable('stop',ev)
								//添加单独一个边框
								this.selectize().selectize({deepSelect:true}).resize().draggable(ev);

								//添加三个按钮
								// console.log(this.attr())
								_this.x = this.attr().x
								_this.y = this.attr().y
								$("#d_btn").css({"left":_this.x,"top":_this.y+this.attr().height})
								this.on('mousedown',function(){
									$("#d_btn").css({"left":_this.x,"top":_this.y+this.attr().height})
								})
								this.on('mouseup',function(ev){
									_this.d_btn = true
									$("#d_btn").css({"left":_this.x,"top":_this.y+this.attr().height})

									//位移先清空要发送的数据
									_this.changeJson.boundingRect = []
									_this.changeJson.contours = [[]]
									_this.changeJson.groupId = 1
									_this.changeJson.ignoreAreas = []
									_this.changeJson.subAreas = []
									_this.changeJson.positionId = 2
									_this.changeJson.shape = ''

									//需要发送的数据
									_this.oX = this.attr().x
									_this.oY = this.attr().y
									_this.oW = this.attr().width
									_this.oH = this.attr().height
									_this.changeJson.shape = "rect"
									_this.changeJson.boundingRect.push(_this.oX)
									_this.changeJson.boundingRect.push(_this.oY)
									_this.changeJson.boundingRect.push(_this.oW)
									_this.changeJson.boundingRect.push(_this.oH)
									_this.oXW = _this.oX + _this.oW 
									_this.oYH = _this.oY + _this.oH
									_this.changeJson.contours[0].push(_this.oX,_this.oY,_this.oXW,_this.oY,_this.oXW,_this.oYH,_this.oX,_this.oYH)

									//获取宽高
									_this.btn2width = _this.oW
									_this.btn2height = _this.oH
									//编辑图形接口
									// _this.qtmonitor.requestEditCheckArea(_this.monitorId,_this.cameraId,i+1,JSON.stringify(_this.changeJson))

								})
								this.on("resizedone", function(ev) {

									_this.changeJson.boundingRect = []
									_this.changeJson.contours = [[]]
									_this.changeJson.groupId = 1
									_this.changeJson.ignoreAreas = []
									_this.changeJson.subAreas = []
									_this.changeJson.positionId = 2
									_this.changeJson.shape = ''

									_this.oX = this.attr().x
									_this.oY = this.attr().y
									_this.oW = this.attr().width
									_this.oH = this.attr().height
									_this.changeJson.shape = "rect"
									_this.changeJson.boundingRect.push(_this.oX)
									_this.changeJson.boundingRect.push(_this.oY)
									_this.changeJson.boundingRect.push(_this.oW)
									_this.changeJson.boundingRect.push(_this.oH)
									_this.oXW = _this.oX + _this.oW 
									_this.oYH = _this.oY + _this.oH
									_this.changeJson.contours[0].push(_this.oX,_this.oY,_this.oXW,_this.oY,_this.oXW,_this.oYH,_this.oX,_this.oYH)
									// _this.qtmonitor.requestEditCheckArea(_this.monitorId,_this.cameraId,i+1,JSON.stringify(_this.changeJson))
									//添加按钮
									$("#d_btn").css({"left":_this.oX,"top":_this.oY+_this.oH})
								});
								this.on('mouseout',function(){
									_this.mapping()
									this.off('mouseout')
								})
							})
						}
					}
				}
			},
			operationdata:{
				handler:function(newvalue,oldvalue){
					if(newvalue.canvasdata=='rectangle'&&newvalue.operation=='ban'){
						this.svgshow = true
						this.svgdivshow = true
						this.$nextTick(()=>{
							this.mapping();
							SVG.select('.my-rect').selectize(false).resize('stop').draggable('stop')
						})
					}else if(newvalue.canvasdata == 'basemap'){
						this.svgshow = true
						this.svgdivshow = true
						this.poly1.off('mousedown')
						this.poly1.off('mouseup')
						SVG.select('.my-rect').selectize(false).resize('stop').draggable('stop');
					}else if(newvalue.canvasdata == ''){
						this.svgshow = true
						this.svgdivshow = true
						return
					}else if(newvalue.operation == 'shi'){
						this.svgshow = false
						this.svgdivshow = false
						this.poly1.off('mousedown')
						this.poly1.off('mouseup')
						SVG.select('.my-rect').selectize(false).resize('stop').draggable('stop');
					}else if(newvalue.operation == ''){
						this.svgshow = true
						this.svgdivshow = true
						return
					}
				},
				deep:true,
			},
            'monitorId':{
                handler(newvalue,oldvalue){
                    this.qtmonitor.requestCheckAreas(newvalue,this.cameraId)
                }
            },
            'cameraId':{
                handler(newvalue,oldvalue){
                    this.qtmonitor.requestCheckAreas(this.monitorId,newvalue)
                }
			},
			'oneId':{//删除单一区域
				handler(newvalue,oldvalue){
					// console.log(newvalue)
					$("."+newvalue).remove()
					$('g').remove()
					this.$store.state.oneId = 0
				}
			},
			'base64img':{
				handler(newvalue,oldvalue){
					// console.log(newvalue)
					var _this = this
					this.btn2Img = newvalue
					var imgObj = new Image(); //创建image对象
					imgObj.src = 'data:image/png;base64,' + newvalue
					imgObj.onload = function(){
						_this.ctx.drawImage(this, 0, 0, _this.canvas.width, _this.canvas.height);
						_this.$store.state.base64img = null
					}
				}
			}
		},
		methods:{
			oshow(){  //画布
				this.canvas = this.$refs.canvas;
		      	this.ctx = this.canvas.getContext("2d");
		     	this.poly1 = SVG(this.$refs.svg);
			},
			init(){ //初始化
				let _this = this
				var imgObj = new Image(); //创建image对象
				var ws = new WebSocket('ws://localhost:8081')
				ws.onmessage = function(e){
					imgObj.src = 'data:image/png;base64,'+e.data
				}
				imgObj.onload = function(){
		            _this.ctx.drawImage(this, 0, 0, _this.canvas.width, _this.canvas.height);
		        }	
			},
            info(){//获取所有图形
                this.qtmonitor.requestCheckAreas(this.monitorId,this.cameraId)
            },
			rectRemove(){    //清空
				this.d_btn = false
				$(this.$refs.svg).find('g').remove()
				$(this.$refs.svg).find('.my-rect').remove()
				$('rect').remove()
				$('.path').remove()
			},
			oComId(){
				return ''+this.camera_data+''+this.keyList
			},
			oCanvasId(){
				return ''+this.camera_data+''+this.keyList+'canvas'
			},
			oSvgId(){
				return ''+this.camera_data+''+this.keyList+'svg'
			},
			canvasBig(oCanvasId,oSvgId,oComId){    //变大
				$('#'+oComId).css('overflow','auto')
				$('#'+oCanvasId).css('width',$('#'+oCanvasId).width()+100)
				$('#'+oCanvasId).css('height',$('#'+oCanvasId).height()+80)
				$('#'+oSvgId).css('width',$('#'+oSvgId).width()+100)
				$('#'+oSvgId).css('height',$('#'+oSvgId).height()+80)
			},
			canvasSma(oCanvasId,oSvgId,oComId){    //变小
				if($('#'+oCanvasId).width()<=630 || $('#'+oCanvasId).height()<=500 ||$('#'+oSvgId).width()<=630 || $('#'+oSvgId).height()<=500){
					$('#'+oComId).css("overflow-x","hidden")
					$('#'+oComId).css("overflow-y","hidden")
					$('#'+oCanvasId).css('width',630)
					$('#'+oCanvasId).css('height',500)
					$('#'+oSvgId).css('width',630)
					$('#'+oSvgId).css('height',500)
				}else{
					$('#'+oCanvasId).css('width',$('#'+oCanvasId).width()-100)
					$('#'+oCanvasId).css('height',$('#'+oCanvasId).height()-80)
					$('#'+oSvgId).css('width',$('#'+oSvgId).width()-100)
					$('#'+oSvgId).css('height',$('#'+oSvgId).height()-80)
				}
			},
			mapping(){
				var _this = this
				this.poly1.on('mousedown', function(ev){ //画布点击事件开始
					_this.d_btn = false
					ev = ev || event
					SVG.select(".my-rect").selectize(false).resize('stop').draggable('stop',ev)
	            	_this.rect1 = _this.poly1
	            	.rect()
	            	.addClass('my-rect')
					.stroke("red")
					.opacity(0.5)
					.transform(ev)
					.draw(ev)
				}); //画布按下事件结束
				
		        this.poly1.on('mouseup', function(ev){ //画布抬起事件开始
					var ev = ev || event
					_this.rect1.draw('stop', ev);
					
					//抬起时删除
		            _this.rect1.remove()
					
					_this.oX = parseFloat(_this.rect1.attr().transform.substring(7).split(',')[4]) + _this.rect1.attr().x
					_this.oY = parseFloat(_this.rect1.attr().transform.substring(7).split(',')[5]) + _this.rect1.attr().y
					_this.oW = _this.rect1.attr().width
					_this.oH = _this.rect1.attr().height
					_this.casJson.shape = "rect"
					_this.casJson.boundingRect.push(_this.oX)
					_this.casJson.boundingRect.push(_this.oY)
					_this.casJson.boundingRect.push(_this.oW)
					_this.casJson.boundingRect.push(_this.oH)
					_this.oXW = _this.oX + _this.oW 
					_this.oYH = _this.oY + _this.oH
					_this.casJson.contours[0].push(_this.oX,_this.oY,_this.oXW,_this.oY,_this.oXW,_this.oYH,_this.oX,_this.oYH)
					
					//条件判断是否要发送
					if(_this.oW<=20||_this.oH<=20){
						_this.casJson.boundingRect = []
						_this.casJson.contours = [[]]
						_this.casJson.groupId = 1
						_this.casJson.ignoreAreas = []
						_this.casJson.subAreas = []
						_this.casJson.positionId = 2
						_this.casJson.shape = ''
						return
					}else{
						_this.qtmonitor.requestAddCheckArea(_this.monitorId,_this.cameraId,JSON.stringify(_this.casJson))
						_this.casJson.boundingRect = []
						_this.casJson.contours = [[]]
						_this.casJson.groupId = 1
						_this.casJson.ignoreAreas = []
						_this.casJson.subAreas = []
						_this.casJson.positionId = 2
						_this.casJson.shape = ''
					}
				}); //画布抬起事件结束
				
			},
			add1(){
				this.btn1 = true
				this.btn2 = false
			},
			add2(){
				this.btn2 = true
				this.btn1 = false
				this.btn2Id = this.delAreaId
				this.btn2Click = this.btn2List
			},
			add3(){
				//删除单一图形
				// console.log(this.delAreaId)
				$("."+this.delAreaId).remove()
				this.d_btn = false
				this.qtmonitor.requestDelCheckArea(this.monitorId,this.cameraId,this.delAreaId)
				$('g').remove()
				this.mapping()
			},
			quxiao(){
				this.btn2 = false
				this.btn1 = false
			},

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
			z-index: 888;
		}
		#d_btn{
			position:absolute;
			z-index: 9999;
		}
		.my-rect{
			fill-opacity: 0
		}
		.my-path{
			fill-opacity: 0
		}
		#divsvg{
			position: relative;
			z-index: 222;
			width: 630px;
			height:500px;
			div{
				position: absolute;
			}
		}
	}
</style>