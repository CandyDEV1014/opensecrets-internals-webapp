import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import AddCandidatePage from "@/pages/candidates/AddCandidatePage.vue";
import AddRulePage from "@/pages/rules/AddRulePage.vue";
import FileUploadPage from "@/pages/FileUploadPage.vue";

const routes = [
	{
		path: "/",
		name: "HomePage",
		component: HomePage
	},
	{
		path: '/candidates/add',
		name: 'AddCandidatePage',
		component: AddCandidatePage
	},
	{
		path: '/rules/add',
		name: 'AddRulePage',
		component: AddRulePage
	},
	{
		path: '/file-upload',
		name: 'FileUploadPage',
		component: FileUploadPage
	}

]

const router = createRouter({
	history: createWebHistory(),
	routes,
	linkActiveClass: 'active'
})

export default router;