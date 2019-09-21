<template>
<!-- btn1 -->
	<div class="c_c_btn1">
        <div class="c_p_top">
            <div class="c_p_top_left">
                <Button class="c_button" @click="changehelp('xinxi')">
                    信息
                </Button>
                <Button class="c_button" @click="changehelp('jiben')">
                    基本参数
                </Button>
                <Button class="c_button" @click="changehelp('gaoji')">
                    高级参数
                </Button>
            </div>
        </div>
        <!-- 内容 -->
        <div class="c_p_conn">
            <div v-show="addr=='xinxi'">
                信息
            </div>
            <div v-show="addr=='jiben'">
                基本参数
            </div>
            <div v-show="addr=='gaoji'">
                高级参数
            </div>
        </div>
        <div class="c_p_foot">
            <Button class="c_button">
                设为默认
            </Button>
            <Button class="c_button">
                应用到同组
            </Button>
            <Button class="c_button">
                应用
            </Button>
            <Button class="c_button">
                取消
            </Button>
        </div>
	</div>
</template>

<script>
	export default {
		name: 'btn1',
		data(){
			return {
				addr:'xinxi',
			}
		},
		methods:{
			GoToBack(){
				this.$router.push({path:'/'})
				this.addr = 'xinxi'
			},
			changehelp(addr){
				this.addr = addr
			}
		},
	
		
		
		
	}
</script>

<style lang="scss">
	.c_c_btn1{
		position:absolute;
        z-index: 9999;
		left:150px;
        // left:0px;
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
		}
        .c_p_foot{
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
	}
</style>
