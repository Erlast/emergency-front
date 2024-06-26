import MainLayout from '../layouts/Main.vue'
import {ADMIN_ROLE, USER_ROLE} from "@/utils/auth";

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
                path: '/page/:slug',
                component: () => import('../pages/client/Page'),
                name: 'Page',
                meta: {
                    title: 'Документы'
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
            {
                path: '/admin/users',
                name: 'Users',
                component: () => import('../pages/admin/Users/Index'),
                meta: {
                    title: 'Пользователи',
                    authorize: [ADMIN_ROLE]
                }
            },
            {
                path: '/admin/user/form/:id?',
                name: 'UserForm',
                component: () => import('../pages/admin/Users/Form'),
                meta: {
                    title: 'Пользователь',
                    authorize: [ADMIN_ROLE]
                }
            },
            {
                path: '/admin/workplaces',
                name: 'Workplaces',
                component: () => import('../pages/admin/Workplaces/Index'),
                meta: {
                    title: 'ПК',
                    authorize: [ADMIN_ROLE, USER_ROLE]
                }
            },
            {
                path: '/admin/workplace/:id?',
                name: 'Workplace',
                component: () => import('../pages/admin/Workplaces/Form'),
                meta: {
                    title: 'ПК',
                    authorize: [ADMIN_ROLE, USER_ROLE]
                }
            },
            {
                path: '/admin/workplaces/free-ip',
                name: 'FreeIP',
                component: () => import('../pages/admin/Workplaces/IPList'),
                meta: {
                    title: 'Свободные IP',
                    authorize: [ADMIN_ROLE]
                }
            },
            {
                path: '/admin/documents',
                name: 'Documents',
                component: () => import('../pages/admin/Documents/Index'),
                meta: {
                    title: 'Документы',
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