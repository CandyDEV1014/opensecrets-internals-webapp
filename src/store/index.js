import { createStore } from "vuex";
import sessionManager from "@/store/modules/session_manager";
import getData from "@/store/modules/get_data";
import getDataForm from "@/store/modules/get_data_form";
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
	storage: window.localStorage,
	modules: ['sessionManager']
})

export default createStore({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		sessionManager,
		getData,
		getDataForm,
	},
	plugins: [vuexLocal.plugin]
});