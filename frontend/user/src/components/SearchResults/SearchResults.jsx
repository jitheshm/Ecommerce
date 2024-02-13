import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import instance from '../../axios'
import { useLocation } from 'react-router-dom';
import SearchCard from '../SearchCard/SearchCard';
import { useSearchParams } from 'react-router-dom';
function SearchResults() {
    const { searchQuery } = useParams()

    const [searchResult, setSearchResult] = useState([])
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    console.log(searchParams);

    const sort = new URLSearchParams(location.search).get('sort')
    const order = new URLSearchParams(location.search).get('order')
    const [filter, setFilter] = useState({
        instock: false
    })

    useEffect(() => {   
        console.log("searching");
        instance.get(`user/product/search/${searchQuery}`, {
            params: {
                sort,
                order,
                ...filter
            }
        }).then((res) => {
            console.log(res.data);
            setSearchResult(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [searchParams,filter])

    const handleSort = (sort, order) => {
        setSearchParams({ sort: sort, order: order });
    }

    const handleFilter= (filterData) => {
        console.log(filterData);
        setFilter({...filter, ...filterData})
    }

    return (
        <>
            <div className=''>
                <div className='row container-fluid m-auto gap-2'>
                    <div className=' col-md-2 p-5 mt-5  address border '>
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
                    </div>
                    <div className='col-md-9 p-5 mt-5  address border '>
                        <div>
                            <b>Showing 1 – 24 of 9,695 results for "mobiles"</b>

                        </div>
                        <div className="btn-group col-12 mt-4">
                            <button type="button" className="btn primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Sort By
                            </button>

                            <div className="dropdown-menu">
                                <button className="dropdown-item" onClick={() => {
                                    handleSort('salePrice', 1)
                                }}>Price --Low to High</button>
                                <button className="dropdown-item" onClick={() => {
                                    handleSort('salePrice', -1)
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


                    </div>

                </div>
            </div>
        </>
    )
}

export default SearchResults