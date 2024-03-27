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


function TopSellingChart() {
    const [labels, setLabels] = useState([0])
    const [dataset1, setDataset1] = useState([0])
    const [chart, setChart] = useState({
        name: "products",
        api: "/admin/sales/topsellingproducts",
        backgroundColor: 'rgba(35, 179, 226)',
        title: "Top Selling products"
    })


    useEffect(() => {
        instance.get(chart.api, {

            headers: {
                Authorization: Cookies.get('token')
            }


        }).then((res) => {
            console.log(res.data);
            var labelsArray = res.data.data.map((obj) => {
                return obj.name
            })
            var data = res.data.data.map((obj) => {
                return obj.totalQuantity
            })
            setLabels(labelsArray)
            console.log(data);
            setDataset1(data)
        }).catch(()=>{
            console.log("error");
            setLabels([])
            setDataset1([])
        })

    }, [chart])

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
    const handleChartChange = (e) => {

        if (e.target.value === "products") {
            setChart({
                name: "products",
                api: "/admin/sales/topsellingproducts",
                backgroundColor: 'rgba(35, 179, 226)',
                title: "Top Selling products"
            })
        }
        else if (e.target.value === "categories") {
            setChart({
                name: "categories",
                api: "/admin/sales/topsellingcategories",
                backgroundColor: 'rgba(35, 179, 226)',
                title: "Top Selling Categories"
            })
        }
        else if (e.target.value === "brands") {
            setChart({
                name: "brands",
                api: "/admin/sales/topsellingbrands",
                backgroundColor: 'rgba(35, 179, 226)',
                title: "Top Selling Brands"
            })
        }

    }

    const data = {
        labels,
        datasets: [

            {
                label: 'Order Count',
                data: dataset1,
                backgroundColor: chart.backgroundColor,
                // borderColor: 'rgba(228, 228, 46, 1)',
                // borderWidth: 1,
            },

        ],
    };

    return (
        <div className='card text-center col-11' >
            <div className='pt-3 d-flex justify-content-between px-5' >
                <h4>{chart.title}</h4>
                <div>
                    <select name="" id="" onChange={handleChartChange}>
                        <option value="products">Products</option>


                        <option value="categories">Categories</option>
                        <option value="brands">Brands</option>

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

export default TopSellingChart;
