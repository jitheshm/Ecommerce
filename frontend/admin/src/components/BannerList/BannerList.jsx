import React, { useEffect, useState } from 'react'
import instance from '../../axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

function BannerList() {
    const [banners, setBanners] = useState([])
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [toogle, setToogle] = useState(false)
    useEffect(() => {
        instance.get(`/admin/banners?page=${page}`, {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res);
            setBanners(res.data.data)
            //setTotalPages(res.data.totalPages);
        })
    }, [page, toogle])    

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };


    const handleActive = (id, status) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
                actions: 'action-btn'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: "Are you sure ?",
            icon: 'warning',
            background: '#191C24',
            showCancelButton: true,
            confirmButtonText: "Confirm",
            // customClass: {
            //     title: 'text-light',

            // }

        }).then((result) => {
            if (result.isConfirmed) {
                instance.patch(`/admin/banners/${id}/status`, {
                    
                    status: status
                }, {
                    headers: {
                        Authorization: Cookies.get('token')
                    }
                }).then((res) => {
                    console.log(res);
                    setToogle(!toogle)
                })
            }

        })


    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    return (
        <>
            <div className='pt-5'>
                <div className="col-lg-10 mt-5 m-auto grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className='row align-items-center mb-4'>
                                <h4 className="card-title col-4 mt-4">Banners</h4>
                                <form className="nav-link  d-none d-lg-flex search col-6">
                                    <input type="text" className="form-control" placeholder="Search categories" style={{ color: "white" }} onChange={handleSearch} />
                                </form>
                            </div>


                            <div className="table-responsive col-12">
                                <table className="table text-center" style={{ tableLayout: 'fixed' }}>
                                    <thead>
                                        <tr>
                                            <th style={{ width: "50px" }}>Index</th>
                                            <th>BID</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th style={{ textAlign: "center", width: "200px" }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {
                                            banners.map((batObj, index) => {
                                                if (batObj.title.startsWith(search) || search === "" || batObj._id.startsWith(search)) {
                                                    return (
                                                        // eslint-disable-next-line react/jsx-key
                                                        <tr >
                                                            <td style={{ color: "#bcc0d7", width: "50px" }}>{index + 1}</td>
                                                            <td style={{ color: "#bcc0d7" }}>{batObj._id}</td>
                                                            <td style={{ color: "#bcc0d7" }}>{batObj.title}</td>
                                                            <td style={{ color: "#bcc0d7" }}>{batObj.description}</td>
                                                            <td style={{ color: "#bcc0d7" }}>{batObj.startDate}</td>
                                                            <td style={{ color: "#bcc0d7" }}>{batObj.endDate}</td>
                                                            <td className='d-flex gap-3 justify-content-center' style={{ width: "200px" }}>

                                                                <Link to={`/editbanner/${batObj._id}`} className='btn btn-outline-warning'>Edit</Link>


                                                                {
                                                                    batObj.isActive ?<button className='btn btn-outline-danger' onClick={() => handleActive(batObj._id, false)}>Hide</button>:<button className='btn btn-outline-success' onClick={() => handleActive(batObj._id, true)}>Show</button>
                                                               } 


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
                            <div>
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination justify-content-center  mt-4">
                                        <li className="page-item">
                                            {
                                                page != 1 && <button disabled={page === 1} className="page-link" aria-label="Previous" onClick={handlePrevPage}>
                                                    <span aria-hidden="true">«</span>
                                                    <span className="sr-only">Previous</span>
                                                </button>
                                            }

                                        </li>
                                        {/* <li className="page-item"><a className="page-link" href="#">1</a></li>
                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li> */}
                                        <li className="page-item">
                                            {
                                                page != totalPages && <button className="page-link" aria-label="Next" onClick={handleNextPage}>
                                                    <span aria-hidden="true">»</span>
                                                    <span className="sr-only">Next</span>
                                                </button>
                                            }

                                        </li>
                                    </ul>
                                </nav>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

export default BannerList