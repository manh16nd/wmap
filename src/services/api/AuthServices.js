import createApiService from './index'

const api = createApiService({
    baseUrl: '/auths'
})

export const login = (email, password) => api.createApiRequest({
    method: 'post',
    url: '/signin',
    data: {email, password}
})
