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
                    component: () => import('../pages/admin/News/Index')
                },
                {
                    path: '/news/form/:id?',
                    name: 'NewsForm',
                    component: () => import('../pages/admin/News/Form')
                },
                {
                    path: '/cartridges',
                    name: 'Cartridges',
                    component: () => import('../pages/admin/Cartridges/Index')
                },
                {
                    path: '/cartridge/form/:id?',
                    name: 'CartridgeForm',
                    component: () => import('../pages/admin/Cartridges/Form')
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
