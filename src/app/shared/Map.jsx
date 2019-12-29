import React from 'react'
import mapboxgl from 'mapbox-gl'
import {mapVector} from '../config'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'

let map = null

class Map extends React.Component {
    componentDidMount() {
        map = new mapboxgl.Map({
            container: 'food-map',
            style: mapVector,
            center: this.props.current.lat ? [this.props.current.lng, this.props.current.lat] : [105.7827015, 21.0382399],
            zoom: 16,
        })
        map.on('load', () => {
            map.resize();
        })
        map.on('move', () => {
            const {lng, lat} = map.getCenter()

            this.setState({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            })
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevProps.current.lat && this.props.current.lat) {
            // this.setCenter()
        }
        if (JSON.stringify(this.props.points) !== JSON.stringify(prevProps.points)) {
            this.addPoints()
        }
    }

    addPoints = () => {
        this.props.points.forEach((point, i) => this.renderPoints({...point, iconSize: .5}, `point_${i}`))
    }

    renderPoints = ({icon, coordinates, iconSize}, id) => {
        console.log(icon)
        map.loadImage(
            icon,
            function (error, image) {
                if (error) throw error
                map.addImage('cat', image)
                map.addLayer({
                    'id': id || 'points',
                    'type': 'symbol',
                    'source': {
                        'type': 'geojson',
                        'data': {
                            'type': 'FeatureCollection',
                            'features': [
                                {
                                    'type': 'Feature',
                                    'geometry': {
                                        'type': 'Point',
                                        'coordinates': coordinates,
                                    }
                                }
                            ]
                        }
                    },
                    'layout': {
                        'icon-image': 'cat',
                        'icon-size': iconSize || .02,
                    }
                })
            }
        )
    }

    setCenter = () => {
        const {lat, lng} = this.props.current
        console.log('123')
        map.loadImage(
            'https://cors-anywhere.herokuapp.com/https://www.pngfind.com/pngs/m/66-664260_open-blue-current-location-icon-hd-png-download.png',
            function (error, image) {
                if (error) throw error
                map.addImage('cat', image)
                map.addLayer({
                    'id': 'points',
                    'type': 'symbol',
                    'source': {
                        'type': 'geojson',
                        'data': {
                            'type': 'FeatureCollection',
                            'features': [
                                {
                                    'type': 'Feature',
                                    'geometry': {
                                        'type': 'Point',
                                        'coordinates': [lng, lat]
                                    }
                                }
                            ]
                        }
                    },
                    'layout': {
                        'icon-image': 'cat',
                        'icon-size': .02,
                    }
                })
            }
        )
    }

    render() {
        return (
            <div id={'food-map'} style={{
                width: '100%',
                height: '100%',
            }}/>
        )
    }
}

export default Map
