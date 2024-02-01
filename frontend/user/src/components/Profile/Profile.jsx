import React from 'react'
import './Profile.css'

import Sidebar from '../Sidebar/Sidebar'
import Personal from '../Personal/Personal'
import ManageAddress from '../ManageAddress/ManageAddress'
function Profile() {
    return (
        <>

            <div className='container-fluid profile'>
                <div className='row my-5'>
                    
                   <Sidebar/>
                   {/* <Personal/>  */}
                   <ManageAddress/>

                </div>
            </div>
        </>
    )
}

export default Profile