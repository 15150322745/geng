<template>
<!-- btn1 -->
	<div class="c_c_btn2">
        <div class="c_p_top">
            <div class="c_p_top_left">
                <Button class="c_button" @click="changehelp('zhongdian')">
                    重点检测区域
                </Button>
                <Button class="c_button" @click="changehelp('bujiance')">
                    不检测区域
                </Button>
                <Button class="c_button" @click="changehelp('xuexi')">
                    学习图像
                </Button>
            </div>
        </div>

        <!-- 内容 -->
        <div class="c_p_conn">
			<!-- 重点检测区域 -->
            <div v-show="addr=='zhongdian'" class="zhongdian">
				<div class="zhongdian_left">
					<p>绘制ROI</p>
					<div class="com_top_div">
						<div>
							<RadioGroup vertical v-model="tool">
								<Radio label="lujing">
									<span>路径工具</span>
								</Radio>
								<Radio label="duobianxing">
									<span>多边形工具</span>
								</Radio>	        
							</RadioGroup>
						</div>
						 <Button class="c_button" @click="del">
							删除选中
						</Button>
						<Button class="c_button" @click="delall">
							删除所有
						</Button>
					</div>
					<p>操作画布</p>
					<div class="com_center_div">
						<RadioGroup class="com_center_radio" v-model="mapping">
							<Radio label="ROI" value="ROI">
									绘制ROI
							</Radio>
							<Radio label="movesvg" value="movesvg">
									拖动画布
							</Radio>     
						</RadioGroup>	
						<div class="com_center_but">
							<Button @click="areaup">+</Button>
							<Button @click="areado">-</Button>
						</div>   		
					</div>
					<p style="font-size:16px;margin-top:5px">重点区域检测</p>
				</div>
				<div id="zhongdian_right" :style="{width:btn2width+'px',height:btn2height+'px'}">
					{{btn2Id}}
					<!-- {{btn2List}} -->
				</div>
            </div>

			<!-- 不检测区域 -->
            <div v-show="addr=='bujiance'" class="bujiance">
                <!-- 不检测区域 -->
				<div class="bujiance_left">
					<p>绘制ROI</p>
					<div class="com_top_div">
						<div>
							<RadioGroup vertical v-model="bu_tool">
								<Radio label="bu_lujing">
									<span>路径工具</span>
								</Radio>
								<Radio label="bu_duobianxing">
									<span>多边形工具</span>
								</Radio>	        
							</RadioGroup>
						</div>
						 <Button class="c_button" @click="bu_del">
							删除选中
						</Button>
						<Button class="c_button" @click="bu_delall">
							删除所有
						</Button>
					</div>
					<p>操作画布</p>
					<div class="com_center_div">
						<RadioGroup class="com_center_radio" v-model="bu_mapping">
							<Radio label="bu_ROI" value="bu_ROI">
									绘制ROI
							</Radio>
							<Radio label="bu_movesvg" value="bu_movesvg">
									拖动画布
							</Radio>     
						</RadioGroup>	
						<div class="com_center_but">
							<Button @click="bu_areaup">+</Button>
							<Button @click="bu_areado">-</Button>
						</div>   		
					</div>
					<p style="font-size:14px;margin-top:5px">不检测区域检测</p>
				</div>
				<div id="bujiance_right" :style="{width:btn2width+'px',height:btn2height+'px'}">
					
				</div>
            </div>

			<!-- 学习图像 -->
            <div v-show="addr=='xuexi'">
                学习图像
            </div>
        </div>

		<!-- 确定取消 -->
        <div class="c_p_foot">
            <Button class="c_button" @click="queding">
                确定
            </Button>
            <Button class="c_button" @click="quxiao">
                取消
            </Button>
        </div>
	</div>
</template>

