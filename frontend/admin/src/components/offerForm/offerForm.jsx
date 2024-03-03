/* eslint-disable react/prop-types */
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

import "react-datepicker/dist/react-datepicker.css";

const schema = yup
    .object({
        offerTitle: yup.string().trim().required(),
        startDate: yup.date().required(),
        endDate: yup.date().required(),
        offerDetails: yup.string().trim().required(),
        discountType: yup.string().trim().required(),
        discount: yup.number().integer().positive().required(),
        offerType: yup.string().trim().required(),
        applicables: yup.string().trim().required()
    })
    .required()


function OfferForm({ api, method, id, title, btnName }) {
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
        setValue
    } = useForm({
        resolver: yupResolver(schema),

        defaultValues: {
            discountType: 'percentage'
        }
    }
    )
    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            instance.get(`/admin/getoffer/${id}`, {
                headers: {
                    Authorization: Cookies.get('token')
                }
            }).then((res) => {
                console.log(res.data.data);
                setValue('offerTitle', res.data.data.offerTitle)
                setValue('startDate', new Date(res.data.data.startDate))
                setValue('endDate', new Date(res.data.data.endDate))
                setValue('offerDetails', res.data.data.offerDetails)
                setValue('discountType', res.data.data.discountType)
                setValue('discount', res.data.data.discount)
                setValue('offerType', res.data.data.offerType)
                setValue('applicables', res.data.data.applicables[0])
            })
        }
    }, [])


    const onSubmit = (data) => {

        console.log(data);
        instance.request({
            method: method,
            url: api,
            data: {
                id,
                ...data

            },
            headers: {
                Authorization: Cookies.get('token')
            }

        }).then(() => {
            console.log("success");
            navigate('/offers')

        })

    }
    return (
        <>
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
                                                <label className="col-sm-3 col-md-4 col-form-label">Offer Title</label>
                                                <div className="col-sm-7">
                                                    <input type="text" className="form-control text-white"  {...register("offerTitle")} />
                                                    <div style={{ height: "30px" }}>
                                                        <p className='text-danger'>{errors.offerTitle ? 'Invalid offer Title' : ""}</p>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className='col-6 row'>
                                                <label className="col-sm-3 col-md-4 col-form-label">Offer Type</label>
                                                <div className="col-sm-7">
                                                    <select {...register("offerType")} className="form-control text-white">
                                                        <option value="category">Category Offer</option>
                                                        <option value="product">Product Offer</option>

                                                    </select>
                                                    <div style={{ height: "30px" }}>
                                                        <p className='text-danger'>{errors.offerType ? 'Invalid offer type ' : ""}</p>
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

                                            <div className='col-12 row'>
                                                <label className="col-sm-3 col-md-6 col-form-label">Offer Details</label>
                                                <div className="col-sm-12">
                                                    <textarea type="text" className="form-control text-white" style={{ height: "85px" }} {...register("offerDetails")} />
                                                    <div style={{ height: "30px" }}>
                                                        <p className='text-danger'>{errors.offerDetails ? 'Invalid details' : ''}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='col-6 row'>
                                                <label className="col-sm-3 col-md-5 col-form-label">Discount Type</label>
                                                <div className="col-sm-7">
                                                    <select {...register("discountType")} className="form-control text-white">
                                                        <option value="amount">Amount</option>
                                                        <option value="percentage">Percentage</option>

                                                    </select>
                                                    <div style={{ height: "30px" }}>
                                                        <p className='text-danger'>{errors.discountType ? 'Invalid discount type ' : ""}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='col-6 row'>
                                                <label className="col-sm-3 col-md-4 col-form-label">Discount</label>
                                                <div className="col-sm-7">
                                                    <input type="number" className="form-control text-white"  {...register("discount")} />
                                                    <div style={{ height: "30px" }}>
                                                        <p className='text-danger'>{errors.discount ? 'Invalid discount' : ''}</p>
                                                    </div>
                                                </div>
                                            </div>   



                                            <div className='row col-6'>
                                                <label className="col-sm-3 col-md-5 col-form-label">applicables</label>
                                                <div className="col-sm-7">
                                                    <input type="text" className="form-control text-white"  {...register("applicables")} />
                                                    <div style={{ height: "30px" }}>
                                                        <p className='text-danger'>{errors.applicables ? 'Invalid offer applicable' : ""}</p>
                                                    </div>
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


        </>
    )
}

export default OfferForm