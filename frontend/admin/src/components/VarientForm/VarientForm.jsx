import React, { useEffect, useState } from 'react'
import img from '../../assets/No-Image-Placeholder.png'
import instance from '../../axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { BASEURL } from "../../constants/constant.json"

import CropImage from '../CropImage/CropImage';

function VarientForm({ api, method, title, btnName, proId, id }) {

  const [stock, setStock] = useState(0)
  const [actualPrice, setActualPrice] = useState(0)
  const [salePrice, setSalePrice] = useState(0)
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
  const [actualPriceError, setActualPriceError] = useState(false)
  const [salePriceError, setSalePriceError] = useState(false)
  const [colorError, setColorError] = useState(false)
  const [imgError, setImgError] = useState(false)
  const [oldImage, setOldImage] = useState([])
  const [cropWindow, setCropWindow] = useState(false)
  const [cropComponent, setCropComponent] = useState(null)
  const navigate = useNavigate()


  

  useEffect(() => {
    if (id) {
      instance.get(`/admin/editvarient/${id}`, {
        headers: {
          Authorization: Cookies.get('token')
        }
      }).then((res) => {
        console.log(res.data.data);
        setStock(res.data.data.stock)
        setActualPrice(res.data.data.actualPrice)
        setSalePrice(res.data.data.salePrice)
        setColor(res.data.data.color)
        const images = res.data.data.imagesUrl
        images[0] ? setImagePre1(BASEURL + "/" + images[0]) : null
        images[1] ? setImagePre2(BASEURL + "/" + images[1]) : null
        images[2] ? setImagePre3(BASEURL + "/" + images[2]) : null
        images[3] ? setImagePre4(BASEURL + "/" + images[3]) : null
      })
    }
  }, [])


  const handleImageChange = async (setImage, setImgPre, e) => {

    setImgError(false)
    //const image = await resizeFile(e.target.files[0]);
    const image = e.target.files[0]
    //setImage(image);
    console.log("hallo");
    let file = image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {

        setCropComponent(<CropImage src={reader.result} setCropWindow={setCropWindow} setImage={setImage} setImgPrev={setImgPre} id={id} setOldImage={setOldImage} />)
        setCropWindow(true)
        // setImgPre((prev) => {
        //   if (id && prev) {
        //     console.log("iam here");
        //     let newUrl = prev.replace(new RegExp('^' + `${BASEURL}/`), '');
        //     console.log(newUrl);
        //     setOldImage((prev) => {
        //       return [...prev, newUrl]
        //     })
        //     console.log(oldImage);
        //   }
        //   return reader.result
        // }
        //);
      };
      reader.readAsDataURL(file);
    } else {
      console.log("hai");
      setImgPre(null);
    }
  }


  const handleRemove = (imgPrev, setImgPrev, img, setImg) => {

    if (id && imgPrev && !img) {
      let newUrl = imgPrev.replace(new RegExp('^' + `${BASEURL}/`), '');
      console.log(newUrl);
      setOldImage((prev) => {
        return [...prev, newUrl]
      })
    }
    setImg(null)
    setImgPrev(null)
  }


  const handleSubmit = () => {
    //console.log(oldImage);
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

    if (actualPrice < 0 || !/^[0-9]*\.?[0-9]+$/.test(actualPrice)) {
      setActualPriceError(true)
      return;
    }
    else {
      setActualPriceError(false)
    }

    if (salePrice < 0 || !/^[0-9]*\.?[0-9]+$/.test(salePrice)) {
      setSalePriceError(true)
      return;
    }
    else {
      setSalePriceError(false)
    }

    formData.append('stock', stock);
    formData.append('actualPrice', actualPrice)
    formData.append('salePrice', salePrice);
    formData.append('color', color)
    !id ? formData.append('productId', proId) : ""

    if (id) {
      formData.append('id', id)
      oldImage.length > 0 ? formData.append('oldImageUrl', JSON.stringify(oldImage)) : ""
    }



    image1 ? formData.append('files', image1) : console.log("image1");
    image2 ? formData.append('files', image2) : console.log("image2");
    image3 ? formData.append('files', image3) : console.log("image3");
    image4 ? formData.append('files', image4) : console.log("image4");

    if (!image1 && !image2 && !image3 && !image4 && !id) {
      setImgError(true)
      return;
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
      {
        cropWindow ?
          cropComponent
          :
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
                          <label className="col-sm-3 col-form-label">Actual Price</label>
                          <div className="col-sm-9">
                            <input type="number" className="form-control text-white" value={actualPrice} min={0} onChange={(e) => {
                              setActualPrice(e.target.value)
                              setActualPriceError(false)
                            }} />
                            <div style={{ height: "30px" }}>
                              {actualPriceError && <p className='text-danger'>Actual Price must be a positive number</p>}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">Sale Price</label>
                          <div className="col-sm-9">
                            <input type="number" className="form-control text-white" value={salePrice} min={0} onChange={(e) => {
                              setSalePrice(e.target.value)
                              setSalePriceError(false)
                            }} />
                            <div style={{ height: "30px" }}>
                              {salePriceError && <p className='text-danger'>sale price is required</p>}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>


                    {/* image div starting */}


                    <div className='row col-8 m-auto mt-2'>
                      <div className='col-3 text-center'>
                        <div className="mb-4 d-flex justify-content-center">
                          <div>
                            <label htmlFor='file-1' id='file1-label'>
                              <img id="selectedImage1" src={imagePre1 ? imagePre1 : img} style={{ width: "100%", height: "150px" }} />
                            </label>
                            <div>
                              <button type='button' className='btn btn-outline-secondary mt-3' onClick={() => {
                                handleRemove(imagePre1, setImagePre1, image1, setImage1)
                              }}>Remove</button>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center">
                          <input id='file-1' type="file" onChange={(e) => {
                            handleImageChange(setImage1, setImagePre1, e)
                          }} style={{ display: "none" }} />
                        </div>
                      </div>
                      <div className='col-3'>
                        <div className="mb-4 d-flex justify-content-center">
                          <div>
                            <label htmlFor='file-2' id='file2-label' >
                              <img id="selectedImage" src={imagePre2 ? imagePre2 : img} style={{ width: "100%", height: "150px" }} />
                            </label>
                            <div className='text-center'>
                              <button type='button' className='btn btn-outline-secondary mt-3' onClick={() => {
                                handleRemove(imagePre2, setImagePre2, image2, setImage2)
                              }}>Remove</button>
                            </div>
                          </div>
                        </div>
                        <input id='file-2' type="file" onChange={(e) => {
                          handleImageChange(setImage2, setImagePre2, e)

                        }} style={{ display: "none" }} />
                      </div>
                      <div className='col-3'>
                        <div className="mb-4 d-flex justify-content-center">
                          <div>
                            <label htmlFor='file-3' id='file3-label' >
                              <img id="selectedImage" src={imagePre3 ? imagePre3 : img} style={{ width: "100%", height: "150px" }} />
                            </label>
                            <div className='text-center'>
                              <button type='button' className='btn btn-outline-secondary mt-3' onClick={() => {
                                handleRemove(imagePre3, setImagePre3, image3, setImage3)
                              }}>Remove</button>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center">
                          <input id='file-3' type="file" onChange={(e) => {
                            handleImageChange(setImage3, setImagePre3, e)

                          }} style={{ display: "none" }} />
                        </div>
                      </div>
                      <div className='col-3'>
                        <div className="mb-4 d-flex justify-content-center">
                          <div>
                            <label htmlFor='file-4' id='file4-label' >
                              <img id="selectedImage" src={imagePre4 ? imagePre4 : img} alt="example placeholder" style={{ width: "100%", height: "150px" }} />
                            </label>
                            <div className='text-center'>
                              <button type='button' className='btn btn-outline-secondary mt-3' onClick={() => {
                                handleRemove(imagePre4, setImagePre4, image4, setImage4)
                              }}>Remove</button>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center">
                          <input id='file-4' type="file" onChange={(e) => {
                            handleImageChange(setImage4, setImagePre4, e)


                          }} style={{ display: "none" }} />
                        </div>
                      </div>
                    </div>
                    {imgError && <p className='text-danger text-center'>Atleast  one image is required</p>}


                    <button type='button' className='btn-inverse-success mt-4' onClick={handleSubmit}>{btnName}</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
      }

    </>
  )
}

export default VarientForm