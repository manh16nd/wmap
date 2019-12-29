import createApiService from './index'

const api = createApiService({
    baseUrl: '/orders'
})

export const getPendingOrders = () => {
    return api.createApiRequest({
        url: '/pending',
        method: 'get',
    })
}

export const postOrder = (storeId, items, received_location) => {
    return api.createAuthApiRequest({
        url: '/',
        method: 'post',
        data: {storeId, items, received_location}
    })
}

export const getOrder = orderId => {
    return api.createAuthApiRequest({
        url: '/' + orderId,
        method: 'get',
    })
}

export const acceptOrder = (orderId) => {
    return api.createAuthApiRequest({
        url: '/' + orderId + '/accept-shipping',
        data: {ship_price: 10000},
        method: 'post'
    })
}

export const finishOrder = orderId => {
    return api.createAuthApiRequest({
        url: '/' + orderId + '/resolve',
        method: 'post',
    })
}
