import MainLayout from '../layouts/Main.vue'
import {ADMIN_ROLE} from "@/utils/auth";

const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path: '',
                name: 'Index',
                component: () => import('../pages/client/Index'),
                meta: {
                    title: 'Главная'
                }
            },
            {
                path: '/about',
                name: 'About',
                component: () => import('../pages/client/About'),
                meta: {
                    title: 'О нас'
                }
            },
            {
                path: '/mis-nso',
                name: 'MisNso',
                component: () => import('../pages/client/MisNso'),
                meta: {
                    title: 'МИС НСО'
                }
            },
            {
                path: '/eln',
                name: 'ELN',
                component: () => import('../pages/client/ELN'),
                meta: {
                    title: 'ЕЛН'
                }
            },
            {
                path: '/admin/news',
                name: 'News',
                component: () => import('../pages/admin/News/Index'),
                meta: {
                    title: 'Новости',
                    authorize: [ADMIN_ROLE]
                }
            },
            {
                path: '/admin/news/form/:id?',
                name: 'NewsForm',
                component: () => import('../pages/admin/News/Form'),
                meta: {
                    title: 'Новость упрваление',
                    authorize: [ADMIN_ROLE]
                }
            },
            {
                path: '/admin/cartridges',
                name: 'Cartridges',
                component: () => import('../pages/admin/Cartridges/Index'),
                meta: {
                    title: 'Картриджи',
                    authorize: [ADMIN_ROLE]
                }
            },
            {
                path: '/admin/cartridge/form/:id?',
                name: 'CartridgeForm',
                component: () => import('../pages/admin/Cartridges/Form'),
                meta: {
                    title: 'Картридж управление',
                    authorize: [ADMIN_ROLE]
                }
            },
        ]
    },
    {
        path: '/admin/login',
        name: 'Login',
        component: () => import('../pages/admin/Login'),
        meta: {
            title: 'Вход'
        }
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

export default routes