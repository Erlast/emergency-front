import Cookies from 'js-cookie'
import {api} from '@/boot/axios'
import {findInArray} from "./index";
import {isEmpty} from "lodash";

const TokenKey = 'access_token'

const USER_ROLE = 1
const GUEST_ROLE = 0
const MODER_ROLE = 2
const ADMIN_ROLE = 3

const getToken = () => {
  return getCookie(TokenKey)
}

const setCookie = (name, val, expires) => {
  return Cookies.set(name, val, {expires: expires || 365})
}

const getCookie = (name) => {
  return Cookies.get(name)
}

const assign = () => {
  setRoles().then(() => {
  })
}

const setToken = (token) => {
  return setCookie(TokenKey, token)
}

const setRoles = async () => {
  //await dispatch('permissions/generateRoutes', null, {root: true})
}

const removeToken = () => {
  return Cookies.remove(TokenKey)
}

const isGuest = () => {
  const token = getToken()
  return !token
}

const user = () => {
  return getCookie('user') ? JSON.parse(getCookie('user')) : {login: '', role: GUEST_ROLE}
}

const jwt = () => {
  return getCookie('jwt') ? JSON.parse(getCookie('jwt')) : {access_token: '', token_type: 'jwt'}
}

const loginWithToken = async (payload, user) => {
  setCookie('user', JSON.stringify(user))
  setCookie('jwt', JSON.stringify(payload))
  assign()
}

const logout = async () => {
  api.defaults.headers.common['Authorization'] = null
  Cookies.remove('user')
  removeToken()
}

const isAdmin = () => {
  const roles = user().roles
  return !!roles.indexOf(ADMIN_ROLE);
}

const hasRoles = (roles) => {
  const userRoles = user().roles
  if (!isEmpty(userRoles)) {
    return findInArray(roles, userRoles);
  }
  return false
}

export {
  setCookie,
  getCookie,
  getToken,
  removeToken,
  setToken,
  isGuest,
  user,
  loginWithToken,
  logout,
  assign,
  GUEST_ROLE,
  USER_ROLE,
  ADMIN_ROLE,
  MODER_ROLE,
  isAdmin,
  hasRoles,
  jwt
}
