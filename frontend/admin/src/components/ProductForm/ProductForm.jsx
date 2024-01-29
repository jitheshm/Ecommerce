/* eslint-disable react/prop-types */
import React from 'react'
function ProductForm({productName, setProductName, brand, 
    setBrand, category, setCategory, aboutProduct, setAboutProduct, 
    isListed, setIsListed, waranty, setWaranty, availableCategory, 
     productNameError, brandError, categoryError, aboutError, handleSubmit}) {
    

    return (
        <>

            <form className='container-fluid mt-5 p-5 col-8 text-white'>
                {/* 2 column grid layout with text inputs for the first and last names */}
                <h3 className='mb-5 text-center'>Enter product details</h3>
                <div className="row mb-4">
                    <div className="col ">
                        <div data-mdb-input-init className="form-outline">
                            <label className="form-label" htmlFor="form6Example1">Product name</label>
                            {productNameError && <p style={{ color: "red" }}>please enter product name</p>}
                            <input type="text" id="form6Example1" className="form-control" value={productName} onChange={(e) => {
                                setProductName(e.target.value)
                            }} />

                        </div>
                    </div>
                    <div className="col">
                        <div data-mdb-input-init className="form-outline">
                            <label className="form-label" htmlFor="form6Example2">Brand name</label>
                            {brandError && <p style={{ color: "red" }}>please enter brand name</p>}
                            <input type="text" id="form6Example2" className="form-control" value={brand} onChange={(e) => {
                                setBrand(e.target.value)
                            }} />

                        </div>
                    </div>
                </div>
                {/* Text input */}
                <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="form6Example3">Category</label>
                    {categoryError && <p style={{ color: "red" }}>please select category</p>}
                    <select className="form-select" aria-label="Default select example" value={category} onChange={(e) => {
                        setCategory(e.target.value)
                    }}>
                        <option value="" selected>Select Category</option>
                        {
                            availableCategory.map((category) => {
                                return (
                                    <option value={category._id}>{category.category}</option>
                                )

                            })
                        }



                    </select>


                </div>
                {/* Text input */}



                {/* Message input */}
                <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="form6Example7">Description</label>
                    {aboutError && <p style={{ color: "red" }}>please enter description</p>}
                    <textarea className="form-control" id="form6Example7" rows={4} value={aboutProduct} onChange={(e) => {
                        setAboutProduct(e.target.value)
                    }} />

                </div>
                <select className="form-select mb-3" aria-label="Default select example" value={isListed} onChange={(e) => {
                    setIsListed(e.target.value)
                }}>

                    <option selected value={true}>Listed</option>
                    <option value={false}>Not Listed</option>

                </select>

                <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="form6Example3">Waranty</label>
                    <input type="number" id="form6Example3" className="form-control" value={waranty} onChange={(e) => {
                        setWaranty(e.target.value)
                    }} />

                </div>
                {/* Submit button */}
                <button data-mdb-ripple-init type="button" className="btn btn-primary btn-block mb-4" onClick={handleSubmit}>Add product </button>
            </form>

        </>
    )
}

export default ProductForm