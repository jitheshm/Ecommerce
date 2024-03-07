import React from 'react'
import { useState, useEffect } from 'react'
import instance from '../../axios'
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
function VarientList() {
    const [varients, setVarients] = useState([])
    const [search, setSearch] = useState('')
    const { id } = useParams()
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    useEffect(() => {
        instance.get(`/admin/getallvarient/${id}?page=${page}`, {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res.data.data);
            setVarients(res.data.data)
            setTotalPages(res.data.totalPages);
        })
    }, [])

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


    const handleDelete = (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
                actions: 'action-btn'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: "Are you sure to delete it?",
            icon: 'warning',
            background: '#191C24',
            showCancelButton: true,
            confirmButtonText: "Confirm",
            // customClass: {
            //     title: 'text-light',

            // }

        }).then((result) => {
            if (result.isConfirmed) {
                instance.delete(`/admin/deletevarient?id=${id}`, {
                    headers: {
                        Authorization: Cookies.get('token')
                    }
                }).then((res) => {
                    console.log(res);
                    setVarients(varients.filter((varientObj) => varientObj._id !== id))
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
                <div className="col-lg-11 mt-5 m-auto grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className='row align-items-center mb-4'>
                                <h4 className="card-title col-4 mt-4">All Varients</h4>
                                <form className="nav-link  d-none d-lg-flex search col-6">
                                    <input type="text" className="form-control" placeholder="Search products" style={{ color: "white" }} onChange={handleSearch} />
                                </form>
                            </div>


                            <div className="table-responsive col-12">
                                <table className="table" style={{ tableLayout: 'fixed' }}>
                                    <thead>
                                        <tr>
                                            <th>VID</th>
                                            <th>Stock</th>
                                            <th>Actual price</th>
                                            <th>Sale Price</th>
                                            <th>Color</th>

                                            <th style={{ textAlign: "center", width: "250px" }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {
                                            varients.map((varientObj) => {
                                                if (varientObj.color.startsWith(search) || search === "") {
                                                    return (
                                                        // eslint-disable-next-line react/jsx-key
                                                        <tr >
                                                            <td style={{ color: "#6c7293" }}>{varientObj._id}</td>
                                                            <td style={{ color: "#6c7293" }}>{varientObj.stock}</td>
                                                            <td style={{ color: "#6c7293" }}>{varientObj.actualPrice}</td>
                                                            <td style={{ color: "#6c7293" }}>{varientObj.salePrice}</td>
                                                            <td style={{ color: "#6c7293" }}>{varientObj.color}</td>

                                                            <td className='d-flex gap-3 justify-content-center' style={{ width: "250px" }}>
                                                                <Link to={`/editvarient/${varientObj._id}`} className='btn btn-outline-warning'>Edit</Link>


                                                                <button className='btn btn-outline-danger' onClick={() => {
                                                                    handleDelete(varientObj._id)
                                                                }}>Delete</button>


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

export default VarientList