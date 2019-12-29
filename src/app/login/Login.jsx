import React, {useContext, useRef, useState} from 'react'
import {login} from '../../services/api/AuthServices'
import {useHistory} from 'react-router-dom'
import AppContext from '../shared/AppContext'

const Login = props => {
    const emailEl = useRef(null)
    const passwordel = useRef(null)
    const [loading, setLoading] = useState(false)
    const appContext = useContext(AppContext)
    const history = useHistory()

    const onSubmit = e => {
        e.preventDefault()
        const username = emailEl.current.value
        const password = passwordel.current.value
        doLogin(username, password)
    }

    const doLogin = async (username, password) => {
        setLoading(true)
        const {success, data, message} = await login(username, password)
        setLoading(false)
        if (!success) return alert(message)
        const {user, token} = data
        const {type} = user
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        appContext.setUser(user)
        appContext.setToken(token)
        history.push((type === 'shipper')  ? '/shipper' : '/')
    }

    return <div className="p-4">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
            <div className="mb-4">
                <label className="block text-red-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    ref={emailEl}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-red-500 focus:shadow"
                    id="email" type="text" placeholder="Email"/>
            </div>
            <div className="mb-6">
                <label className="block text-red-700 text-sm font-bold mb-2" htmlFor="password">
                    Mật khẩu
                </label>
                <input
                    ref={passwordel}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-red-500 focus:shadow disabled"
                    id="password" type="password" placeholder="Mật khẩu"/>
            </div>
            <div className="flex items-center justify-between">
                <button
                    disabled={loading} style={{minWidth: '5rem'}}
                    className={loading ? 'bg-red-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed' :
                        'bg-red-500 min-w-64 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'}
                    type="submit">
                    {loading ? <div className="lds-circle"/> : 'Đăng nhập'}
                </button>
            </div>
        </form>
    </div>
}

export default Login
