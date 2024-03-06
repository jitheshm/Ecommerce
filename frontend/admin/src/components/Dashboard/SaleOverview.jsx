import React from 'react';

import { useState, useEffect } from 'react';
import instance from '../../axios';
import Cookies from 'js-cookie';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
import { Line } from 'react-chartjs-2';

function SaleOverview() {
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
                return obj.revenue
            })
            setLabels((prev) => {
                return [0, ...lab]
            })
            console.log(data);
            setDataset1((prev) => {
                return [0, ...data]
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
                label: 'Revenue',
                data: dataset1,
                backgroundColor: 'rgba(228, 228, 46, 1)',
                borderColor: 'rgba(228, 228, 46, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className='card text-center col-12' >   
            <div className='pt-3 d-flex justify-content-between px-5' >
                <h4>Sales Overview</h4>
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
            <div className='px-3  ' style={{height:"230px"}}>
                <Line
                    options={options}
                    data={data}
                   
                />
            </div>
        </div>
    );
}

export default SaleOverview;
