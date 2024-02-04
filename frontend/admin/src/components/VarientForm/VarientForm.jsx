import React, { useState } from 'react'
import img from '../../assets/No-Image-Placeholder.png'
import instance from '../../axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function VarientForm({ api, method, title, btnName, proId, id }) {

  const [stock, setStock] = useState(0)
  const [price, setPrice] = useState(0)
  const [cost, setCost] = useState(0)
  const [color, setColor] = useState("")
  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [image3, setImage3] = useState(null)
  const [image4, setImage4] = useState(null)
  const [imagePre1, setImagePre1] = useState(null)
  const [imagePre2, setImagePre2] = useState(null)
  const [imagePre3, setImagePre3] = useState(null)
  const [imagePre4, setImagePre4] = useState(null)
  const [stockError, setStockError] = useState(false)
  const [priceError, setPriceError] = useState(false)
  const [costError, setCostError] = useState(false)
  const [colorError, setColorError] = useState(false)
  const [imgError, setImgError] = useState(false)


  const navigate = useNavigate()


  const handleImageChange = (setImage,setImgPre ,e) => {
    setImgError(false)
    setImage(e.target.files[0]);
    let file = e.target.files[0]
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPre(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImgPre(null);
    }
  }

  

  const handleSubmit = () => {
    const formData = new FormData();
    if (color.trim() === "") {
      setColorError(true)
      return;
    } else {
      setColorError(false)
    }

    if (stock < 0 || !/^[0-9\b]+$/.test(stock)) {
      setStockError(true)
      return;
    } else {
      setStockError(false)
    }

    if (price < 0 || !/^[0-9]*\.?[0-9]+$/.test(price)) {
      setPriceError(true)
      return;
    }
    else {
      setPriceError(false)
    }

    if (cost < 0 || !/^[0-9]*\.?[0-9]+$/.test(cost)) {
      setCostError(true)
      return;
    }
    else {
      setCostError(false)
    }

    formData.append('stock', stock);
    formData.append('price', price)
    formData.append('cost', cost);
    formData.append('color', color)
    formData.append('productId', proId)
 
    if (id) {
      formData.append('id', id)
    }

    if (image1 && image2 && image3 && image4) {
      setImgError(false)
      formData.append('files', image1);
      formData.append('files', image2);
      formData.append('files', image3);
      formData.append('files', image4);

    } else {
      setImgError(true)
      return
    }
    instance.request({
      method: method,
      url: api,
      data: formData,
      headers: {
        Authorization: Cookies.get('token'),
        'content-type': 'multipart/form-data'

      }

    }).then(() => {
      console.log("success");
      navigate('/products')

    })

  }
  return (
    <>
      <div className='pt-5'>
        <div className="col-11 m-auto mt-5 grid-margin">
          <div className="card">
            <div className="card-body mt-3">
              <h4 className="card-title ">{title}</h4>
              <form className="form-sample mt-5 ">

                <div className="row mt-1">
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">Color</label>
                      <div className="col-sm-9">
                        <input type="text" className="form-control text-white" value={color} onChange={(e) => {
                          setColor(e.target.value)
                          setColorError(false)

                        }} />
                        <div style={{ height: "30px" }}>
                          {colorError && <p className='text-danger'>Color is required</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">Stock</label>
                      <div className="col-sm-9">
                        <input type="number" className="form-control text-white" value={stock} onChange={(e) => {
                          setStockError(false)
                          setStock(e.target.value)

                        }} />
                        <div style={{ height: "30px" }}>
                          {stockError && <p className='text-danger'>Stock must be a positive number or zero</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mt-1">

                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">Price</label>
                      <div className="col-sm-9">
                        <input type="number" className="form-control text-white" value={price} min={0} onChange={(e) => {
                          setPrice(e.target.value)
                          setPriceError(false)
                        }} />
                        <div style={{ height: "30px" }}>
                          {priceError && <p className='text-danger'>Price must be a positive number</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">Cost</label>
                      <div className="col-sm-9">
                        <input type="number" className="form-control text-white" value={cost} min={0} onChange={(e) => {
                          setCost(e.target.value)
                          setCostError(false)
                        }} />
                        <div style={{ height: "30px" }}>
                          {costError && <p className='text-danger'>Cost is required</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                {/* image div starting */}


                <div className='row col-8 m-auto mt-2'>
                  <div className='col-3 text-center'>
                    <div className="mb-4 d-flex justify-content-center">
                      <label htmlFor='file-1' id='file1-label' >
                        <img id="selectedImage1" src={imagePre1 ? imagePre1 : img} style={{ width: "100%", height: "150px" }} />
                      </label>
                        
                    </div>
                    <div className="d-flex justify-content-center">
                      <input id='file-1' type="file" onChange={(e)=>{
                        handleImageChange(setImage1,setImagePre1,e)
                      }} style={{ display: "none" }} />
                    </div>
                  </div>
                  <div className='col-3'>
                    <div className="mb-4 d-flex justify-content-center">
                      <label htmlFor='file-2' id='file2-label' >
                        <img id="selectedImage" src={imagePre2 ? imagePre2 : img} style={{ width: "100%", height: "150px" }} />
                      </label>
                    </div>
                    <input id='file-2' type="file" onChange={(e)=>{
                      handleImageChange(setImage2,setImagePre2,e)
                    
                    }} style={{ display: "none" }} />
                  </div>
                  <div className='col-3'>
                    <div className="mb-4 d-flex justify-content-center">
                      <label htmlFor='file-3' id='file3-label' >
                        <img id="selectedImage" src={imagePre3 ? imagePre3 : img} style={{ width: "100%", height: "150px" }} />
                      </label>
                    </div>
                    <div className="d-flex justify-content-center">
                      <input id='file-3' type="file" onChange={(e)=>{
                        handleImageChange(setImage3,setImagePre3,e)
                      
                      }} style={{ display: "none" }} />
                    </div>
                  </div>
                  <div className='col-3'>
                    <div className="mb-4 d-flex justify-content-center">
                      <label htmlFor='file-4' id='file4-label' >
                        <img id="selectedImage" src={imagePre4 ? imagePre4 : img} alt="example placeholder" style={{ width: "100%", height: "150px" }} />
                      </label>
                    </div>
                    <div className="d-flex justify-content-center">
                      <input id='file-4' type="file" onChange={(e)=>{
                        handleImageChange(setImage4,setImagePre4,e)
                      
                      
                      }} style={{ display: "none" }} />
                    </div>
                  </div>
                </div>
                {imgError && <p className='text-danger text-center'>All images are required</p>}


                <button type='button' className='btn-inverse-success mt-4' onClick={handleSubmit}>{btnName}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default VarientForm