<template>
	<!--操作控制-->
	<div class="com_operation">
		<div class="com_top">
			<p>抓拍模板图像</p>
			<div class="com_top_div">
				<div>
					<RadioGroup v-model="vertical" vertical>
				        <Radio label="shi" disabled>
				            <span>实时图像</span>
				        </Radio>
				        <Radio label="ban" disabled>
				            <span>模板图像</span>
				        </Radio>	        
			   		</RadioGroup>
			   	</div>
		   		<Select v-model="modeldata" style="width:80px" size="small" disabled>
			        <Option v-for="item in cityList" :value="item.value" :key="item.value" disabled>{{ item.label }}</Option>
			    </Select>
			</div>
		    <Button icon="ios-close-circle" class="btn" disabled>删除选中模块</Button>
		</div>
		
		<div class="com_center">
			<p>绘制检测区域</p>
			<RadioGroup v-model="testing" class="com_center_radio">
		        <Radio label="rectangle" value="rectangle" disabled>
		            	矩形
		        </Radio>
		        <Radio label="basemap" value="basemap" disabled>
		             	拖动画布
		        </Radio>	        
	   		</RadioGroup>	
	   		<Button icon="ios-close-circle" class="btn" disabled>删除选中区域</Button>
	   		<div class="com_center_but">
	   			<Button disabled>+</Button>
		   		<Button disabled>-</Button>
	   		</div>   		
		</div>
		<div class="com_bom">
			<p>手动测试</p>
			<div>
				<Button disabled>手动抓拍</Button>
				<Button disabled>手动测试</Button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
        data () {
            return {
                vertical: 'shi',
                testing:'rectangle',
                cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    }
                ],
                modeldata: ''
            }
		}
    }
</script>

<style lang="scss">
	.com_operation{
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
				div{
					margin-bottom: 5px;
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