<script>
	import Svg from '../../../../../../static/js/svg'
	import SvgDraggable from '../../../../../../static/js/svg.draggable'
	import SvgDraw from '../../../../../../static/js/svg.draw'
	import SvgPath from '../../../../../../static/js/svg.path'
	import SvgResize from '../../../../../../static/js/svg.resize'
	import SvgSelect from '../../../../../../static/js/svg.select'

	export default {
		name: 'btn1',
		props:{
			btn2Id:{           
				type:Number,
				required:true
			},
			btn2List:{           
				type:Object,
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
			btn2width:{
				type:Number,
				required:true
			},
			btn2height:{
				type:Number,
				required:true
			},
		},
		data(){
			return {
				addr:'zhongdian',
				subpoly:'',
				ignorepoly:'',
				tool:'lujing',   //lujing/duobianxing
				mapping:'ROI',   //movesvg/ROI
				bu_tool:'bu_lujing', //bu_lujing/bu_duobianxing
				bu_mapping:'bu_ROI', //bu_ROI/bu_movesvg
				subId:null,
				ignoreId:null,
				delId:'',
			}
		},
		mounted(){
			this.subpoly = SVG('zhongdian_right')
			this.ignorepoly = SVG('bujiance_right')
			this.subpolyrect()
			this.ignorerect()
		},
		computed:{
			qtmonitor(){
				return this.$store.state.qtObjects.qtmonitor
			},
		},
		watch:{
			btn2List:{ //点击图形发送接受
				handler(newvale,oldvalue){
					var _this = this
					$(".my-sub").remove()
					$(".my-ignore").remove()
					//获取所有区域中的重点检测区域
					if(newvale.subAreas!==0){
						for(let i=0;i<newvale.subAreas.length;i++){
							var substr = ''
							for(var j=0;j<newvale.subAreas[i].length;j++){
								if(newvale.subAreas[i][j]==0){
									return
								}else{
									substr+=newvale.subAreas[i][j]+' '
								}
							}
							var newsub = 'M'+substr+'Z'
							this.subpoly.path(newsub)
							.stroke("blue")
							.opacity(0.5)
							.addClass('my-sub')
							.addClass('my-subold')
							.addClass('my-sub'+i)
							.on('click',function(ev){
								_this.subpoly.off('mousedown')
								_this.subId = i
								_this.delId = this.attr().id
								SVG.select('.my-sub').stroke("blue")
								this.draggable(ev).stroke("red")

								var arr = this.attr().d.replace(/[a-zA-Z]/g).split('undefined').join(' ').split(' ')
								var subarr = []
								for(var a=0;a<arr.length;a++){
									if(arr[a]!==''&&Number(arr[a])!==0){
										subarr.unshift(Number(arr[a]))
									}
								}
								newvale.subAreas[i] = subarr
								this.on('mouseout',function(){
									_this.subpolyrect()
									this.off('mouseout')
								})
							})
						}
					}
					//获取所有区域中的不检测区域
					if(newvale.ignoreAreas!==0){
						for(let i=0;i<newvale.ignoreAreas.length;i++){
							var ignorestr = ''
							for(var j=0;j<newvale.ignoreAreas[i].length;j++){
								if(newvale.ignoreAreas[i][j]==0){
									return
								}else{
									ignorestr+=newvale.ignoreAreas[i][j]+' '
								}
							}
							var newignore = 'M'+ignorestr+'Z'
							this.ignorepoly.path(newignore)
							.stroke("blue")
							.opacity(0.5)
							.addClass('my-ignore')
							.addClass('my-ignoreold')
							.addClass('my-ignore'+i)
							.on('click',function(ev){
								_this.ignorepoly.off('mousedown')
								_this.ignoreId = i
								_this.delId = this.attr().id
								SVG.select('.my-ignore').stroke("blue")
								this.draggable(ev).stroke("red")

								var arr = this.attr().d.replace(/[a-zA-Z]/g).split('undefined').join(' ').split(' ')
								var ignorearr = []
								for(var a=0;a<arr.length;a++){
									if(arr[a]!==''&&arr[a]!==0){
										if(Number(arr[a])!==0){
											ignorearr.unshift(Number(arr[a]))
										}
									}
								}
								newvale.ignoreAreas[i] = ignorearr
								this.on('mouseout',function(){
									_this.ignorerect()
									this.off('mouseout')
								})
							})
						}
					}
				}
			},
			
		},
		methods:{
			subpolyrect(){
				var _this = this;
				var oArr = []
				var subpath;
				this.subpoly.on('mousedown',function(ev){
					var ev = ev || event;
					subpath = _this.subpoly.path()
					this.off('mousemove').on('mousemove',function(ev){
						ev = ev || event
						oArr.push(ev.offsetX,ev.offsetY)
						if(oArr.length>30){
							subpath.plot("M"+oArr+"Z")
							.addClass('my-subpath')
							.addClass('my-sub')
							.fill('#FFF')
							.opacity(0.5)
							.stroke("blue")
							.on('click',function(ev){
								_this.delId = this.attr().id
								_this.subpoly.off('mousedown')
								SVG.select('.my-sub').stroke("blue")
								this.draggable(ev).stroke("red")
								this.on('mouseout',function(){
									_this.subpolyrect()
									this.off('mouseout')
								})
							})
						}
					})
					this.off('mouseup').on('mouseup',function(ev){
						this.off('mousedown')
						oArr = []
						this.off('mousemove')
						this.on('mouseout',function(){
							_this.subpolyrect()
							this.off('mouseout')
						})
					})
				})
			},
			ignorerect(){
				var _this = this;
				var oArr = []
				var igpath;
				this.ignorepoly.on('mousedown',function(ev){
					var ev = ev || event;
					igpath = _this.ignorepoly.path()
					this.off('mousemove').on('mousemove',function(ev){
						ev = ev || event
						oArr.push(ev.offsetX,ev.offsetY)
						if(oArr.length>30){
							igpath.plot("M"+oArr+"Z")
							.addClass('my-ignorepath')
							.addClass('my-ignore')
							.fill('#FFF')
							.opacity(0.5)
							.stroke("blue")
							.on('click',function(ev){
								_this.delId = this.attr().id
								_this.ignorepoly.off('mousedown')
								SVG.select('.my-ignore').stroke("blue")
								this.draggable(ev).stroke("red")
								this.on('mouseout',function(){
									_this.ignorerect()
									this.off('mouseout')
								})
							})
						}
					})
					this.off('mouseup').on('mouseup',function(ev){
						oArr = []
						this.off('mousemove')
						this.off('mousedown')
						this.on('mouseout',function(){
							_this.ignorerect()
							this.off('mouseout')
						})
					})
				})
			},
			GoToBack(){
				this.$router.push({path:'/'})
				this.addr = 'zhongdian'
			},
			changehelp(addr){
				this.addr = addr
			},
			queding(){ //确定
				
				this.btn2List.subAreas = []
				this.btn2List.ignoreAreas = []
				//添加重点检测区域				
				for(let i=0;i<SVG.select('.my-subpath').members.length;i++){
					var arr = SVG.select('.my-subpath').members[i].attr().d.replace(/[a-zA-Z]/g).split('undefined').join(' ').split(',')
					var subarr = [];
					for(var a=0;a<arr.length;a++){
						if(arr[a]!==''||Number(arr[a])!==0){
							subarr.push(Number(arr[a]))
						}
					}
					this.btn2List.subAreas.push(subarr)
				}

				//添加不检测区域
				for(let i=0;i<SVG.select('.my-ignorepath').members.length;i++){
					var arr = SVG.select('.my-ignorepath').members[i].attr().d.replace(/[a-zA-Z]/g).split('undefined').join(' ').split(',')
					var igarr = [];
					for(var a=0;a<arr.length;a++){
						if(arr[a]!==''||Number(arr[a])!==0){
							igarr.push(Number(arr[a]))
						}
					}
					this.btn2List.ignoreAreas.push(igarr)
				}

				//添加原本的重点
				// console.log(SVG.select('.my-subold'))
				for(let i=0;i<SVG.select('.my-subold').members.length;i++){
					// console.log(SVG.select('.my-subold').members[i].attr().d.replace(/[a-zA-Z]/g).split('undefined').join(' ').split(' '))
					var arr = SVG.select('.my-subold').members[i].attr().d.replace(/[a-zA-Z]/g).split('undefined').join(' ').split(' ')
					var subarr = [];
					for(var a=0;a<arr.length;a++){
						if(arr[a]!==''||Number(arr[a])!==0){
							// console.log(arr[a])
							subarr.push(Number(arr[a]))
						}
					}
					this.btn2List.subAreas.push(subarr)
				}

				//添加原本的不检测
				for(let i=0;i<SVG.select('.my-ignoreold').members.length;i++){
					var arr = SVG.select('.my-ignoreold').members[i].attr().d.replace(/[a-zA-Z]/g).split('undefined').join(' ').split(' ')
					var igarr = [];
					for(var a=0;a<arr.length;a++){
						if(arr[a]!==''||Number(arr[a])!==0){
							igarr.push(Number(arr[a]))
						}
					}
					this.btn2List.ignoreAreas.push(igarr)
				}
				// console.log(this.btn2List)
				this.$emit('btn2quxiao')
				//需要发送的数据
				this.qtmonitor.requestEditCheckArea(this.monitorId,this.cameraId,this.btn2Id,JSON.stringify(this.btn2List))
			},
			quxiao(){  //取消
				this.$emit('btn2quxiao')
				this.btn2List = null
				$(".my-sub").remove()
				$(".my-ignore").remove()
			},
			areado(){ //重点画布减
			},
			areaup(){ //重点画布加
			},
			del(){   //重点单删
				$('#'+this.delId).remove()
				// $('.my-sub'+this.subId).remove()
			},
			delall(){ //重点全删
				$(".my-sub").remove()
			},
			bu_areado(){ //不画布减
			},
			bu_areaup(){ //不画布加
			},
			bu_del(){   //不单删
				$('#'+this.delId).remove()
				// $('.my-ignore'+this.ignoreId).remove()
			},
			bu_delall(){ //不全删
				$(".my-ignore").remove()
			},
		},		
	}
</script>

<style lang="scss">
	.c_c_btn2{
		background: #FFF;
		position:absolute;
        z-index: 9999;
		left:150px;
        top: 60px;
        height: 350px;
        width: 60%;
		border: 1px solid #9FC5D6;
		.c_p_top{
			display: flex;
			justify-content: space-between;
			.c_p_top_left{
				width: 100%;
				.c_button{
					width: 25%;
					height: 33px;
					margin-right: 2px;
					background: #9FC5D6;
				}
			}
			.c_o_top_right{
				width: 20%;
			}
		}
		.c_p_conn{
			width:100%;
			border-top: 1px solid #9FC5D6;
			.zhongdian{
				display: flex;
				.zhongdian_left{
					padding: 5px;
					border-right: 1px solid #9FC5D6;
					width: 30%;
					height: 270px;
					.com_top_div{
						.ivu-radio-wrapper{
							line-height: 20px;
							height: 20px;
						}
						border: 1px solid #00BFFF;
						border-radius: 5px;
						margin-bottom: 5px;
						padding:5px; 
						Button{
							width: 80%;
							height: 30px;
							margin: 2px;
							background:  #9FC5D6;
						}
					}
					.com_center_div{
						border: 1px solid #00BFFF;
						border-radius: 5px;
						padding:5px;
						Button{
							margin: 4px;
							width: 35%;
							height: 20px;
							line-height: 20px;
							background:  #9FC5D6;
						}
						.com_center_but{
							button{
								padding: 0;
							}
						}
					}
				}
				.zhongdian_right{
					width: 70%;
					height: 270px;
				}
			}


			.bujiance{
				display: flex;
				.bujiance_left{
					padding: 5px;
					border-right: 1px solid #9FC5D6;
					width: 30%;
					height: 270px;
					.com_top_div{
						.ivu-radio-wrapper{
							line-height: 20px;
							height: 20px;
						}
						border: 1px solid #00BFFF;
						border-radius: 5px;
						margin-bottom: 5px;
						padding:5px; 
						Button{
							width: 80%;
							height: 30px;
							margin: 2px;
							background:  #9FC5D6;
						}
					}
					.com_center_div{
						border: 1px solid #00BFFF;
						border-radius: 5px;
						padding:5px;
						Button{
							margin: 4px;
							width: 35%;
							height: 20px;
							line-height: 20px;
							background:  #9FC5D6;
						}
						.com_center_but{
							button{
								padding: 0;
							}
						}
					}
				}
				.bujiance_right{
					width: 70%;
					height: 270px;
				}
			}	
		}
        .c_p_foot{
			display: flex;
			justify-content: space-around;
            position: absolute;
            padding: 5px;
            width: 100%;
            bottom: 0;
            border-top: 1px solid  #9FC5D6;
            .c_button{
                width: 24%;
                height: 33px;
                margin-right: 1px;
                background: #9FC5D6;
            }
        }
		.my-sub{
			fill-opacity: 0
		}
		.my-ignore{
			fill-opacity: 0
		}
		.my-subrect{
			fill-opacity: 0
		}
		.my-ignorerect{
			fill-opacity: 0
		}
	}
</style>
