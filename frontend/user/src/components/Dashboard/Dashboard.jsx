import React from 'react'
import './Dashboard.css'

import Sidebar from '../Sidebar/Sidebar'
import Personal from '../Personal/Personal'
import ManageAddress from '../ManageAddress/ManageAddress'
import { Outlet } from 'react-router-dom'
function Dashboard() {
    return (
        <>

            <div className='container-fluid profile'>
                <div className='row my-4'>
                   
                   <Sidebar/>
                   <Outlet />
                </div>
            </div>
        </>
    )
}

export default Dashboard