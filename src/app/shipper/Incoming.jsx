import React from 'react'
import {useHistory} from 'react-router-dom'
import {acceptOrder} from '../../services/api/OrderService'

const Imcoming = ({request}) => {
    const history = useHistory()

    const accept = async () => {
        const {success, message} = await acceptOrder(request._id)
        if (!success) return console.log(message)
        history.push('/request/' + request._id)
    }

    return <div className="p-4">
        <div className="">Có đơn đặt hàng mới!</div>

        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={accept}>Nhận
            đơn
        </button>
    </div>
}

export default Imcoming
