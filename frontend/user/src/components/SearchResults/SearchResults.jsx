import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import instance from '../../axios'
import { useLocation } from 'react-router-dom';
import SearchCard from '../SearchCard/SearchCard';

function SearchResults() {
    const { searchQuery } = useParams()

    const [searchResult, setSearchResult] = useState([])
    const location = useLocation();
    const sort = new URLSearchParams(location.search).get('sort')
    const order = new URLSearchParams(location.search).get('order')


    useEffect(() => {
        instance.get(`user/product/search/${searchQuery}?sort=${sort}&&order=${order}`).then((res) => {
            console.log(res.data);
            setSearchResult(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [location.search])

    return (
        <>
            <div className=''>
                <div className='row container-fluid m-auto gap-2'>
                    <div className=' col-md-2 p-5 mt-5  address border '>

                    </div>
                    <div className='col-md-9 p-5 mt-5  address border '>
                        <b>Showing 1 – 24 of 9,695 results for "mobiles"</b>

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