import axios from "axios";
import store from '@/store'

const BASE_URL = process.env.VUE_APP_API_URL;

export default {
	state: () => ({
		data: [],
		source: 'table',
		query: '',
		sort: null,
		pagination: {
			page: 1
		},
	}),
	getters: {
		getData(state) {
			return state.data;
		},
		getPagination(state) {
			return state.pagination;
		},
		getSource(state) {
			return state.source;
		}
	},
	actions: {
		async fetchData({ commit, state }) {
			axios.defaults.headers.common["Authorization"] = store.state.sessionManager.auth_token

			const query = new URLSearchParams()
			query.append('page', state.pagination.page)
			if (state.sort) {
				query.append('sort_column', state.sort.column)
				query.append('sort_direction', state.sort.direction)
			}

			try {
				const response = await axios.get(`${BASE_URL}/review_candidateperson_dupes?${query.toString()}`);
				const data = response.data;
				commit('SET_SOURCE', 'table');
				commit('SET_QUERY', '');
				commit('SET_DATA', data.content);
				commit('SET_PAGINATION', data.pagination);
			} catch (error) {
			// Handle the error as needed
			} finally {
				commit('SET_LOADING', false); // Set isLoading to false after fetching data
			}
		},

		
		async fetchQuery({ commit, state }, query) {
			axios.defaults.headers.common["Authorization"] = store.state.sessionManager.auth_token

			commit('SET_LOADING', true); // Set isLoading to true before fetching data

			const queryParams = new URLSearchParams()
			queryParams.append('page', state.pagination.page)
			if (state.sort) {
				queryParams.append('sort_column', state.sort.column)
				queryParams.append('sort_direction', state.sort.direction)
			}

			try {
				const response = await axios.post(`${BASE_URL}/query?${queryParams.toString()}`, {
					query
				});
				const data = response.data;
				commit('SET_SOURCE', 'query');
				commit('SET_QUERY', query);
				commit('SET_DATA', data.content);
				commit('SET_PAGINATION', data.pagination);
			} catch (error) {
				// Handle the error as needed
			} finally {
				commit('SET_LOADING', false); // Set isLoading to false after fetching data
			}
		},
	
		nextPage({ commit, dispatch, state }) {
			commit('NEXT_PAGE');
			if (state.source === 'table') {
				dispatch('fetchData')
			} else {
				dispatch('fetchQuery', state.query)
			}
		},
	
		previousPage({ commit, dispatch, state }) {
			commit('PREVIOUS_PAGE');
			if (state.source === 'table') {
				dispatch('fetchData')
			} else {
				dispatch('fetchQuery', state.query)
			}
		},

		setSource({ commit }, source) {
			commit('SET_SOURCE', source)
		},

		setSort({ commit, state, dispatch }, sort) {
			commit('SET_SORT', sort)
			if (state.source === 'table') {
				dispatch('fetchData')
			} else {
				dispatch('fetchQuery', state.query)
			}
		}
	},
	mutations: {
		SET_DATA(state, data) {
			state.data = data;
		},
	
		SET_PAGINATION(state, pagination) {
			state.pagination = pagination;
		},
	
		CHANGE_PAGE(state, page) {
			state.pagination.page = page;
		},
	
		NEXT_PAGE(state) {
			state.pagination.page = state.pagination.next;
		},
	
		PREVIOUS_PAGE(state) {
			state.pagination.page = state.pagination.previous;
		},

		SET_SOURCE(state, source) {
			state.source = source;
		},

		SET_QUERY(state, query) {
			state.query = query;
		},

		SET_SORT(state, sort) {
			state.sort = sort;
		},
		SET_LOADING(state, isLoading) {
			state.isLoading = isLoading;
		}
	},
};