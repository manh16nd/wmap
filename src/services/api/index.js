import axios from 'axios'

const createApiService = props => {
    const {baseUrl} = props
    const url = `https://homnayangiz.herokuapp.com${baseUrl || ''}`

    const doRequest = ({url: apiUrl, method, params, data, headers}) => new Promise((resolve) => axios({
        method,
        params,
        data,
        url: `${url}${apiUrl || ''}`,
        headers,
    })
        .then(({data: resp}) => {
            const {success, data, message} = resp

            resolve({
                success,
                data,
                message,
            })
        })
        .catch(err => resolve({
            success: false,
            message: err.message,
        })))

    const createApiRequest = ({url, method, params, data}) => {
        return doRequest({url, method, params, data})
    }

    const createAuthApiRequest = ({url, method, params, data}) => {
        console.log(localStorage.getItem('token'))
        const headers = {
            'authorization': 'Bearer ' + localStorage.getItem('token'),
        }
        return doRequest({url, method, params, data, headers})
    }

    return {
        createApiRequest,
        createAuthApiRequest
    }
}

export default createApiService
