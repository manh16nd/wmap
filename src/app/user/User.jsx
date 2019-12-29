import React, {useContext} from 'react'
import AppContext from '../shared/AppContext'

const User = props => {
    const {setUser, setToken} = useContext(AppContext)

    const logout = () => {
        localStorage.clear()
        setUser(null)
        setToken(null)
    }

    return <div className="p-4">
        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full" onClick={logout}>
            Đăng xuất
        </button>
    </div>
}

export default User
