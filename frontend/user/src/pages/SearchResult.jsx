import React from 'react'
import Header from '../components/Header/Header'
import SearchResults from '../components/SearchResults/SearchResults'
import MobileNavbar from '../components/mobile/Navbar'
function SearchResult() {
    return (
        <>
            <Header />
            <SearchResults />
            <MobileNavbar />
        </>
    )
}

export default SearchResult