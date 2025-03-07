import React, { useEffect, useState } from "react";
import { getPriceRangeData } from "../api";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "./charts.css"; 

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const getMonthName = (monthNumber) => {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[monthNumber - 1] || "Unknown";
};

const BarChart = ({ selectedMonth }) => {
    const [priceData, setPriceData] = useState({});

    useEffect(() => {
        if (selectedMonth) {
            getPriceRangeData(selectedMonth)
                .then(data => setPriceData(data))
                .catch(error => console.error("Error fetching price range data:", error));
        }
    }, [selectedMonth]);

    const monthName = getMonthName(parseInt(selectedMonth));

    const data = {
        labels: Object.keys(priceData),
        datasets: [{
            label: "Number of Items",
            data: Object.values(priceData),
            backgroundColor: "rgba(75, 192, 192, 0.6)"
        }]
    };

    const maxDataValue = Math.max(...Object.values(priceData), 10);
    const yMax = Math.ceil(maxDataValue / 10) * 10;

    const options = {
        responsive: true,
        scales: {
            x: {
                grid:{
                    display: false
                },
                ticks: {
                    autoSkip: false,
                    maxRotation: 45,
                    minRotation: 45
                }
            },
            y: {
                ticks: {
                    callback: (value) => Math.round(value),
                    stepSize: 2,
                    beginAtZero: true
                },
                suggestedMax: yMax
            }
        },
        plugins: {
            legend: {
                position: "top"
            },
            title: {
                display: true,
                text: `Bar Chart Stats - ${monthName}`,
                font: {
                    size: 18,
                    weight: "bold"
                },
                padding: {
                    top: 10,
                    bottom: 10
                }
            }
        }
    };

    return (
        <div className="chart-container">
            {Object.keys(priceData).length > 0 ? <Bar data={data} options={options} /> : <p>Loading...</p>}
        </div>
    );
};

export default BarChart;
