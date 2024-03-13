import React from 'react'
import { useState } from 'react'
import instance from '../../axios'
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import DatePicker, { registerLocale } from "react-datepicker";
import CropImage from '../CropImage/CropImage';
import img from '../../assets/No-Image-Placeholder.png'
import Resizer from "react-image-file-resizer";
import { BASEURL } from "../../constants/constant.json"

const schema = yup
    .object({
        title: yup.string().trim().required(),
        description: yup.string().trim().required(),
        startDate: yup.date().required(),
        endDate: yup.date().required(),

    })
    .required()


function BannerForm({ title, id, api, method, btnName }) {
    const [imagePre1, setImagePre1] = useState(null)
    const [imgError, setImgError] = useState(false)
    const [cropWindow, setCropWindow] = useState(false)
    const [cropComponent, setCropComponent] = useState(null)
    const [oldImage, setOldImage] = useState([])
    const [image1, setImage1] = useState(null)


    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
        setValue
    } = useForm({
        resolver: yupResolver(schema),

    }
    )
    const navigate = useNavigate()



    useEffect(() => {
        if (id) {
            instance.get(`/admin/getbanner/${id}`, {
                headers: {
                    Authorization: Cookies.get('token')
                }
            }).then((res) => {
                console.log(res.data.data);
                setValue('title', res.data.data.title)
                setValue('startDate', new Date(res.data.data.startDate))
                setValue('endDate', new Date(res.data.data.endDate))
                setValue('description', res.data.data.description)
                setImagePre1(`${BASEURL}/${res.data.data.imagesUrl[0]}`)
            })
        }
    }, [])



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

                setCropComponent(<CropImage src={reader.result} setCropWindow={setCropWindow} setImage={setImage} setImgPrev={setImgPre} id={id} setOldImage={setOldImage} ratioWidth={6} ratioHeight={1} />)
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

    const onSubmit = (data) => {

        console.log(data);
        const formData = new FormData();
        if (image1) {
            formData.append('files', image1)
        } else if ((!id && !image1) || (id && !imagePre1)) {
            setImgError(true)
            return;
        }

        if (new Date(data.startDate) > new Date(data.endDate)) {
            alert("Start date should be less than end date")
            return
        }
        formData.append('id', id)
        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('startDate', new Date(data.startDate).toISOString())
        formData.append('endDate', new Date(data.endDate).toISOString())

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
            navigate('/banners')

        })

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
                                    <form className="form-sample mt-5 " onSubmit={handleSubmit(onSubmit)}>

                                        <div className="row mt-1">
                                            <div className="col-md-12">
                                                <div className="form-group row col-12">
                                                    <div className='row col-6'>
                                                        <label className="col-sm-3 col-md-5 col-form-label">Banner Title</label>
                                                        <div className="col-sm-7">
                                                            <input type="text" className="form-control text-white"  {...register("title")} />
                                                            <div style={{ height: "30px" }}>
                                                                <p className='text-danger'>{errors.title ? 'Invalid offer Title' : ""}</p>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className='row col-12'>
                                                        <label className="col-sm-3 col-md-4 col-form-label">Description</label>
                                                        <div className="col-sm-12">
                                                            <textarea type="text" className="form-control text-white" style={{ height: "85px" }} {...register("description")} />
                                                            <div style={{ height: "30px" }}>
                                                                <p className='text-danger'>{errors.description ? 'Invalid offer Title' : ""}</p>
                                                            </div>
                                                        </div>

                                                    </div>



                                                    <div className='col-6 row'>
                                                        <label className="col-sm-3 col-md-4 col-form-label">Start Date</label>
                                                        <div className="col-md-7">
                                                            <Controller
                                                                name="startDate"
                                                                control={control}
                                                                rules={{ required: 'Date is required' }}
                                                                render={({ field, }) => (
                                                                    <DatePicker
                                                                        onChange={(date) => {
                                                                            console.log(date);
                                                                            return field.onChange(date)
                                                                        }}
                                                                        selected={field.value}
                                                                        dateFormat="MM/dd/yyyy h:mm aa"
                                                                        timeInputLabel="Time:"
                                                                        showTimeSelect
                                                                        className="form-control text-white"

                                                                    />
                                                                )}
                                                            />
                                                            <div style={{ height: "30px" }}>
                                                                <p className='text-danger'>{errors.startDate ? 'Invalid start date ' : ""}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='col-6 row'>
                                                        <label className="col-sm-3 col-md-4 col-form-label">End Date</label>
                                                        <div className="col-md-7">
                                                            <Controller
                                                                name="endDate"
                                                                control={control}
                                                                rules={{ required: 'Date is required' }}
                                                                render={({ field, }) => (
                                                                    <DatePicker
                                                                        onChange={(date) => {
                                                                            console.log(date);
                                                                            return field.onChange(date)
                                                                        }}
                                                                        selected={field.value}
                                                                        dateFormat="MM/dd/yyyy h:mm aa"
                                                                        timeInputLabel="Time:"
                                                                        showTimeSelect
                                                                        className="form-control text-white"

                                                                    />
                                                                )}
                                                            />
                                                            <div style={{ height: "30px" }}>
                                                                <p className='text-danger'>{errors.endDate ? 'Invalid end date ' : ""}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='col-12 text-center'>
                                                        <div className="mb-4 col-12 d-flex justify-content-center">
                                                            <div className='imageContainer col-12'>
                                                                <label htmlFor='file-1' id='file1-label' className='imageLabel col-12' >
                                                                    <img id="selectedImage1" src={imagePre1 ? imagePre1 : img} style={{ width: "100%", height: "100px" }} />
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

                                        </div>


                                        <button type='submit' className='btn-inverse-success mt-4' >{btnName}</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default BannerForm