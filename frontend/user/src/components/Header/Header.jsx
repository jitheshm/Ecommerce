import React, { useState, useEffect } from 'react'
import logo from '../../assets/logo.png'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../features/user/userSlice'
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import instance from '../../axios';
function Header() {
    const { verified } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const [categories, setcategories] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        instance.get('/user/categories').then((res) => {
            setcategories(res.data.data)

        })
    }, [])

    const handleSearch = () => {
        if (search === '') {
            return
        } else
            navigate(`/search/${search}`)
    }

    const handleCategoryChange = (category) => {
        navigate(`/search/${category.target.value}`)
    }
    return (
        <>
            <header style={{height:"100px"}}>
                {/* TOP HEADER */}
                <div id="top-header" className='d-none d-md-block'>
                    <div className="container">
                        <ul className="header-links pull-left ">
                            <li><a href="#"><i className="fa fa-phone" /> +021-95-51-84</a></li>
                            <li><a href="#"><i className="fa fa-envelope-o" /> email@email.com</a></li>
                            <li><a href="#"><i className="fa fa-map-marker" /> 1734 Stonecoal Road</a></li>
                        </ul>
                        <ul className="header-links pull-right ">
                            <li><a href="#"><i className="fa fa-dollar" /> USD</a></li>
                            {
                                verified ? <li><Link to={`/profile/personal`} className='btn text-white' ><i className="fa fa-user-o" /> My account</Link></li> : <li><Link to={'/login'} className='btn text-white'><i className="fa fa-user-o" /> LogIn</Link></li>
                            }


                        </ul>
                    </div>
                </div>
                {/* /TOP HEADER */}
                {/* MAIN HEADER */}
                <div id="header" className='col-12'>
                    {/* container */}
                    <div className="container-fluid">
                        {/* row */}
                        <div className="row">
                            {/* LOGO */}
                            <div className="col-md-3">
                                <div className="header-logo">
                                    <Link to={'/'} className="logo">
                                        <img src={logo} alt />
                                    </Link>
                                </div>
                            </div>
                            {/* /LOGO */}
                            {/* SEARCH BAR */}
                            <div className="col-md-6 d-none d-md-block">
                                <div className="header-search">
                                    <form>
                                        <select className="input-select" onChange={handleCategoryChange}>
                                            <option value="" selected disabled hidden>Categories</option>
                                            {
                                                categories.map((category) => {
                                                    return <option key={category.category} value={category.id}>{category.category}</option>
                                                })
                                            }
                                        </select>
                                        <input type='text' className="input" placeholder="Search here" value={search} onChange={(e) => {
                                            setSearch(e.target.value)
                                        }} />
                                        <button type='button' className="search-btn" onClick={handleSearch}>Search</button>
                                    </form>
                                </div>
                            </div>
                            {/* /SEARCH BAR */}
                            {/* ACCOUNT */}
                            <div className="col-md-3 d-none d-md-block ">
                                <div className="header-ctn d-flex">
                                    {/* Wishlist */}
                                    <div>
                                        <Link to={'/profile/wishlist'}>
                                            <i className="fa-regular fa-heart" style={{ color: '#ffffff' }} />

                                            <span>Your Wishlist</span>
                                            {/* <div className="qty">2</div>   */}
                                        </Link>

                                    </div>
                                    {/* /Wishlist */}
                                    {/* Cart */}
                                    <div>
                                        <Link to={'/cart'}>
                                            <i className="fa-solid fa-cart-shopping" style={{ color: '#ffffff' }} />
                                            <span>Your Cart</span>
                                            {/* <div className="qty">2</div> */}
                                        </Link>
                                    </div>
                                    {/* /Cart */}


                                </div>
                            </div>
                            {/* /ACCOUNT */}
                        </div>
                        {/* row */}
                    </div>
                    {/* container */}
                </div>
                {/* /MAIN HEADER */}
            </header>
            {/* /HEADER */}

        </>
    )
}

export default Header