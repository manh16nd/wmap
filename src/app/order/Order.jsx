import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {getOrder} from '../../services/api/OrderService'

const Order = props => {
    const params = useParams()
    const {id: orderId} = params
    const [data, setData] = useState({})

    useEffect(() => {
        fetchOrder()
    }, [])

    const fetchOrder = async () => {
        const {success, data, message} = await getOrder(orderId)
        if (!success) return console.log(message)
        setData(data)
    }

    return <div className="p-4">
        <h2 className="text-red-500 font-bold text-2xl">
            Thông tin đơn hàng #{orderId.slice(0, 7)}
        </h2>

        <div className="font-bold">
            {data.store && data.store.name}
        </div>
    </div>
}

export default Order
