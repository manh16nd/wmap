import React from 'react'

const MenuTabs = props => {

    return <div className="p-3 flex">
        <div className="w-1/2 flex justify-center">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                For You
            </button>
        </div>
        <div className="w-1/2 flex justify-center">
            <button className="bg-red-500 hover:bg-red-700 hover:shadow text-white font-bold py-2 px-4 rounded-full">
                Near By
            </button>
        </div>
    </div>
}

export default MenuTabs
