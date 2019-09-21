<template>
	<div class="c_setting">
		<Button icon="md-help-buoy" class="btn" size="large"
            @click="oSetting('help')"
        >
            使用帮助
        </Button>

        <Button icon="ios-timer" class="btn" size="large"
            @click="oSetting('record')"
        >
            数据记录
        </Button>

        <Button icon="md-settings" class="btn" size="large"
            @click="oSetting('oset')"
        >
            系统设置
        </Button>

        <Button icon="md-power" class="btn" size="large">
            关闭系统
        </Button>
	</div>
</template>

<script>
	export default {
        name: 'Setting',
        methods : {
            oSetting(path,params){
                this.$emit("obtnclick")
                if(params){
                    this.$router.push(path + '/' + params)
                }else{
                    this.$router.push(path)
                }
            }
        }

	}
</script>

<style lang="scss">
	.c_setting{
        position: absolute;
        right: 2px;
        display: flex;
        flex-direction: column;
        z-index: 9999;
        background:#FFF;
        button{ 
            width: 200px;
            margin-top: 5px;
            background: #9FC5D6;
        }
    }
</style>
