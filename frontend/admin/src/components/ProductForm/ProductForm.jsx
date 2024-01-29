import React from 'react'

function ProductForm() {
    return (
        <>

            <form className='container-fluid mt-5 p-5 col-8 text-white'>
                {/* 2 column grid layout with text inputs for the first and last names */}
                <h3 className='mb-5 text-center'>Enter product details</h3>
                <div className="row mb-4">
                    <div className="col ">
                        <div data-mdb-input-init className="form-outline">
                            <label className="form-label" htmlFor="form6Example1">Product name</label>
                            <input type="text" id="form6Example1" className="form-control" />

                        </div>
                    </div>
                    <div className="col">
                        <div data-mdb-input-init className="form-outline">
                            <label className="form-label" htmlFor="form6Example2">Brand name</label>
                            <input type="text" id="form6Example2" className="form-control" />

                        </div>
                    </div>
                </div>
                {/* Text input */}
                <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="form6Example3">Category</label>
                    <select className="form-select" aria-label="Default select example">
                        <option selected>Select Category</option>
                        <option value={1}>One</option>
                        <option value={2}>Two</option>
                        <option value={3}>Three</option>
                    </select>


                </div>
                {/* Text input */}



                {/* Message input */}
                <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="form6Example7">Description</label>
                    <textarea className="form-control" id="form6Example7" rows={4} defaultValue={""} />

                </div>
                <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="form6Example3">Waranty</label>
                    <input type="number" id="form6Example3" className="form-control" />

                </div>
                {/* Submit button */}
                <button data-mdb-ripple-init type="button" className="btn btn-primary btn-block mb-4">Add product </button>
            </form>

        </>
    )
}

export default ProductForm