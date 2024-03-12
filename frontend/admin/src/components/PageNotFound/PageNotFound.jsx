import React from 'react'
import './PageNotFound.css'
import { Link } from 'react-router-dom'
function PageNotFound() {
    return (
        <section className='text-center m-auto'>
            <h1>4<span><i className="fas fa-ghost" /></span>4</h1>
            <h2>Error: 404 page not found</h2>
            <p>Sorry, the page you're looking for cannot be accessed</p>
        </section>

    )
}

export default PageNotFound