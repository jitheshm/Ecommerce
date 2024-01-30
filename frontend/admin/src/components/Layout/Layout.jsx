import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../Navbar/Navbar'
import Auth from '../Auth/Auth'

function Layout({ children }) {
    return (
        <Auth>
            <div className='d-flex '>
                <Sidebar />
                <div className='col-10'>
                    <Navbar />
                    {children}
                </div>
            </div>
        </Auth>
    )
}

export default Layout