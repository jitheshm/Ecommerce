/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import './Invoice.css'
import logo from '../../assets/logo.png'
import pdfDownload from '../../assets/utils/pdfDownload'
import instance from '../../axios'
import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom'
function Invoice() {
    const [invoiceData, setInvoiceData] = useState([])
    const { orderId } = useParams()
    useEffect(() => {
        instance.get(`/user/invoice/${orderId}`, {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res.data.data);
            setInvoiceData(res.data.data)
        })
    }, [])
    return (
        <div className="invoice-1 invoice-content">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="invoice-inner clearfix">
                            <div className="invoice-info clearfix" id="invoice_wrapper">
                                <div className="invoice-headar" style={{ backgroundColor: "#5c5c5c" }}>
                                    <div className="row g-0 me-0" >
                                        <div className="col-sm-6">
                                            <div className="invoice-logo" >
                                                {/* logo started */}
                                                <div className="logo">
                                                    <img src={logo} alt="logo" />
                                                </div>
                                                {/* logo ended */}
                                            </div>
                                        </div>
                                        <div className="col-sm-6 invoice-id">
                                            <div className="info">
                                                <h1 className="color-white inv-header-1">Invoice</h1>
                                                <p className="color-white mb-1">Invoice Number <span>{invoiceData[0] ? invoiceData[0].invoiceId : ""}</span></p>
                                                <p className="color-white mb-0">Invoice Date <span>{invoiceData[0] ? new Date(invoiceData[0].date).toDateString() : ""}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="invoice-top">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="invoice-number mb-30">
                                                <h4 className="inv-title-1">Invoice To</h4>
                                                <h2 className="name mb-10">{invoiceData[0] ? invoiceData[0].user.firstName : ""}</h2>
                                                <p className="invo-addr-1">
                                                    {invoiceData[0] ? invoiceData[0].order.deliveryAddress.phone : ""} <br />

                                                    {invoiceData[0] ? invoiceData[0].order.deliveryAddress.street : ""},{invoiceData[0] ? invoiceData[0].order.deliveryAddress.city : ""},{invoiceData[0] ? invoiceData[0].order.deliveryAddress.state : ""}<br />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="invoice-number mb-30">
                                                <div className="invoice-number-inner">
                                                    <h4 className="inv-title-1">Invoice From</h4>
                                                    <h2 className="name mb-10">JITHESH M</h2>
                                                    <p className="invo-addr-1">
                                                        Electro  <br />
                                                        Electro@gmail.com <br />
                                                        KERALA <br />
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="invoice-center">
                                    <div className="table-responsive">
                                        <table className="table mb-0 table-striped invoice-table">
                                            <thead className="bg-active">

                                                <tr className="tr">
                                                    <th>No.</th>
                                                    <th className="pl0 text-start">Item</th>
                                                    <th className="text-center">Price</th>
                                                    <th className="text-center">Quantity</th>
                                                    <th className="text-end">Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    invoiceData.map((item, index) => {
                                                        return (
                                                            <tr className="tr">
                                                                <td>
                                                                    <div className="item-desc-1">
                                                                        <span>{index + 1}</span>
                                                                    </div>
                                                                </td>
                                                                <td className="pl0">{item.product.productName}</td>   
                                                                <td className="text-center">{item.order.orderedItems.totalprice/item.order.orderedItems.quantity}</td>
                                                                <td className="text-center">{item.order.orderedItems.quantity}</td>
                                                                <td className="text-end">{item.order.orderedItems.totalprice}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }


                                                <tr className="tr2">
                                                    <td />
                                                    <td />
                                                    <td />
                                                    <td className="text-center">SubTotal</td>
                                                    <td className="text-end">{invoiceData[0]?invoiceData[0].order.orderAmount:""}</td>
                                                </tr>
                                                <tr className="tr2">
                                                    <td />
                                                    <td />
                                                    <td />
                                                    <td className="text-center">Discount</td>
                                                    <td className="text-end">-{invoiceData[0]?invoiceData[0].order.discount:""}</td>   
                                                </tr>
                                                <tr className="tr2">
                                                    <td />
                                                    <td />
                                                    <td />
                                                    <td className="text-center f-w-600 active-color">Grand Total</td>
                                                    <td className="f-w-600 text-end active-color">{invoiceData[0]?invoiceData[0].order.amountPaid:""}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="invoice-bottom">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-8 col-sm-7">
                                            <div className="mb-30 dear-client">
                                                <h3 className="inv-title-1">Terms &amp; Conditions</h3>
                                                {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been typesetting industry. Lorem Ipsum</p> */}
                                            </div>
                                        </div>
                                        {/* <div className="col-lg-6 col-md-4 col-sm-5">
                                            <div className="mb-30 payment-method">
                                                <h3 className="inv-title-1">Payment Method</h3>
                                                <ul className="payment-method-list-1 text-14">
                                                    <li><strong>Method</strong> </li>
                                                   
                                                </ul>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                                <div className="invoice-contact clearfix">
                                    <div className="row g-0">
                                        <div className="col-lg-9 col-md-11 col-sm-12">
                                            <div className="contact-info">
                                                <a href="tel:+55-4XX-634-7071"><i className="fa fa-phone" /> +00 123 647 840</a>
                                                <a href="tel:info@themevessel.com"><i className="fa fa-envelope" /> info@themevessel.com</a>
                                                <a href="tel:info@themevessel.com" className="mr-0 d-none-580"><i className="fa fa-map-marker" /> 169 Teroghoria, Bangladesh</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="invoice-btn-section clearfix d-print-none">
                                {/* <a href="javascript:window.print()" className="btn btn-lg btn-print">
                                    <i className="fa fa-print" /> Print Invoice
                                </a> */}
                                <button onClick={pdfDownload} id="invoice_download_btn" className="btn btn-lg btn-download btn-theme">
                                    <i className="fa fa-download" /> Download Invoice
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Invoice