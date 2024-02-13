import React, { useState } from 'react'
import logo from '../../assets/logo.png' 
import { useSelector} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../features/user/userSlice'
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
function Header() {  
    const {verified}=useSelector((state)=>state.user)
    const dispatch=useDispatch()
    const [search, setSearch] = useState('')
    const navigate=useNavigate()
    const handleSearch=()=>{
        navigate(`/search/${search}`)
    }
    return (  
        <> 
            <header>
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
                                verified?<li><Link to={`/profile/personal`} className='btn text-white' ><i className="fa fa-user-o" /> My account</Link></li>: <li><Link to={'/login'} className='btn text-white'><i className="fa fa-user-o" /> LogIn</Link></li>
                            }
                           
                            
                        </ul>
                    </div>
                </div>
                {/* /TOP HEADER */}
                {/* MAIN HEADER */}
                <div id="header">
                    {/* container */}
                    <div className="container-fluid">
                        {/* row */}
                        <div className="row">
                            {/* LOGO */}
                            <div className="col-md-3">
                                <div className="header-logo">
                                    <a href="#" className="logo">
                                        <img src={logo} alt />
                                    </a>
                                </div>
                            </div>
                            {/* /LOGO */}
                            {/* SEARCH BAR */}
                            <div className="col-md-6 ">
                                <div className="header-search">
                                    <form>
                                        <select className="input-select">
                                            <option value={0}>All Categories</option>
                                            <option value={1}>Category 01</option>
                                            <option value={1}>Category 02</option>
                                        </select>
                                        <input className="input" placeholder="Search here" value={search} onChange={(e)=>{
                                            setSearch(e.target.value)
                                        }} />
                                        <button className="search-btn" onClick={handleSearch}>Search</button>
                                    </form>
                                </div>
                            </div>
                            {/* /SEARCH BAR */}
                            {/* ACCOUNT */}
                            <div className="col-md-3 ">
                                <div className="header-ctn d-flex">
                                    {/* Wishlist */}
                                    <div>
                                        <a href="#">
                                            <i className="fa-regular fa-heart" style={{ color: '#ffffff' }} />

                                            <span>Your Wishlist</span>
                                            <div className="qty">2</div>
                                        </a>

                                    </div>
                                    {/* /Wishlist */}
                                    {/* Cart */}
                                    <div>
                                        <a href="#">
                                        <i className="fa-regular fa-heart" style={{ color: '#ffffff' }} />
                                            <span>Your Wishlist</span>
                                            <div className="qty">2</div>
                                        </a>
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