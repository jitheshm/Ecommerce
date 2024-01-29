import React from 'react'
import img from '../../assets/No-Image-Placeholder.png'
import instance from '../../axios';
import Cookies from 'js-cookie';

function VarientForm({ stock, setStock, price, setPrice, cost, setCost, color, setColor,
  image1, setImage1, image2, setImage2, image3, setImage3, image4, setImage4, method, api,
  imagePre1, setImagePre1, imagePre2, setImagePre2, imagePre3, setImagePre3, imagePre4, setImagePre4, proId,id}) {
  
    const handleImage1Change = (e) => {
    setImage1(e.target.files[0]);
    let file = e.target.files[0]
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePre1(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePre1(null);
    }
  }

  const handleImage2Change = (e) => {
    console.log("njj");
    setImage2(e.target.files[0]);
    let file = e.target.files[0]
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePre2(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePre2(null);
    }
  }

  const handleImage3Change = (e) => {
    setImage3(e.target.files[0]);
    let file = e.target.files[0]
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePre3(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePre3(null);
    }
  }

  const handleImage4Change = (e) => {
    setImage4(e.target.files[0]);
    let file = e.target.files[0]
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePre4(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePre4(null);
    }
  }

  const handleSubmit=()=>{
    const formData = new FormData();
    if (color.trim() === "") {
      
      return;
    }
    formData.append('stock', stock);
    formData.append('price',price)
    formData.append('cost', cost);
    formData.append('color',color)
    if(proId){
      formData.append('productId',proId)
    }
    if(id){
      formData.append('id',id)
    }
    if(image1 && image2&&image3&& image4){
        formData.append('files', image1);
        formData.append('files', image2);
        formData.append('files', image3);
        formData.append('files', image4);

    }else{
      return
    }
    instance.request({
      method:method,
      url:api,
      data:formData,
      headers:{
          Authorization: Cookies.get('token'),
          'content-type': 'multipart/form-data'

      }
  
  }).then(() => {
      console.log("success");

  })

  }
  return (
    <>
      <form className='container-fluid mt-5 p-5 col-8 text-white'>
        {/* 2 column grid layout with text inputs for the first and last names */}
        <h3 className='mb-5 text-center'>Enter Varient details</h3>
        <div className="row mb-4">
          <div className="col ">
            <div data-mdb-input-init className="form-outline">
              <label className="form-label" htmlFor="form6Example1">Stock</label>
              {"" && <p style={{ color: "red" }}>please enter Stock</p>}
              <input type="number" id="form6Example1" className="form-control" value={stock} onChange={(e) => {
                setStock(e.target.value)
              }} />

            </div>
          </div>
          <div className="col">
            <div data-mdb-input-init className="form-outline">
              <label className="form-label" htmlFor="form6Example2">Price</label>
              {"" && <p style={{ color: "red" }}>please enter price</p>}
              <input type="number" id="form6Example2" className="form-control" value={price} onChange={(e) => {
                setPrice(e.target.value)
              }} />

            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col ">
            <div data-mdb-input-init className="form-outline">
              <label className="form-label" htmlFor="form6Example1">Cost</label>
              {"" && <p style={{ color: "red" }}>please enter cost</p>}
              <input type="number" id="form6Example1" className="form-control" value={cost} onChange={(e) => {
                setCost(e.target.value)
              }} />

            </div>
          </div>
          <div className="col">
            <div data-mdb-input-init className="form-outline">
              <label className="form-label" htmlFor="form6Example2">Color</label>
              {"" && <p style={{ color: "red" }}>please enter color</p>}
              <input type="text" id="form6Example2" className="form-control" value={color} onChange={(e) => {
                setColor(e.target.value)
              }} />

            </div>
          </div>
        </div>


        <div className='row mt-5'>
          <div className='col-3'>
            <div className="mb-4 d-flex justify-content-center">
              <img id="selectedImage1" src={imagePre1 ? imagePre1 : img}  style={{ width: "100%", height: "150px" }} />
            </div>
            <div className="d-flex justify-content-center">
            <input type="file" onChange={handleImage1Change}/>
            </div>
          </div>
          <div className='col-3'>
            <div className="mb-4 d-flex justify-content-center">
              <img id="selectedImage" src={imagePre2 ? imagePre2 : img} style={{ width: "100%", height: "150px" }} />
            </div>
            <input type="file" onChange={handleImage2Change}/>
          </div>
          <div className='col-3'>
            <div className="mb-4 d-flex justify-content-center">
              <img id="selectedImage" src={imagePre3 ? imagePre3 : img} style={{ width: "100%", height: "150px" }} />
            </div>
            <div className="d-flex justify-content-center">
              <input type="file" onChange={handleImage3Change}/>
            </div> 
          </div>
          <div className='col-3'>
            <div className="mb-4 d-flex justify-content-center">
              <img id="selectedImage" src={imagePre4 ? imagePre4 : img} alt="example placeholder" style={{ width: "100%", height: "150px" }} />
            </div>
            <div className="d-flex justify-content-center">
            <input type="file" onChange={handleImage4Change}/>
            </div>
          </div>
        </div>











        {/* Submit button */}
        <button data-mdb-ripple-init type="button" className="btn btn-primary btn-block my-5" onClick={handleSubmit}>Submit</button>
      </form>
    </>
  )
}

export default VarientForm