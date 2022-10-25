import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Chat from "../pages/Chat.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Descargas from "../pages/Descargas.vue";
import Profile from "../pages/Profile.vue";
import { subscribeToAuthChanges } from "../services/auth.js";

const routes = [{
        path: '/',
        component: Home,
    },
    {
        path: '/chat',
        component: Chat,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/iniciar-sesion',
        component: Login,
    },
    {
        path: '/registro',
        component: Register,
    },
    {
        path: '/descargas',
        component: Descargas,
    },
    {
        path: '/perfil',
        component: Profile,
        meta: {
            requiresAuth: true,
        },

    },
]


const router = createRouter({
    routes,
    history: createWebHashHistory(),
});


let userData;

subscribeToAuthChanges(newUser => userData = newUser);

router.beforeEach((to, from) => {

    if (to.meta.requiresAuth && userData.id === null) {
        return {
            path: '/iniciar-sesion',
        }
    }
});


export default router;