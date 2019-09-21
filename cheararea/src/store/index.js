import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const state={
	qtObjects:{},
	modal_state:null,
	modal_monitor:"",
	modal_camer:"",
	modal_msg:"",
	samples:[],
	iosState:"",
	yiosState:"",
	checkarea:[],
	caId:'',
	addcheckarea:[],
	delallarea:null,
	oneId:null,
	checkonejson:{},
	checkoneid:0,
	delsampled:null,
	ores:null,
	base64img:null,
};
const mutations = {
	SET_SOCKET:(state,m)=> {
		state.qtObjects = m
	},
	MODAL_STATE:(state,f)=>{
		state.modal_state = f
	},
	MSG:(state,g)=>{
		state.modal_msg = g
	},
	MONITORID:(state,d)=>{
		state.modal_monitor = d
	},
	CAMERID:(state,c)=>{
		state.modal_camer = c
	},
	SAMPLES:(state,s)=>{
		state.samples = s
	},
	IOSSTATE:(state,iosState)=>{
		state.iosState = iosState
	},
	YIOSSTATE:(state,yiosState)=>{
		state.yiosState = yiosState
	},
	CHECKAREA:(state,checkarea)=>{
		state.checkarea = checkarea
	},
	CAID:(state,caId)=>{
		state.caId = caId
	},
	ADDCHECKAREA:(state,addcheckarea)=>{
		state.addcheckarea = addcheckarea
	},
	DELALLAREAS:(state,delallarea)=>{
		state.delallarea = delallarea
	},
	ONEID:(state,oneId)=>{
		state.oneId = oneId
	},
	CHECKONEID:(state,checkoneid)=>{
		state.checkoneid = checkoneid
	},
	CHECKONEJSON:(state,checkonejson)=>{
		state.checkonejson = checkonejson
	},
	DELSAMPLED:(state,delsampled)=>{
		state.delsampled = delsampled
	},
	ORES:(state,ores)=>{
		state.ores = ores
	},
	BASE64IMG:(state,base64img)=>{
		state.base64img = base64img
	},
};
 const actions = {
	setSocket:({commit},payload)=>{
		commit('SET_SOCKET', payload)
	}
};
const store = new Vuex.Store({
	state,
	actions,
	mutations
})

export default store;
