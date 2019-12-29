import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {finishOrder, getOrder} from '../../services/api/OrderService'
import Map from '../shared/Map'
import {usePosition} from 'use-position'


const Request = props => {
    const [data, setData] = useState({})
    const params = useParams()
    const {latitude, longitude} = usePosition()
    let points = []

    useEffect(() => {
        setInterval(() => {
            fetchRequest()
        }, 5000)
    }, [])

    useEffect(() => {
        mapData()
    }, [latitude])

    const fetchRequest = async () => {
        const {id} = params

        const {success, data: d, message} = await getOrder(id)
        if (!success) return alert(message)
        setData(d)
    }

    const resolve = () => {
        if (window.confirm('Bạn thực sự muốn kết thúc đơn hàng')) {
            resolveOrder()
        }
    }

    const resolveOrder = async () => {
        const {success, message} = await finishOrder(params.id)
        if (!success) return alert(message)
        alert('OK rồi cậu ê')
    }

    const mapData = () => {
        const result = []
        if (data._id) {
            result.push({
                coordinates: data.received_location,
                icon: 'https://img.icons8.com/cotton/64/000000/street-food.png',
            })
            result.push({
                coordinates: data.store.location.coordinates,
                icon: 'https://img.icons8.com/cotton/64/000000/street-food.png',
            })
        }
        if (latitude) result.push({
            coordinates: [longitude, latitude],
            icon: 'https://img.icons8.com/cotton/64/000000/street-food.png',
        })

        return result
    }

    const previews = mapData()
    console.log(previews)

    return <div className="p-4">
        <h2 className="text-red-500 font-bold">
            Thông tin đơn hàng #{params.id.slice(0, 7)}
        </h2>

        <div className="font-bold text-2xl mb-2">
            {data.store && data.store.name}
        </div>

        <div>
            Trạng thái: {data.status}
        </div>

        <div style={{height: '50vh'}}>
            <Map points={previews}/>
        </div>

        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={resolve}>
            Kết thúc đơn hàng
        </button>
    </div>
}

export default Request
