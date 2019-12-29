import createApiService from './index'

const api = createApiService({
    baseUrl: '/stores'
})

export const getNearbyStores = (current_location, max_distance) => api.createApiRequest({
    method: 'post',
    url: '/nearby',
    data: {current_location, max_distance}
})

export const getRecommendStores = (current_location, max_distance) => api.createAuthApiRequest({
    method : 'post',
    url : '/recommend',
    data : {current_location, max_distance}
})

export const getOneStore = store => api.createApiRequest({
    method: 'get',
    url: '/' + store,
})

export const getStoreDishes = store => api.createApiRequest({
    method: 'get',
    url: '/' + store + '/dishes'
})
