import React, {useEffect, useState} from 'react'
import Map from '../shared/Map'
import MenuTabs from './MenuTabs'
import Preview from './Preview'
import {usePosition} from 'use-position'
import {getNearbyStores} from '../../services/api/StoresServices'

const HomePage = props => {
    const [tab, setTab] = useState(1)
    const [trying, setTring] = useState(0)
    const [loading, setLoading] = useState(false)
    const [maxDistance, setMaxDistance] = useState(1000)
    const [preview, setPreview] = useState([])

    useEffect(() => {
        fetchNearby()
    }, [])
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

    const previewIcon = preview.map(item => ({
        icon: 'https://img.icons8.com/cotton/64/000000/street-food.png',
        coordinates: item.location.coordinates
    }))

    return <div className="w-screen h-screen">
        <div className="w-full" style={{height: '50%'}}>
            <Map current={current} points={previewIcon}/>
        </div>
        <MenuTabs tab={tab} setTab={setTab}/>
        <Preview preview={preview}/>
    </div>
}

export default HomePage
