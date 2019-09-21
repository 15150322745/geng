<template>
<!-- help模板 -->
	<div class="c_p_help">
		<!-- <p>help模板</p> -->
		<div class="c_p_top">
			<div class="c_p_top_left">
				<Button class="c_but" @click="GoToBack">
					返回
				</Button>
				<Button class="c_button" @click="changehelp('jianshi')">
					监事设置帮助
				</Button>
				<Button class="c_button" @click="changehelp('lingmin')">
					灵敏度设置帮助
				</Button>
				<Button class="c_button" @click="changehelp('baojing')">
					报警处理帮助
				</Button>
				<Button class="c_but" @click="changehelp('gengduo')">
					更多
				</Button>
			</div>
			<div class="c_o_top_right">
				<img src="" alt="">
			</div>
		</div>
		<!-- 内容 -->
		<div class="c_p_conn">
			<div v-show="addr=='jianshi'">
				<!-- 监视 -->
				<Carousel
					v-model="value1"
					:autoplay="setting1.autoplay"
					:autoplay-speed="setting1.autoplaySpeed"
					:dots="setting1.dots"
					:radius-dot="setting1.radiusDot"
					:trigger="setting1.trigger"
					:arrow="setting1.arrow">
					<CarouselItem>
						<div class="demo-carousel">
							<img src="./../../../../../../static/img/6.jpg" alt="" srcset="">
						</div>
					</CarouselItem>
					<CarouselItem>
						<div class="demo-carousel">
							<img src="./../../../../../../static/img/7.jpg" alt="" srcset="">
						</div>
					</CarouselItem>
					<CarouselItem>
						<div class="demo-carousel">
							<img src="./../../../../../../static/img/8.jpg" alt="" srcset="">
						</div>
					</CarouselItem>
				</Carousel>
			</div>
			<div v-show="addr=='lingmin'">
				<!-- 灵敏 -->
				<Carousel
					v-model="value2"
					:autoplay="setting2.autoplay"
					:autoplay-speed="setting2.autoplaySpeed"
					:dots="setting2.dots"
					:radius-dot="setting2.radiusDot"
					:trigger="setting2.trigger"
					:arrow="setting2.arrow">
					<CarouselItem>
						<div class="demo-carousel">
							<img src="./../../../../../../static/img/0.jpg" alt="" srcset="">
						</div>
					</CarouselItem>
					<CarouselItem>
						<div class="demo-carousel">
							<img src="./../../../../../../static/img/1.jpg" alt="" srcset="">
						</div>
					</CarouselItem>
					<CarouselItem>
						<div class="demo-carousel">
							<img src="./../../../../../../static/img/2.jpg" alt="" srcset="">
						</div>
					</CarouselItem>
				</Carousel>
			</div>
			<div v-show="addr=='baojing'">
				<!-- 报警 -->
				<Carousel
					v-model="value3"
					:autoplay="setting3.autoplay"
					:autoplay-speed="setting3.autoplaySpeed"
					:dots="setting3.dots"
					:radius-dot="setting3.radiusDot"
					:trigger="setting3.trigger"
					:arrow="setting3.arrow">
					<CarouselItem>
						<div class="demo-carousel">
							<img src="./../../../../../../static/img/3.jpg" alt="" srcset="">
						</div>
					</CarouselItem>
					<CarouselItem>
						<div class="demo-carousel">
							<img src="./../../../../../../static/img/4.jpg" alt="" srcset="">
						</div>
					</CarouselItem>
					<CarouselItem>
						<div class="demo-carousel">
							<img src="./../../../../../../static/img/5.jpg" alt="" srcset="">
						</div>
					</CarouselItem>
				</Carousel>
			</div>
			<div v-show="addr=='gengduo'">
				<!-- 更多 -->
				<img src="./../../../../../../static/img/5.jpg" alt="">
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'help',
		data(){
			return {
				addr:'jianshi',
				value1: 0,
                setting1: {
                    autoplay: false,
                    autoplaySpeed: 2000,
                    dots: 'inside',
                    radiusDot: false,
                    trigger: 'click',
                    arrow: 'hover'
				},
				value2: 0,
                setting2: {
                    autoplay: false,
                    autoplaySpeed: 2000,
                    dots: 'inside',
                    radiusDot: false,
                    trigger: 'click',
                    arrow: 'hover'
				},
				value3: 0,
                setting3: {
                    autoplay: false,
                    autoplaySpeed: 2000,
                    dots: 'inside',
                    radiusDot: false,
                    trigger: 'click',
                    arrow: 'hover'
                },
			}
		},
		methods:{
			GoToBack(){
				this.$router.push({path:'/'})
				this.addr = 'jianshi'
			},
			changehelp(addr){
				this.addr = addr
			}
		}
	}
</script>

<style lang="scss">
	.c_p_help{
		position:absolute;
		left: 0px;
		border: 1px solid #9FC5D6;
		.c_p_top{
			display: flex;
			justify-content: space-between;
			.c_p_top_left{
				width: 80%;
				.c_button{
					width: 23%;
					height: 63px;
					margin-right: 2px;
					background: #9FC5D6;
				}
				.c_but{
					width: 11%;
					height: 63px;
					margin-right: 2px;
					background: #9FC5D6;
				}
			}
			.c_o_top_right{
				width: 20%;
			}
		}
		.c_p_conn{
			margin-top: 10px;
			width:100%;
			height:524px;
			border-top: 1px solid #9FC5D6;
			div{
				width: 798px;
				height: 523px;
				img{
					width: 798px;
					height: 523px;
				}
			}
		}
	}
</style>
