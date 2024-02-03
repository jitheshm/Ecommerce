import React from 'react'
import logo from '../../assets/logo.png'
import avathar from '../../assets/man.png'
function Navbar() {
    return (
        <>
            
                {/* partial:partials/_navbar.html */}
                <nav className="navbar p-0 fixed-top d-flex flex-row">
                    <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
                        <a className="navbar-brand brand-logo-mini" href="index.html"><img src={logo} alt="logo" /></a>
                    </div>
                    <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
                        <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                            <span className="mdi mdi-menu" />
                        </button>

                        <ul className="navbar-nav navbar-nav-right">




                            <li className="nav-item dropdown">
                                <a className="nav-link" id="profileDropdown" href="#" data-bs-toggle="dropdown">
                                    <div className="navbar-profile">
                                        <img className="img-xs rounded-circle" src={avathar} alt />
                                        <p className="mb-0 d-none d-sm-block navbar-profile-name">ADMIN</p>
                                        <i className="mdi mdi-menu-down d-none d-sm-block" />
                                    </div>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="profileDropdown">
                                    
                                    
                                    <div className="dropdown-divider" />
                                    <a className="dropdown-item preview-item">
                                        <div className="preview-thumbnail">
                                            <div className="preview-icon bg-dark rounded-circle">
                                            <i className="fa-solid fa-arrow-right-from-bracket" />

                                            </div>
                                        </div>
                                        <div className="preview-item-content">
                                            <p className="preview-subject mb-1">Log out</p>
                                        </div>
                                    </a>
                                    
                                </div>
                            </li>
                        </ul>
                        <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                            <span className="mdi mdi-format-line-spacing" />
                        </button>
                    </div>
                </nav>
           
        </>
    )
}

export default Navbar