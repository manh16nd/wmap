import React from 'react'
import {Link} from 'react-router-dom'

const Preview = ({preview}) => {

    return (<div className="container">
        {preview.map(store => {
            const dishes = store.dishes.length > 2 ? [store.dishes[0], store.dishes[1]] : []
            return <Link to={`/store/${store._id}`} key={store._id}>
                <div className="card border-b-2 border-gray-400 px-4 py-2 bg-white flex">
                    <div className="w-20 h-20 rounded" style={{backgroundImage: `url(${store.background_image})`}}/>
                    <div className="px-8">
                        <div className="text-red-600 font-bold">{store.name}</div>
                        <div className="text-gray-500">{store.address}</div>
                        <div className="text-gray-500 font-thin">
                            {Math.ceil(store.distance)} m
                        </div>
                        <div className="px-8">
                            {dishes.map(dish => <div className="w-16 "></div>)}
                        </div>
                    </div>
                </div>
            </Link>
        })}
    </div>)
}

export default Preview
