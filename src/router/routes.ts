import { createRouter, createWebHistory } from 'vue-router';
import { useHttpStore } from '../stores/HttpStore';
import { useUserStore } from '../stores/UserStore';
import * as process from 'process';

const routes = [
    {
        path: "/",
        component: () => import("../views/HomePage.vue"),
        name: "home",
        meta: {
            AuthRequired: true
        }
    },
    {
        path: "/login",
        component: () => import("../views/LoginPage.vue"),
        name: "login",
        meta: {
            AuthRequired: false
        }
    },
    {
        path: "/register",
        component: () => import("../views/RegisterPage.vue"),
        name: "register",
        meta: {
            AuthRequired: false
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach( async (to, from, next) => {
	console.log(import.meta.env.VITE_API_URL);
    if(to.meta.AuthRequired) {
        if(localStorage.getItem('access_token') && localStorage.getItem('access_token') != "") {
            const http = useHttpStore();
            http.httpRequest(
                'GET',
				`${import.meta.env.VITE_API_URL}/user`,
                {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                },
                {},
                false
            ).then((response) => {
                const user = useUserStore();
                console.log(response);
                user.setNome(response.name);
                user.setEmail(response.email);
                return next();
            }).catch((error) => {
                console.log(error);
                return next({name: 'login'});
            })
        } else {
            return next({name: 'login'});
        }
    }

    return next();
})

export default router


