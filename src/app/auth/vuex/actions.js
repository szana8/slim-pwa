import { isEmpty } from 'lodash'
import localforage from 'localforage'
import { setHttpToken } from "../../../helpers/index";

export const register = ({ dispatch }, { payload, context }) => {
    
    return new Promise((resolve, reject) => {
        axios.post('api/v1/auth/signup', payload).then((response) => {
            dispatch('setToken', response.data.meta.token).then(() => {
                dispatch('fetchUser')
            })

            resolve()
        }).catch((error) => {
            context.errors = error.response.data.errors
            reject(error)
        })
    })
    
}

export const login = ({ dispatch }, { payload, context }) => {
    return axios.post('api/v1/auth/signin', payload).then((response) => {
       dispatch('setToken', response.data.meta.token).then(() => {
           dispatch('fetchUser')
       })
    }).catch((error) => {
        context.errors = error.response.data.errors
        reject(error)
    })
}

export const setToken = ({commit, dispatch}, token) => {
    if (isEmpty(token)) {
        return dispatch('checkTokenExists').then((token) => {
            setHttpToken(token)
        })
    }

    commit('setToken', token)
    setHttpToken(token)
}

export const checkTokenExists = ({commit, dispatch}, token) => {
    return localforage.getItem('authtoken').then((token) => {
        if (isEmpty(token)) {
            return Promise.reject('NO_STOREAGE_TOKEN')
        }

        return Promise.resolve(token);
    })
}

export const clearAuth = ({ commit }, token) => {
    commit('setAuthenticated', false)
    commit('setUserData', null)
    commit('setToken', null)
    setHttpToken(null)
}

export const fetchUser = ({ commit }) => {
    return axios.get('/api/v1/auth/signedIn').then((response) => {
        commit('setAuthenticated', true)
        commit('setUserData', response.data.data)
    })
}

export const logout = ({ dispatch }) => {
    return axios.post('/api/v1/auth/logout').then((response) => {
        dispatch('clearAuth')
    })
}