import React from 'react';

import { useState, useEffect } from 'react';
import instance from '../../axios';
import Cookies from 'js-cookie';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';

  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  

function PaymentAnalysis() {
    const [labels, setLabels] = useState([0])
    const [dataset1, setDataset1] = useState([0])

    const [filter, setFilter] = useState("daily")
    useEffect(() => {
        instance.get(`/admin/sales-overview/${filter}`, {

            headers: {
                Authorization: Cookies.get('token')
            }


        }).then((res) => {
            console.log(res.data);
            var lab = res.data.data.map((obj) => {
                return obj._id
            })
            var data = res.data.data.map((obj) => {
                return obj.productsCount
            })
            setLabels((prev) => {
                return [...lab]
            })
            console.log(data);
            setDataset1((prev) => {
                return [...data]
            })
        })

    }, [filter])
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            x: {
                grid: {
                    display: false, // Removes the x-axis gridlines
                },
            },
            y: {
                grid: {
                    display: false, // Removes the y-axis gridlines
                },
            },
        },
    };

    //const labels = ;

    const data = {
        labels,
        datasets: [

            {
                label: 'COD',
                data: dataset1,
                backgroundColor: 'rgba(35, 179, 226)',
                // borderColor: 'rgba(228, 228, 46, 1)',
                // borderWidth: 1,
            },
            {
                label: 'UPI',
                data: dataset1,
                backgroundColor: 'rgba(238, 109, 20 )',
                // borderColor: 'rgba(228, 228, 46, 1)',
                // borderWidth: 1,
            }
        ],
    };

    return (
        <div className='card text-center col-11' >
            <div className='pt-3 d-flex justify-content-between px-5' >
                <h4>COD vs UPI</h4>
                <div>
                    <select name="" id="" onChange={(e) => {
                        setFilter(e.target.value)
                    }}>
                        <option value="daily">Daily</option>


                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">yearly</option>
                    </select>
                </div>
            </div>
            <div className='px-3  ' style={{ height: "290px" }}>
                <Bar
                    options={options}
                    data={data}

                />
            </div>
        </div>
    );
}

export default PaymentAnalysis;
