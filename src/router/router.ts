import {createRouter, createWebHistory} from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import AuthPage from '@/pages/AuthPage.vue';
import HomePage from "@/pages/HomePage.vue";
import CorpusPage from "@/pages/CorpusPage.vue";
import AnalysisPage from "@/pages/AnalysisPage.vue";
import ProfilePage from "@/pages/ProfilePage.vue";
import SettingPage from "@/pages/SettingPage.vue";

const multiLangSenti_routes = [
    {path: 'home', name: 'home', component: HomePage},
    {path: 'corpus', name: 'corpus', component: CorpusPage},
    {path: 'analysis', name: 'analysis', component: AnalysisPage},
    {path: 'profile', name: 'profile', component: ProfilePage},
    {path: 'setting', name: 'setting', component: SettingPage},
]
const routes = [
    {
        path: '/multiLangSenti',
        component: MainPage,
        meta: {requiresAuth: true},
        children: multiLangSenti_routes
    },
    {
        path: '/login',
        component: AuthPage,
        props: {mode: 'login'}
    },
    {
        path: '/register',
        component: AuthPage,
        props: {mode: 'register'}
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/multiLangSenti/home'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// 路由守卫: 登录验证
router.beforeEach((to, _from, next) => {
    const token = localStorage.getItem('token')
    console.log("当前token:", token)

    if (to.meta.requiresAuth && !token) {
        next('/login');
    } else if ((to.path === '/login' || to.path === '/register') && token) {
        next('/multiLangSenti/home');
    } else {
        next();
    }
});

export default router;