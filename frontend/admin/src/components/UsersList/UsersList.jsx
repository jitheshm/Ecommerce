import React, { useEffect, useState } from 'react'
import instance from '../../axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
function UsersList() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        instance.get('/admin/getusers', {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res);
            setUsers(res.data.data)
        })
    }, [])


    const handleBlock = (id) => {
        
            instance.get(`/admin/blockuser?id=${id}`, {
                headers: {
                    Authorization: Cookies.get('token')
                }
            }).then((res) => {
                console.log(res);
            })
       

    }
    const handleUnblock = (id) => {
        
        instance.get(`/admin/unblockuser?id=${id}`, {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res);
        })
   

}

    return (
        <div className='mt-5 pt-2'>
          
            <table className="table table-dark mt-5 pt-5">
                <thead className=''>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone no</th>
                      
                        <th scope="col">IsBlocked</th>
                        <th scope="col">Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user) => {
                            return (
                                // eslint-disable-next-line react/jsx-key
                                <tr>
                                    <th scope="row">1</th>
                                    <td>{user.firstName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                  
                                    <td>{user.isBlocked ? <p>Blocked</p> : <p>Not Blocked</p>}</td>
                                    <td>
                                        
                                        <button onClick={() => {
                                            handleBlock(user._id)
                                        }}>block</button>
                                        <button onClick={() => {
                                            handleUnblock(user._id)
                                        }}>block</button>

                                       

                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>

    )
}

export default UsersList