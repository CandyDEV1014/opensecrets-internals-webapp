import router from '@/router';
import axios from "axios";

const BASE_URL = process.env.VUE_APP_API_URL;

const state = {
    auth_token: null,
    user: {
        id: null,
        username: null,
        email: null,
    },
    errors: []
};
const getters = {
    getAuthToken(state) {
        return state.auth_token;
    },
    getUserEmail(state) {
        return state.user?.email;
    },
    getUserID(state) {
        return state.user?.id;
    },
    isLoggedIn(state) {
        const loggedOut =
            state.auth_token == null || state.auth_token == JSON.stringify(null);
        return !loggedOut;
    },
};
const actions = {
    loginUser({ commit }, payload) {
        return new Promise((resolve, reject) => {
            try {
                commit('setUserInfoFromToken', { data: payload.user_data, auth_token: payload.auth_token });
                router.push('/home');
                resolve();
            } catch (error) {
                console.error('An error occurred while setting user info from token:', error);
                reject(error);
            }
        });
    }
    ,
    logoutUser({commit}) {
        const config = {
            headers: {
                authorization: state.auth_token,
            },
        };
        new Promise((resolve, reject) => {
            axios
                .delete(`${BASE_URL}users/sign_out`, config)
                .then(() => {
                    commit("resetUserInfo");
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
};
const mutations = {
    setUserError(state, errors) {
        state.erros = errors
    },
    setUserInfo(state, data) {
        state.user = data.data.user;
        state.auth_token = data.headers.authorization;
        axios.defaults.headers.common["Authorization"] = data.headers.authorization;
        localStorage.setItem("auth_token", data.headers.authorization);
    },
    setUserInfoFromToken(state, data) {
        state.auth_token = data.auth_token;
    },
    resetUserInfo(state) {
        state.user = {
            id: null,
            username: null,
            email: null,
        };
        state.auth_token = null;
        localStorage.removeItem("auth_token");
        axios.defaults.headers.common["Authorization"] = null;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};