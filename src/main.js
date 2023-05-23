import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import "./assets/scss/config/modern/app.scss"
import "bootstrap"
import Choices from 'choices.js';
import { Skeletor } from 'vue-skeletor';
import { VueQueryPlugin } from "@tanstack/vue-query"

/**
 * Load JWT from Local Storage on Refresh.
 */
let localAuthToken = localStorage.auth_token;
let cookieExists = localAuthToken !== "undefined" && localAuthToken !== null;
if (cookieExists) {
	const auth_token = localStorage.getItem("auth_token");
	const authTokenExists = auth_token !== "undefined" && auth_token !== null;
	if (authTokenExists) {
		// store.dispatch("loginUserWithToken", { auth_token });
	}
}

const app = createApp(App)
app.use(router)
app.use(store)
app.use(VueQueryPlugin)
app.mount('#app')

app.directive('choices', {
	mounted(el) {
		new Choices(el, {
			placeholder: true,
			placeholderValue: 'Select Option',
			itemSelectText: '',
			shouldSort: false,
			allowHTML: false
		});
	},
});

app.directive('multi-choices', {
	mounted(el) {
		new Choices(el, { 
			multiple: true,
			addItems: true,
			addItemFilter: true,
			removeItems: true,
			removeItemButton: true,
			placeholder: true,
			placeholderValue: "null",
			allowHTML: false
		});
	},
});

app.component(Skeletor.name, Skeletor);