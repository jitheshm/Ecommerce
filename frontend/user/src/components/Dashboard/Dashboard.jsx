import React from 'react'
import './Dashboard.css'

import Sidebar from '../Sidebar/Sidebar'
import Personal from '../Personal/Personal'
import ManageAddress from '../ManageAddress/ManageAddress'
import { Outlet } from 'react-router-dom'
function Dashboard() {
    return (
        <>

            <div className='container-fluid-md profile'>
                <div className='row my-md-4'>
                   
                   <Sidebar/>
                   <Outlet />
                </div>   
            </div>
        </>
    )
}

export default Dashboard