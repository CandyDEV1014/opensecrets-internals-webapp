import axios from "axios";
import store from '@/store';

const BASE_URL = process.env.VUE_APP_API_URL;

const convertData = (input, property = 'pl_value') => {
	return input.map(obj => obj[property]);
 };

export default {
	state: () => ({
		data: [],
		isLoadingStep1: false,	
		isLoadingStep2: false,	
		isLoadingStep3: false,	
	}),
	getters: {
		getValues(state) {
			return state.data;
		},
		isLoadingStep1(state) {
			return state.isLoadingStep1;
		},
		isLoadingStep2(state) {
			return state.isLoadingStep2;
		},
		isLoadingStep3(state) {
			return state.isLoadingStep3;
		},
	},
	actions: {
		async fetchAllValues({ commit }) {
			axios.defaults.headers.common["Authorization"] = store.state.sessionManager.auth_token;
			commit('SET_LOADING_STEP1', true);
			const response1 = await axios.get(`${BASE_URL}/get_data_form?step=1`);
			const data1 = response1.data.data;
			const convertedData1 = {
				prefix_values: convertData(data1.prefix_values),
				states_values: convertData(data1.states_values),
				party_affiliation_values: convertData(data1.party_affiliation_values),
			};
			commit('SET_DATA_STEP1', convertedData1);
			commit('SET_LOADING_STEP1', false);
			
			commit('SET_LOADING_STEP2', true);
			const response2 = await axios.get(`${BASE_URL}/get_data_form?step=2`);
			const data2 = response2.data.data;
			const convertedData2 = {
				gender_values: convertData(data2.gender_values),
				race_values: convertData(data2.race_values),
				generation_values: convertData(data2.generation_values),
				party_1_values: convertData(data2.party_1_values),
				party_3_values: convertData(data2.party_3_values),
			};
			commit('SET_DATA_STEP2', convertedData2);
			commit('SET_LOADING_STEP2', false);
			
			commit('SET_LOADING_STEP3', true);
			const response3 = await axios.get(`${BASE_URL}/get_data_form?step=3`);
			const data3 = response3.data.data;
			const convertedData3 = {
				jurisdiction_values: convertData(data3.jurisdiction_values, "jurisdiction"),
				election_type_values: convertData(data3.election_type_values),
				race_type_values: convertData(data3.race_type_values),
				office_values: convertData(data3.office_values),
				event_type_values: convertData(data3.event_type_values),
				incumbency_values: convertData(data3.incumbency_values),
				election_status_values: convertData(data3.election_status_values),
			};
			commit('SET_DATA_STEP3', convertedData3);
			commit('SET_LOADING_STEP3', false);
		},
		async fetchStep3Values({ commit }, { district, office }) {
			axios.defaults.headers.common["Authorization"] = store.state.sessionManager.auth_token;
			commit('SET_LOADING_STEP3', true);
			const response3 = await axios.get(`${BASE_URL}/get_data_form?step=3&district=${district}&office=${office}`);
			const data3 = response3.data.data;
			const convertedData3 = {
				jurisdiction_values: convertData(data3.jurisdiction_values, "jurisdiction"),
				election_type_values: convertData(data3.election_type_values),
				race_type_values: convertData(data3.race_type_values),
				office_values: convertData(data3.office_values),
				event_type_values: convertData(data3.event_type_values),
				incumbency_values: convertData(data3.incumbency_values),
				election_status_values: convertData(data3.election_status_values),
			};
			commit('SET_DATA_STEP3', convertedData3);
			commit('SET_LOADING_STEP3', false);
		}

	},
	mutations: {
		SET_DATA_STEP1(state, data) {
			state.data[0] = data;
		},
		SET_DATA_STEP2(state, data) {
			state.data[1] = data;
		},
		SET_DATA_STEP3(state, data) {
			state.data[2] = data;
		},
		SET_LOADING_STEP1(state, isLoading) {
			state.isLoadingStep1 = isLoading;
		},
		SET_LOADING_STEP2(state, isLoading) {
			state.isLoadingStep2 = isLoading;
		},
		SET_LOADING_STEP3(state, isLoading) {
			state.isLoadingStep3 = isLoading;
		},
	},


};