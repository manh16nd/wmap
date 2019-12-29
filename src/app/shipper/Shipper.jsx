import React, {useEffect, useState} from 'react'
import Map from '../shared/Map'
import {usePosition} from 'use-position'
import {getNearbyStores} from '../../services/api/StoresServices'
import Preview from '../homepage/Preview'
import {getPendingOrders} from '../../services/api/OrderService'
import Incoming from './Incoming'

const Shipper = props => {
    const [trying, setTring] = useState(0)
    const [loading, setLoading] = useState(false)
    const [maxDistance, setMaxDistance] = useState(1000)
    const [preview, setPreview] = useState([])
    const [request, setRequest] = useState([])

    useEffect(() => {
        fetchNearby()
        setInterval(() => {
            fetchOrders()
        }, 5000)
    }, [])

    const fetchOrders = async () => {
        const {success, data, message} = await getPendingOrders()
        if (!success) return console.log(message)
        console.log(data)
        setRequest(data)
    }

    const {latitude, longitude, error} = usePosition()

    useEffect(() => {
        console.log(latitude, longitude, error)
    }, [latitude])

    const current = {lat: latitude, lng: longitude}

    const fetchNearby = async () => {
        const {lat, lng} = current
        if (loading || trying > 10) return
        setLoading(true)
        setTring(trying + 1)
        const current_location = lat ? [lat, lng] : [105.7827015, 21.0382399]
        const {success, data: resp} = await getNearbyStores(current_location, maxDistance)
        setLoading(false)
        if (!success) return fetchNearby()
        const {data} = resp
        setPreview(data)
    }

    const ok = () => {

    }

    const previewIcon = preview.map(item => ({
        icon: 'https://img.icons8.com/cotton/64/000000/street-food.png',
        coordinates: item.location.coordinates
    }))

    return <div className="p-0">
        <div className="w-full" style={{height: '600px'}}>
            <Map current={current} points={previewIcon}/>
        </div>
        {request.length ? <Incoming request={request[0]} onOk={ok}/> : <Preview preview={preview}/>}
    </div>
}

export default Shipper
