/* eslint-disable react/prop-types */
import React from 'react'
import { useState } from 'react'
import instance from '../../axios'
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import generateUniqueId from '../../utils/generateUniqueId';

const schema = yup
    .object({
        couponId: yup.string().trim().required(),
        expireDate: yup.date().required(),
        maxUsers: yup.number().integer().positive().required(),
        discountType: yup.string().trim().required(),
        discount: yup.number().integer().positive().required(),
        minPurchase: yup.number().integer().positive().required(),
        description: yup.string().trim().required()
    })
    .required()
function CouponForm({ api, method, id, title, btnName }) {
    const {
        register,
        handleSubmit,
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

    // useEffect(() => {
    //     if (id) {
    //         instance.get(`/admin/getcoupon/${id}`, {
    //             headers: {
    //                 Authorization: Cookies.get('token')
    //             }
    //         }).then((res) => {
    //             console.log(res.data.data);
    //             setCoupon(res.data.data.coupon)
    //         })
    //     }
    // }, [])

    const generateId = () => {
        const id = generateUniqueId()
        setValue('couponId', id)
    }
    const onSubmit = (data) => {

        console.log(data);
        instance.request({
            method: method,
            url: api,
            data: {
                id,
                data

            },
            headers: {
                Authorization: Cookies.get('token')
            }

        }).then(() => {
            console.log("success");
            navigate('/coupon')

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
                                            <div className='row col-12'>
                                                <label className="col-sm-3 col-md-3 col-form-label">Coupon Id</label>
                                                <div className="col-sm-6">
                                                    <input type="text" className="form-control text-white"  {...register("couponId")} readOnly />
                                                    <div style={{ height: "30px" }}>
                                                        <p className='text-danger'>{errors.couponId ? 'Invalid coupon id' : ""}</p>
                                                    </div>
                                                </div>
                                                <div className='col-3'>
                                                    <button type='button' className='btn-inverse-primary' onClick={generateId}>Generate New Id</button>
                                                </div>
                                            </div>

                                            <div className='col-6 row'>
                                                <label className="col-sm-3 col-md-6 col-form-label">Expire Date</label>
                                                <div className="col-sm-6">
                                                    <input type="date" className="form-control text-white"  {...register("expireDate")} />
                                                    <div style={{ height: "30px" }}>
                                                        <p className='text-danger'>{errors.expireDate ? 'Invalid expire date ' : ""}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='col-6 row'>
                                                <label className="col-sm-3 col-md-6 col-form-label">Maximum Users</label>
                                                <div className="col-sm-6">
                                                    <input type="number" className="form-control text-white" {...register("maxUsers")} />
                                                    <div style={{ height: "30px" }}>
                                                        <p className='text-danger'>{errors.maxUsers ? 'Invalid users count ' : ""}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='col-6 row'>
                                                <label className="col-sm-3 col-md-6 col-form-label">Discount Type</label>
                                                <div className="col-sm-6">
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
                                                <label className="col-sm-3 col-md-6 col-form-label">Discount</label>
                                                <div className="col-sm-6">
                                                    <input type="number" className="form-control text-white"  {...register("discount")} />
                                                    <div style={{ height: "30px" }}>
                                                        <p className='text-danger'>{errors.discount ? 'Invalid discount' : ''}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='col-6 row'>
                                                <label className="col-sm-3 col-md-6 col-form-label">Minimum purchase</label>
                                                <div className="col-sm-6">
                                                    <input type="number" className="form-control text-white"  {...register("minPurchase")} />
                                                    <div style={{ height: "30px" }}>
                                                        <p className='text-danger'>{errors.discount ? 'Invalid discount' : ''}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='col-12 row'>
                                                <label className="col-sm-3 col-md-6 col-form-label">Description</label>
                                                <div className="col-sm-12">
                                                    <textarea type="text" className="form-control text-white" style={{ height: "85px" }} {...register("description")} />
                                                    <div style={{ height: "30px" }}>
                                                        <p className='text-danger'>{errors.description ? 'Invalid description' : ''}</p>
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

export default CouponForm