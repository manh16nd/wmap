import createApiService from './index'

const api = createApiService({
    baseUrl: '/store-dishes'
})

export const getStoreDish = id => {
    api.createAuthApiRequest({
        url: '/' + id,
        method: 'get',
    })
}
