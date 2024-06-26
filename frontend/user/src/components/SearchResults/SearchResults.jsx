import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import instance from '../../axios'
import { useLocation } from 'react-router-dom';
import SearchCard from '../SearchCard/SearchCard';
import { useSearchParams } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
function SearchResults() {
    const { searchQuery } = useParams()

    const [searchResult, setSearchResult] = useState([])
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [values, setValues] = useState([0, null]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    console.log(searchParams);

    const sort = new URLSearchParams(location.search).get('sort')
    const order = new URLSearchParams(location.search).get('order')
    const [filter, setFilter] = useState({
        instock: false,
        minPrice: 0,
        maxPrice: Number.MAX_SAFE_INTEGER
    })

    useEffect(() => {
        console.log("searching");
        instance.get(`user/products/search/${searchQuery}`, {
            params: {
                sort,
                order,
                page,
                ...filter
            }
        }).then((res) => {
            console.log(res.data);
            setSearchResult(res.data.data)
            setTotalPages(res.data.totalPages);
        }).catch((err) => {
            console.log(err)
        })
    }, [searchQuery, filter, sort, order, page])

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

    const handleSort = (sort, order) => {
        setSearchParams({ sort: sort, order: order });
    }

    const handleFilter = (filterData) => {
        console.log(filterData);
        setFilter({ ...filter, ...filterData })
    }

    const handlePriceChange = (value) => {
        console.log(value);
        setFilter({ ...filter, minPrice: value[0], maxPrice: value[1] })
    }

    return (
        <>
            <div className=''>
                <div className='row container-fluid-md m-auto gap-2'>
                    <div className=' col-md-3 p-5 mt-5  address border '>
                        <div>
                            <h4><b>Filters</b></h4>
                        </div>
                        <hr style={{ border: "1px black solid" }} />
                        <div>
                            <h5><b>Stock</b></h5>
                            <div>
                                <input type="checkbox" id="stock" name="stock" value="inStock" onChange={() => {
                                    handleFilter({ instock: !filter.instock })
                                }} />
                                <label className='ms-3' for="stock"> In Stock</label>
                            </div>
                        </div>
                        <div className='mt-4 col-12 '>
                            <label htmlFor="customRange1" className="form-label">Price</label>
                            {/* <input type="range" className="form-range mt-3" id="customRange1" min={0} max={50000} step={1} onChange={(e) => {
                              
                            }} value={0} /> */}
                            <Slider range min={0} max={50000} value={[filter.minPrice, filter.maxPrice]} onChange={handlePriceChange} allowCross={false} step={5000} />
                            <div className='d-flex justify-content-between col-12'>
                                <div className='col-4'>
                                    <label htmlFor="customRange1" className="form-label">Min</label>
                                    <input type="text " className='col-12' value={filter.minPrice} />
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="customRange1" className="form-label">Max</label>
                                    <input type="text" className='col-12' value={filter.maxPrice > 50000 ? "50000+" : filter.maxPrice} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-8 p-5 mt-5  address border '>
                        <div>
                            <b>Showing 1 – 10 of 9,695 results "</b>

                        </div>
                        <div className="btn-group col-12 my-4">
                            <button type="button" className="btn primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ float: "none" }}>
                                Sort By
                            </button>

                            <div className="dropdown-menu">
                                <button className="dropdown-item" onClick={() => {
                                    handleSort('offerPrice', 1)
                                }}>Price --Low to High</button>
                                <button className="dropdown-item" onClick={() => {
                                    handleSort('offerPrice', -1)
                                }}>Price --High to Low</button>
                                <button className="dropdown-item" onClick={() => {
                                    handleSort('productDetails.productName', 1)
                                }}>aA to zZ</button>
                                <button className="dropdown-item" onClick={() => {
                                    handleSort('productDetails.productName', -1)
                                }}>zZ to aA</button>

                            </div>
                        </div>


                        {
                            searchResult.map((product) => {
                                return <SearchCard product={product} />
                            })
                        }
                         <div>
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination justify-content-center  mt-4 d-flex">
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
        </>
    )
}

export default SearchResults