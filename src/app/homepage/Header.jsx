import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import AppContext from '../shared/AppContext'

const Header = props => {
    const {user} = useContext(AppContext)

    return <nav className="flex items-center justify-between flex-wrap bg-red-600 p-6 shadow">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
            <Link to={'/'}>
                <span className="font-semibold text-2xl tracking-tight">
                    <i className="icofont-fast-food"/>
                </span>
                <span className="font-semibold">
                    Hôm nay ăn gì
                </span>
            </Link>
        </div>
        <div className="block lg:hidden">
            {user ? <Link to={'/user'}>
                <i className="icofont-ui-user color text-white text-xl"/>
            </Link> : <Link to={'/login'}
                            className="bg-red-500 hover:bg-red-700 hover:shadow text-white font-bold py-2 px-4 rounded-full">
                Đăng nhập
            </Link>}
        </div>
    </nav>
}

export default Header
