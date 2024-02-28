import React, { useEffect, useState } from 'react'
import instance from '../../axios'
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

function OffersList() {

    const [offers, setOffers] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        instance.get('/admin/getalloffers', {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res);

            setOffers(res.data.data)
        })
    }, [])

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure to delete it?",
            background: '#191C24',
            showCancelButton: true,  
            confirmButtonText: "Confirm",
            customClass:{
                title: 'text-light',
                confirmButton: 'danger-btn-btn'
            }

        }).then((result) => {
            if (result.isConfirmed) {
                instance.delete(`/admin/deleteoffer/${id}`, {
                    headers: {
                        Authorization: Cookies.get('token')
                    }
                }).then((res) => {
                    console.log(res);
                    setOffers(offers.filter((offer) => {
                        return offer._id !== id
                    }))
                })
            }
        })
        
    }
    return (
        <>
            <div className='pt-5'>
                <div className="col-lg-11 mt-5 m-auto grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className='row align-items-center mb-4'>
                                <h4 className="card-title col-4 mt-4">offers</h4>
                                <form className="nav-link  d-none d-lg-flex search col-6">
                                    <input type="text" className="form-control" placeholder="Search offers" style={{ color: "white" }} onChange={handleSearch} />
                                </form>
                            </div>


                            <div className="table-responsive col-12">
                                <table className="table text-center" >
                                    <thead>
                                        <tr>
                                            <th style={{ width: "50px" }}>Index</th>
                                            <th>Offer Title</th>
                                            <th>startDate</th>
                                            <th>endDate</th>
                                            <th>Discount Type</th>
                                            <th>Discount</th>
                                            <th>offerType</th>
                                            <th>applicables</th>
                                            <th style={{ textAlign: "center", width: "200px" }}>Actions</th>

                                        </tr>
                                    </thead>
                                    <tbody >
                                        {
                                            offers.map((offer, index) => {
                                                if (offer.offerTitle.startsWith(search) || search === "") {
                                                    return (
                                                        // eslint-disable-next-line react/jsx-key
                                                        <tr >
                                                            <td style={{ color: "#bcc0d7", width: "50px" }}>{index + 1}</td>
                                                            <td style={{ color: "#bcc0d7" }}>{offer.offerTitle}</td>
                                                            <td style={{ color: "#bcc0d7" }}>{new Date(offer.startDate).toDateString()} {new Date(offer.startDate).toLocaleTimeString()}</td>
                                                            <td style={{ color: "#bcc0d7" }}>{new Date(offer.endDate).toDateString()} {new Date(offer.endDate).toLocaleTimeString()}</td>

                                                            <td style={{ color: "#bcc0d7" }}>{offer.discountType}</td>
                                                            <td style={{ color: "#bcc0d7" }}>{offer.discount}</td>
                                                            <td style={{ color: "#bcc0d7" }}>{offer.offerType}</td>
                                                            <td style={{ color: "#bcc0d7" }}>{offer.applicables}</td>
                                                            <td className='d-flex gap-3 justify-content-center' style={{ width: "200px" }}>

                                                                <Link to={`/editoffer/${offer._id}`} className='btn btn-outline-warning'>Edit</Link>


                                                                <button className='btn btn-outline-danger' onClick={() => handleDelete(offer._id)}>Delete</button>


                                                            </td>
                                                        </tr>
                                                    )
                                                } else {
                                                    return null
                                                }
                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}

export default OffersList