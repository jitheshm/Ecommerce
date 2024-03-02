import React from 'react'
import DashboardComponent from '../components/Dashboard/Dashboard'
import Header from '../components/Header/Header'
import MobileNavbar from '../components/mobile/Navbar'
function Dashboard() {
    return (
        <>
            <Header />
            <DashboardComponent />
            <MobileNavbar />

        </>
    )
}

export default Dashboard