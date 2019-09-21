<template>
	<div class="startup_operation">
		<div class="com_top">
			<p>发现异常请处理</p>
			<div class="com_top_div">
				<div>
					<RadioGroup v-model="vertical" vertical>
				        <Radio label="bao">
				            <span>报警图像</span>
				        </Radio>
				        <Radio label="ban">
				            <span>模板图像</span>
				        </Radio>
				        <Radio label="shi">
				            <span>实时图像</span>
				        </Radio>
			   		</RadioGroup>
			   		<Button icon="ios-close-circle" class="btn">学习警点</Button>
			   		<Button icon="ios-close-circle" class="btn">添加模块</Button>
			   		<Button icon="ios-close-circle" class="btn">忽略报警</Button>
			   </div>	
			</div>
		</div>
		<div class="com_bom">
			<p>测试结果</p>
		</div>
	</div>
</template>

<script>
	export default {
        data () {
            return {
                vertical: 'shi',
                model: ''
            }
        }
    }
</script>

<style lang="scss">
	.startup_operation{
		font-size: 20px;
		width: 158px;
		.btn{
			width: 100%;
		}
		p{
			text-align: center;
		}
		.com_top{
			border: 1px solid #00BFFF;
			padding: 8px;
			border-radius: 5px;
			margin: 10px 0px;
			.com_top_div{
				display: flex;
				align-items: flex-end;
				button{
					margin: 5px 0px;
				}
			}			
		}
		.com_center{
			margin: 10px 0px;
			border: 1px solid #00BFFF;
			padding: 0px 8px;
			border-radius: 5px;
			p{
				margin: 10px 0px 5px 0px;
			}
			.com_center_radio{
				display: flex;
			}
			button{
				margin-top: 10px;
			}
			.com_center_but{
				button{
					margin: 0;
					width: 45%;
				}
				margin: 10px 0px;
				display: flex;
				justify-content: space-around;
			}
		}
		.com_bom{
			margin: 10px 0px;
			border: 1px solid #00BFFF;
			padding: 8px;
			border-radius: 5px;
			div{
				text-align: center;
				button{
					width: 100%;
					margin: 10px 0 0 0;
				}
			}
		}
	}
</style>