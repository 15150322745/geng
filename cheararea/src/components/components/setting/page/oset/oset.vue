<template>
<!-- 系统设置 -->
	<div class="c_p_oset">
		<!-- <p>系统设置</p> -->
		<div class="c_p_top">
			<div class="c_p_top_left">
				<Button class="c_but" @click="GoToBack">
					返回
				</Button>
				<Button class="c_button" @click="changehelp('jiqi')">
					机器设置
				</Button>
				<Button class="c_button" @click="changehelp('jianshi')">
					监视设置
				</Button>
				<Button class="c_button" @click="changehelp('xiangji')">
					相机设置
				</Button>
				<Button class="c_button" @click="changehelp('xitong')">
					系统设置
				</Button>
			</div>
			<div class="c_o_top_right">
				<img src="" alt="">
			</div>
		</div>
		<!-- 内容 -->
		<div class="c_p_conn">
			<div v-show="addr=='jiqi'">
				机器设置
			</div>
			<div v-show="addr=='jianshi'">
				监视设置
			</div>
			<div v-show="addr=='xiangji'">
				相机设置
			</div>
			<div v-show="addr=='xitong'">
				系统设置
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'record',
		data(){
			return {
				addr:'jiqi',
			}
		},
		methods:{
			GoToBack(){
				this.$router.push({path:'/'})
				this.addr = 'jiqi'
			},
			changehelp(addr){
				this.addr = addr
			}
		}
	}
</script>

<style lang="scss">
	.c_p_oset{
		position:absolute;
		left: 0px;
		border: 1px solid #9FC5D6;
		.c_p_top{
			display: flex;
			justify-content: space-between;
			.c_p_top_left{
				width: 80%;
				.c_button{
					width: 20%;
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
		}
	}
</style>
