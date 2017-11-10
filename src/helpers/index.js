import { isEmpty } from 'lodash'

/**
 * Set the token for the http header to send with all
 * of the requests
 *  
 * @param  {[type]} token [description]
 * @return {[type]}       [description]
 */
export const setHttpToken = (token) => {
    if (isEmpty(token))
        window.axios.defaults.headers.common['Authorization'] = null
    else
        window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}