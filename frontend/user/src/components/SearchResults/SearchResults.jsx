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


    useEffect(() => {

        instance.get(`user/product/search/${searchQuery}?sort=${sort}&&order=${order}`).then((res) => {
            console.log(res.data);
            setSearchResult(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [searchParams])

    const handleSort = (sort, order) => {
        setSearchParams({ sort: sort, order: order });
    }

    return (
        <>
            <div className=''>
                <div className='row container-fluid m-auto gap-2'>
                    <div className=' col-md-2 p-5 mt-5  address border '>

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