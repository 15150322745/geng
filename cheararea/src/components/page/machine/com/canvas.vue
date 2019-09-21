<template>
	<!--画布-->
	<div class="com_canvas" ref='mycom_canvas' :id="oComId()">
		<div id="d_btn" v-show="d_btn">
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
				btnX:0,
				btnY:0,
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
			'checkoneid':{ //编辑区域这是qt部分发生编辑的获取
				handler(newvalue){
					this.huizhi(this.checkonejson,this,this.checkonejson.checkAreaId)
				}
			},
			addcheckarea:{ //判断qt或者web是否绘制图形
				handler(newvalue){
					this.huizhi(newvalue,this,newvalue.checkAreaId)
				}
			},
			'checkarea':{ //添加所有绘制区域
				handler(newvalue){
					if(newvalue.length!==0){
						for(var z=0;z<newvalue.length;z++){
							this.huizhi(newvalue[z],this,newvalue[z].checkAreaId)
						}
					}
				}
			},
			'caId':{
				handler(newvalue,oldvalue){
					this.checkAreaId = newvalue
				}
			},
			'delallarea':{ //删除全部
				handler(newvalue,oldvalue){
					if(newvalue){
						this.rectRemove()
						this.$store.state.delallarea = null
						$('.path').remove()
						SVG.select('.my-group').selectize(false).resize('stop').draggable('stop')
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
			},//获取按钮状态
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
					this.d_btn=false
					$("."+newvalue).remove()
					SVG.select('.my-group').selectize(false).resize('stop')
					this.$store.state.oneId = 0
				}
			},
			'base64img':{
				handler(newvalue,oldvalue){
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
				this.btn2Click = this.btn2List
			},
			add3(){
				//删除单一图形
				this.d_btn = false
				SVG.select('.my-group').selectize(false)
				$("."+this.delAreaId).remove()
				this.qtmonitor.requestDelCheckArea(this.monitorId,this.cameraId,this.delAreaId)
				// this.mapping()
			},
			quxiao(){
				this.btn2 = false
				this.btn1 = false
			},
			huizhi(data,_that,dataId){
				_that.d_btn = false;
				SVG.select('.my-group').selectize(false)
				$('.'+data.checkAreaId).remove()
				var group =_that.poly1.group()
				.addClass('my-group')
				.addClass(dataId)
				.on('click',function(ev){
					var ev = ev || event
					var _id = Number(this.attr('class').split(' ')[1])
					_that.dianji(ev,this,_that,_id,data)
				})
				//创建rect
				_that.rect = group.rect(data.boundingRect[2],data.boundingRect[3])
				.move(data.boundingRect[0],data.boundingRect[1])
				.stroke('red')
				.opacity(0.5)
				.addClass('my-rect')
				.addClass('rect'+dataId)
				//创建ignore
				for(var a=0;a<data.ignoreAreas.length;a++){
					var igstr = ''
					for(var b=0;b<data.ignoreAreas[a].length;b++){
						if(data.ignoreAreas[a][b]!==0){
							igstr+=data.ignoreAreas[a][b]+' '
						}
					}
					var newig = 'M'+igstr+'Z'
					group.path(newig)
					.stroke('violet')
					.fill('violet')
					.addClass('my-path')
					.addClass('path')
					.addClass('ignore')
					.addClass(dataId)
					.translate(data.boundingRect[0],data.boundingRect[1])
				}
				//创建sub
				for(var a=0;a<data.subAreas.length;a++){
					var substr = ''
					for(var b=0;b<data.subAreas[a].length;b++){
						if(data.subAreas[a][b]!==0){
							substr+=data.subAreas[a][b]+' '
						}
					}
					var newsub = 'M'+substr+'Z'
					group.path(newsub)
					.stroke('blue')
					.opacity(0.5)
					.addClass('my-path')
					.addClass('path')
					.addClass('sub')
					.addClass(dataId)
					.translate(data.boundingRect[0],data.boundingRect[1])
				}
			},
			dianji(ev,_this,_that,_id,_json){
				_that.poly1.off('mousedown')
				_that.poly1.off('mouseup')
				_that.$store.state.checkoneid = null
				// console.log(_this)
				//先把btn2的数据格式化
				_that.delAreaId = _id
				_that.btn2width = 0
				_that.btn2height = 0
				_that.btn2List = {}
				_that.btn2List = _json
				_that.btn2Id = _id
				_that.btn2width = parseInt($($($(_this.node).context.innerHTML)[0]).attr('width'))
				_that.btn2height = parseInt($($($(_this.node).context.innerHTML)[0]).attr('height'))
				//先清除所有外边框
				SVG.select('.my-group').selectize(false).draggable('stop',ev)
				_this.selectize().selectize({deepSelect:true}).draggable(ev);

				var nbx = 0 //这是移动后的偏移量
				var nby = 0
				var obx,oby,obh;
				//点击时添加按钮
				obx =parseInt($($($(_this.node).context.innerHTML)[0]).attr('x'))//这是获取举行的x轴
				oby =parseInt($($($(_this.node).context.innerHTML)[0]).attr('y'))
				obh =parseInt($($($(_this.node).context.innerHTML)[0]).attr('height'))
				_that.d_btn = true
				if(!_this.attr().transform){
					$('#d_btn').css({"left":obx,"top":oby+obh})
				}else{
					nbx = parseFloat(_this.attr().transform.substring(7).split(',')[4])
					nby = parseFloat(_this.attr().transform.substring(7).split(',')[5])
					$("#d_btn").css({"left":obx+nbx,"top":oby+obh+nby})
				}
				_this.off('mousemove').on('mousemove',function(){
					if(_this.attr().transform){
						nbx = parseFloat(_this.attr().transform.substring(7).split(',')[4])
						nby = parseFloat(_this.attr().transform.substring(7).split(',')[5])
						$("#d_btn").css({"left":obx+nbx,"top":oby+obh+nby})
					}
				})
				_this.on('mouseout',function(){
					_that.mapping()
					_this.off('mouseout')
				})
				//设置鼠标抬起事件
				_this.on('mouseup',function(ev){
					//清空给后台的数据
					_that.changeJson.boundingRect = []
					_that.changeJson.contours = [[]]
					_that.changeJson.groupId = 1
					_that.changeJson.ignoreAreas = []
					_that.changeJson.subAreas = []
					_that.changeJson.positionId = 2
					_that.changeJson.shape = ''
					//获取发送的数据
					_that.oX = $($($(_this.node).context.innerHTML)[0]).attr('x')
					_that.oY = $($($(_this.node).context.innerHTML)[0]).attr('y')
					_that.oW = $($($(_this.node).context.innerHTML)[0]).attr('width')
					_that.oH = $($($(_this.node).context.innerHTML)[0]).attr('height')
					_that.oXW = Number(_that.oX) + Number(_that.oW) 
					_that.oYH = Number(_that.oY) + Number(_that.oH)
					//分别给changejson和btn2List设置数据
					//这是changejson
					_that.changeJson.shape = "rect"
					_that.changeJson.boundingRect.push(Number(_that.oX)+nbx)
					_that.changeJson.boundingRect.push(Number(_that.oY)+nby)
					_that.changeJson.boundingRect.push(Number(_that.oW))
					_that.changeJson.boundingRect.push(Number(_that.oH))
					_that.changeJson.contours[0].push(Number(_that.oX),Number(_that.oY),_that.oXW,Number(_that.oY),_that.oXW,_that.oYH,Number(_that.oX),_that.oYH)
					//这是给btn2List
					_that.btn2List.checkAreaId = _id
					_that.btn2List.boundingRect = _that.changeJson.boundingRect
					_that.btn2List.contours = _that.changeJson.contours
					//找到所有的ignore和sub
					for(var c=0;c<$($(_this.node).context.innerHTML).length;c++){
						//这是找到sub宾且复制给btn2List和changesjson
						if($($($(_this.node).context.innerHTML)[c]).is('.sub')){
							var arr = $($($(_this.node).context.innerHTML)[c]).attr('d').replace(/[a-zA-Z]/g).split('undefined').join(' ').split(' ')
							var subarr = []
							for(var d=0;d<arr.length;d++){
								if(Number(arr[d])!==0){
									subarr.push(Number(arr[d]))
								}
							}
							_that.changeJson.subAreas.push(subarr)
							_that.btn2List.subAreas = _that.changeJson.subAreas
						}
						//这是找到ignore
						if($($($(_this.node).context.innerHTML)[c]).is('.ignore')){
							var arr = $($($(_this.node).context.innerHTML)[c]).attr('d').replace(/[a-zA-Z]/g).split('undefined').join(' ').split(' ')
							var igarr = []
							for(var d=0;d<arr.length;d++){
								if(Number(arr[d])!==0){
									igarr.push(Number(arr[d]))
								}
							}
							_that.changeJson.ignoreAreas.push(igarr)
							_that.btn2List.ignoreAreas = _that.changeJson.ignoreAreas
						}
					}
					//发送接口数据
					_that.qtmonitor.requestEditCheckArea(_that.monitorId,_that.cameraId,_id,JSON.stringify(_that.changeJson))
				})
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