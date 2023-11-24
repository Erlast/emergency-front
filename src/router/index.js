import {createRouter, createWebHistory} from 'vue-router'
import MainLayout from '../layouts/Main.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: MainLayout,
            children: [
                {
                    path: '',
                    name: 'Index',
                    component: () => import('../pages/client/Index')
                },
                {
                    path: '/about',
                    name: 'About',
                    component: () => import('../pages/client/About')
                },
                {
                    path: '/mis-nso',
                    name: 'MisNso',
                    component: () => import('../pages/client/MisNso')
                },
                {
                    path: '/eln',
                    name: 'ELN',
                    component: () => import('../pages/client/ELN')
                },
                {
                    path: '/news',
                    name: 'News',
                    component: () => import('../pages/admin/NewsIndex')
                },
                {
                    path: '/news/form/:id?',
                    name: 'NewsForm',
                    component: () => import('../pages/admin/NewsForm')
                },
            ]
        },
        {
            path: '/:catchAll(.*)*',
            meta: {
                title: 'Страница не найдена'
            },
            name: 'Error404',
            component: () => import('../pages/ErrorNotFound.vue')
        }
    ]
})

export default router
