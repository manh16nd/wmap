import React, {useEffect, useState} from 'react'
import Map from '../shared/Map'
import {usePosition} from 'use-position'
import {getOneStore} from '../../services/api/StoresServices'
import Slide from './Slide'
import {getStoreDishes} from '../../services/api/StoresServices'
import {postOrder} from '../../services/api/OrderService'
import {useHistory} from 'react-router-dom'

const Store = props => {
    const {latitude, longitude, error} = usePosition()
    const current = {lat: latitude, lng: longitude}
    const {id: storeId} = props.match.params
    const [store, setStore] = useState({})
    const [dishes, setDishes] = useState([])
    const history = useHistory()
    const [order, setOrder] = useState({})

    useEffect(() => {
        fetchStore()
        fetchStoreDishes()
    }, [])

    const fetchStoreDishes = async () => {
        const {success, data, message} = await getStoreDishes(storeId)
        if (!success) return console.log(message)
        setDishes(data)
    }

    const fetchStore = async () => {
        const {success, data, message} = await getOneStore(storeId)
        if (!success) return alert(message)
        setStore(data)
    }

    const orderDish = (dish, entity) => {
        setOrder({
            ...order,
            [dish]: entity,
        })
    }

    const isOrder = () => {
        return Object.keys(order).some(key => order[key])
    }

    const clickOrder = () => {
        if (window.confirm('Bạn có muốn đặt đơn này không?')) return orderNow()
    }

    const orderNow = async () => {
        const items = []
        Object.keys(order).forEach(dish => {
            const amount = order[dish]
            if (amount) items.push({dish, amount})
        })
        const locations = latitude ? [longitude, latitude] : [105.7827015, 21.0382399]
        const {success, data, message} = await postOrder(storeId, items, locations)
        if (!success) return alert(message)
        history.push(`/order/${data._id}`)
    }

    return <div>
        <div className="w-full">
            <Slide images={store.extra_images || []}/>
            <div className="p-2">
                <div className="font-thin text-2xl mb-2">
                    {store.name}
                </div>
                {dishes.map(dish => <div className="card bg-white p-2 mb-2 rounded border shadow-lg flex"
                                         key={dish._id}>
                    <div className="rounded" style={{
                        width: '7rem',
                        height: '7rem',
                        backgroundImage: `url(${store.background_image || 'data:image/jpeg;base64,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'})`
                    }}/>
                    <div className="pl-2">
                        <div className="text-red-600 font-bold">{dish.name}</div>
                        <div className="text-gray-500">{Number(dish.price).toLocaleString()}</div>
                        {!order[dish._id] ?
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => orderDish(dish._id, 1)}>Đặt món
                                ngay
                            </button> : <div className="flex items-center">
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                                    onClick={() => orderDish(dish._id, order[dish._id] - 1)}>
                                    -
                                </button>
                                {order[dish._id]}
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                                    onClick={() => orderDish(dish._id, order[dish._id] + 1)}>
                                    +
                                </button>
                            </div>}
                    </div>
                </div>)}
            </div>
            {isOrder() && <div className="p-2 flex">
                <div onClick={clickOrder}
                     className="card bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full">
                    Order ngay
                </div>
            </div>}
            <div className="px-4">
                <div className="font-thin text-xl">
                    Vị trí cửa hàng
                </div>
            </div>
            <div className="p-4" style={{height: '25vh'}}>
                <Map current={current}/>
            </div>
        </div>
    </div>
}

export default Store
