import {createRouter, createWebHistory, /*createMemoryHistory, createWebHashHistory*/} from 'vue-router'
import routes from './routes'
import getPageTitle from "@/utils/get-page-title";
import {isGuest, user} from "@/utils/auth";

// const createHistory = process.env.SERVER
//     ? createMemoryHistory
//     : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

const router = createRouter({
    scrollBehavior: () => ({left: 0, top: 0}),
    history: createWebHistory(),
    routes
})

const whiteList = ['Login', 'Index', 'About', 'MisNso', 'ELN']

router.beforeEach(async (to, from, next) => {

    document.title = getPageTitle(to.meta.title || 'Внутренний сайт ГКБ №34', whiteList.indexOf(to.name) === -1)
    const {authorize} = to.meta;
    const currentUser = user();
    //Loading.show()

    if (!isGuest() && authorize) {
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return next({path: "/"});
        }

        // check if route is restricted by role
        if (authorize.length && !authorize.includes(currentUser.role)) {
            // role not authorised so redirect to home page
            return next({path: "/"});
        }
    }

    // if (to.query && to.query.loginForm === 'show') {
    //     setLoginDialogState(true)
    // } else {
    //     setLoginDialogState(false)
    // }
    //
    // if (to.query && to.query.regForm === 'show') {
    //     setRegDialogState(true)
    // } else {
    //     setRegDialogState(false)
    // }
    //
    // if (to.query && to.query.token) {
    //     setConfirmationTokenState(to.query.token)
    // } else {
    //     setConfirmationTokenState(null)
    // }

    if (!isGuest()) {
        if (to.path === '/admin/login') {
            next({path: '/'})
        } else {
            next()
        }
    } else {

        if (whiteList.indexOf(to.name) !== -1) {
            next()
        } else {
            next(`/admin/login?redirect=${to.path}`)
        }
    }
})

router.afterEach(() => {
    // Loading.hide()
})

export default router


