import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../Navbar/Navbar'

function Layout({children}) {
    return (
        <div className='d-flex '>
            <Sidebar />
            <div className='col-10'>
                <Navbar />
                {children}
            </div>
        </div>
    )
}

export default Layout