/* eslint-disable react/prop-types */
import React from 'react'
import { useState } from 'react'
import instance from '../../axios'
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CropImage from '../CropImage/CropImage';
import img from '../../assets/No-Image-Placeholder.png'
import Resizer from "react-image-file-resizer";
import { BASEURL } from "../../constants/constant.json"
function CategoryForm({ api, method, id, title, btnName }) {
    const [categoryNameError, setCategoryNameError] = useState(false)
    const [category, setCategory] = useState("")
    const navigate = useNavigate()
    const [imagePre1, setImagePre1] = useState(null)
    const [imgError, setImgError] = useState(false)
    const [cropWindow, setCropWindow] = useState(false)
    const [cropComponent, setCropComponent] = useState(null)
    const [oldImage, setOldImage] = useState([])
    const [image1, setImage1] = useState(null)

    useEffect(() => {
        if (id) {
            instance.get(`/admin/getcategory/${id}`, {
                headers: {
                    Authorization: Cookies.get('token')
                }
            }).then((res) => {
                console.log(res.data.data);
                setCategory(res.data.data.category)
                setImagePre1(BASEURL + "/" + res.data.data.imagesUrl[0])
            })
        }
    }, [])

    // const resizeFile = (file) =>
    //     new Promise((resolve) => {
    //         Resizer.imageFileResizer(
    //             file,
    //             353,
    //             416,
    //             "JPEG",
    //             100,
    //             0,
    //             (uri) => {
    //                 resolve(uri);
    //             },
    //             'blob'
    //         );
    //     });

    const handleSubmit = () => {
        const formData = new FormData();
        if (category.trim() === "") {
            setCategoryNameError(true)
            return;
        } else {
            setCategoryNameError(false)
        }

        formData.append('category', category)
        formData.append('id', id)
        if (image1) {
            formData.append('files', image1)
        } else {
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
            navigate('/category')

        })

    }

    const handleImageChange = async (setImage, setImgPre, e) => {

        setImgError(false)
        const image = e.target.files[0]
        // const image = e.target.files[0]
        //setImage(image);
        console.log("hallo");
        let file = image
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {   

                setCropComponent(<CropImage src={reader.result} setCropWindow={setCropWindow} setImage={setImage} setImgPrev={setImgPre} id={id} setOldImage={setOldImage} ratioWidth={64} ratioHeight={64}/>)
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


    const handleRemove = (setImgPrev, setImg) => {


        setImg(null)
        setImgPrev(null)
    }
    return (
        <>
            {
                cropWindow ?
                    cropComponent
                    :
                    <div className='pt-5'>
                        <div className="col-8 m-auto mt-5 grid-margin">
                            <div className="card">
                                <div className="card-body mt-3">
                                    <h4 className="card-title ">{title}</h4>
                                    <form className="form-sample mt-5 ">

                                        <div className="row mt-1">
                                            <div className="col-md-6">
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-md-6 col-form-label">Category Name</label>
                                                    <div className="col-sm-6">
                                                        <input type="text" className="form-control text-white" value={category} onChange={(e) => {
                                                            setCategoryNameError(false)
                                                            setCategory(e.target.value)
                                                        }} />
                                                        <div style={{ height: "30px" }}>
                                                            {categoryNameError && <p className='text-danger'>Category is required</p>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-12 text-center'>
                                                    <div className="mb-4 d-flex justify-content-center">
                                                        <div className='imageContainer'>
                                                            <label htmlFor='file-1' id='file1-label' className='imageLabel' >
                                                                <img id="selectedImage1" src={imagePre1 ? imagePre1 : img} style={{ width: "100%", height: "58px" }} />
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
                                            </div>

                                        </div>


                                        <button type='button' className='btn-inverse-success mt-4' onClick={handleSubmit}>{btnName}</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>}


        </>
    )
}

export default CategoryForm