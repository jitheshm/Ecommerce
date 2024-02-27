import React from 'react'

import { logout } from '../../features/admin/adminSlice'
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'
import avathar from '../../assets/man.png'
import Navbar from '../Navbar/Navbar';
function Sidebar() {
    const dispatch = useDispatch()
    return (
        <>
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
                <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
                    <a className="sidebar-brand brand-logo" href="index.html"><img src={logo} alt="logo" /></a>
                    <a className="sidebar-brand brand-logo-mini" href="index.html"><img src={logo} alt="logo" /></a>
                </div>
                <ul className="nav">
                    <li className="nav-item profile">
                        <div className="profile-desc">
                            <div className="profile-pic">
                                <div className="count-indicator">
                                    <img className="img-xs rounded-circle " src={avathar} alt />
                                    <span className="count bg-success" />
                                </div>
                                <div className="profile-name">
                                    <h5 className="mb-0 font-weight-normal">ADMIN</h5>

                                </div>
                            </div>


                        </div>
                    </li>
                    <li className="nav-item nav-category">
                        <span className="nav-link">Navigation</span>
                    </li>
                    <li className="nav-item menu-items">
                        <a className="nav-link" href="/">
                            <span className="menu-icon">
                                <i className="fa-solid fa-chart-line" />

                            </span>
                            <span className="menu-title">Dashboard</span>
                        </a>
                    </li>
                    <li className="nav-item menu-items">
                        <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                            <span className="menu-icon">
                                <i className="fa-solid fa-dolly" />

                            </span>
                            <span className="menu-title">Products</span>
                            <i className="menu-arrow" />
                        </a>
                        <div className="collapse" id="ui-basic">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <Link to='/products' className="nav-link" href="/">View Products</Link></li>
                                <li className="nav-item"> <Link to='/addproduct' className="nav-link">Add products</Link></li>

                            </ul>
                        </div>
                    </li>
                    <li className="nav-item menu-items">
                        <a className="nav-link" data-bs-toggle="collapse" href="#users" aria-expanded="false" aria-controls="ui-basic">
                            <span className="menu-icon">
                                <i className="fa-solid fa-users" />

                            </span>
                            <span className="menu-title">Users</span>
                        </a>
                        <div className="collapse" id="users">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <Link to='/users' className="nav-link" href="/">View Users</Link></li>


                            </ul>
                        </div>
                    </li>
                    <li className="nav-item menu-items">
                        <a className="nav-link" data-bs-toggle="collapse" href="#orders" aria-expanded="false" aria-controls="ui-basic">
                            <span className="menu-icon">
                                <i className="fa-solid fa-box-open" />

                            </span>
                            <span className="menu-title">Orders</span>
                        </a>
                        <div className="collapse" id="orders">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <Link to={'/orders'} className="nav-link" >View Orders</Link></li>
                                <li className="nav-item"> <a className="nav-link" href="/">Return Requests</a></li>

                            </ul>
                        </div>
                    </li>
                    <li className="nav-item menu-items">
                        <a className="nav-link" data-bs-toggle="collapse" href="#categories" aria-expanded="false" aria-controls="ui-basic">
                            <span className="menu-icon">
                                <i className="fa-solid fa-store" />

                            </span>
                            <span className="menu-title">Categories</span>
                        </a>
                        <div className="collapse" id="categories">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <Link to='/category' className="nav-link" >View Category</Link></li>
                                <li className="nav-item"> <Link to='/addcategory' className="nav-link" >Add Category</Link></li>

                            </ul>
                        </div>
                    </li>
                    <li className="nav-item menu-items">
                        <a className="nav-link" data-bs-toggle="collapse" href="#coupons" aria-expanded="false" aria-controls="ui-basic">
                            <span className="menu-icon">
                                <i className="fa-solid fa-ticket" />

                            </span>
                            <span className="menu-title">Coupons</span>
                        </a>
                        <div className="collapse" id="coupons">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <Link to={'/coupons'} className="nav-link" >View Coupons</Link></li>
                                <li className="nav-item"> <Link to={'/addcoupon'} className="nav-link" >Add Coupons</Link></li>

                            </ul>
                        </div>
                    </li>
                    <li className="nav-item menu-items">
                        <a className="nav-link" data-bs-toggle="collapse" href="#offers" aria-expanded="false" aria-controls="auth">
                            <span className="menu-icon">
                                <i className="fa-solid fa-gift" />

                            </span>
                            <span className="menu-title">Offers</span>
                            <i className="menu-arrow" />
                        </a>
                        <div className="collapse" id="offers">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <Link to={'/offers'} className="nav-link" >View Offers</Link></li>
                                <li className="nav-item"> <Link to={'/addoffer'} className="nav-link" >Add Offers</Link></li>

                            </ul>
                        </div>
                    </li>
                    {/* <li className="nav-item menu-items">
                        <a className="nav-link" href="http://www.bootstrapdash.com/demo/corona-free/jquery/documentation/documentation.html">
                            <span className="menu-icon">
                                <i className="mdi mdi-file-document-box" />
                            </span>
                            <span className="menu-title">Documentation</span>
                        </a>
                    </li> */}
                </ul>
            </nav>




        </>
    )
}

export default Sidebar