<template>
<!-- 数据记录 -->
	<div class="c_p_record">
		<!-- <p>数据记录</p> -->
		<div class="c_p_top">
			<div class="c_p_top_left">
				<Button class="c_but" @click="GoToBack">
					返回
				</Button>
				<Button class="c_button" @click="changehelp('moban')">
					模板记录
				</Button>
				<Button class="c_button" @click="changehelp('xuexi')">
					学习记录
				</Button>
				<Button class="c_button" @click="changehelp('baojing')">
					报警记录
				</Button>
				<Button class="c_button" @click="changehelp('zhengchang')">
					正常记录
				</Button>
				<Button class="c_button" @click="changehelp('caozuo')">
					操作记录
				</Button>
			</div>
			<div class="c_o_top_right">
				<img src="" alt="">
			</div>
		</div>
		<!-- 内容 -->
		<div class="c_p_conn">
			<div v-show="addr=='moban'">
				模板记录
			</div>
			<div v-show="addr=='xuexi'">
				学习记录
			</div>
			<div v-show="addr=='baojing'">
				报警记录
			</div>
			<div v-show="addr=='zhengchang'">
				正常记录
			</div>
			<div v-show="addr=='caozuo'">
				操作记录
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'record',
		data(){
			return {
				addr:'moban',
			}
		},
		methods:{
			GoToBack(){
				this.$router.push({path:'/'})
				this.addr = 'moban'
			},
			changehelp(addr){
				this.addr = addr
			}
		}
	}
</script>

<style lang="scss">
	.c_p_record{
		position:absolute;
		left: 0px;
		border: 1px solid #9FC5D6;
		.c_p_top{
			display: flex;
			justify-content: space-between;
			.c_p_top_left{
				width: 80%;
				.c_button{
					width: 16%;
					height: 63px;
					margin-right: 2px;
					background: #9FC5D6;
				}
				.c_but{
					width: 10%;
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
