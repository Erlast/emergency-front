import axios from 'axios'
import qs from 'qs'
import {isBoolean, isEmpty} from "lodash";
import {SORT_PARAM, FILTER_PARAM} from '/src/utils/params'
import {loginWithToken, jwt, setToken, isGuest, getToken} from "/src/utils/auth";
import {notify} from "@kyvg/vue3-notification";
import {useProgress} from '@marcoschulte/vue3-progress';

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const progresses = [];

const api = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    withCredentials: false,
    crossDomain: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    paramsSerializer: params => {
        let newParams = Object.assign({}, params)
        let arrayFormat = 'comma'

        Object.keys(newParams).forEach(key => {
            if (key !== SORT_PARAM && key !== FILTER_PARAM && (newParams[key] === null || newParams[key] === '' || (Array.isArray(newParams[key]) && newParams[key].length === 0) || JSON.stringify(newParams[key]) === '{}')) {
                delete newParams[key]
            }

            if (key === FILTER_PARAM) {
                for (let item in newParams[key]) {
                    if (newParams[key][item] === null)
                        delete newParams[key][item]
                }
                let lnt = Object.values(newParams[key]).length

                if (!lnt) {
                    delete newParams[key]
                }
            }
            if (isBoolean(newParams[key])) {
                newParams[key] = Number(newParams[key])
            }

            if (key === SORT_PARAM && Array.isArray(newParams[SORT_PARAM]) && !isEmpty(newParams[SORT_PARAM])) {
                let sorting = []
                for (let k in newParams[SORT_PARAM]) {
                    sorting.push(newParams[SORT_PARAM][k].desc ? `-${newParams[SORT_PARAM][k].value}` : newParams[SORT_PARAM][k].value)
                }
                newParams[SORT_PARAM] = sorting.join(',')
            } else if (key === SORT_PARAM && !Array.isArray(newParams[SORT_PARAM])) {
                newParams[SORT_PARAM] = newParams[SORT_PARAM].desc ? `-${newParams[SORT_PARAM].value}` : newParams[SORT_PARAM].value
            }

        })

        return qs.stringify(newParams, {arrayFormat: arrayFormat})
    }
})

api.interceptors.request.use(
    config => {

        progresses.push(useProgress().start());

        if (!isGuest()) {
            config.headers.Authorization = `Bearer ${getToken()}`
        }

        return config
    },
    error => {

        console.log(error) // for debug

        progresses.pop()?.finish();

        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response

        progresses.pop()?.finish();
        if (response.status === 500) {
            notify({
                title: 'Ошибка сервера.',
                type: 'danger',
            })
            return Promise.reject(new Error('Server Error'))
        }

        if (response.status !== 200 && response.status !== 204) {
            return Promise.reject(new Error(res.data.message || 'Error'))
        } else {
            return res
        }
    },
    async error => {
        progresses.pop()?.finish();

        let message = 'Unknown error'

        if (error.response.data.message)
            message = error.response.data.message

        switch (error.response.status) {
            case 400: {
                message = 'Ошибки валидации. Проверьте форму.'
                notify({
                    title: message,
                    type: 'danger',
                })

                return Promise.reject(error)
            }
            case 401: {
                const {data} = await api.post('/auth/refresh', jwt())
                await setToken(data.access_token)
                const {data: user} = await api.get('/user')
                await loginWithToken(data, user.data)
                return api.request(error.config)
            }
            case 404: {
                notify({
                    title: 'Ошибка сервера.',
                    type: 'danger',
                })
                return Promise.reject(error)
            }
            case 500: {
                notify({
                    title: message || 'Error',
                    type: 'danger',
                })

                return Promise.reject(error)
            }
            default: {
                message = 'Ошибка авторизации. Проверьте логин/пароль.'
                notify({
                    title: message || 'Error',
                    type: 'danger',
                })

                return Promise.reject(error)
            }

        }

    }
)

export {api}
