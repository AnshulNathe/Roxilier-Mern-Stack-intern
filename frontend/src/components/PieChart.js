import React, { useEffect, useState } from "react";
import { getCategoryWiseData } from "../api";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./charts.css"; 

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ selectedMonth }) => {
    const [categoryData, setCategoryData] = useState({});

    useEffect(() => {
        if (selectedMonth) {
            getCategoryWiseData(selectedMonth)
                .then(data => setCategoryData(data))
                .catch(error => console.error("Error fetching category data:", error));
        }
    }, [selectedMonth]);

    const data = {
        labels: Object.keys(categoryData),
        datasets: [
            {
                label: "Category Distribution",
                data: Object.values(categoryData),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9966FF"],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false
    };

    return (
        <div className="chart-container">
            <h3 className="chart-title">Category Distribution</h3>
            {Object.keys(categoryData).length > 0 ? <Pie data={data} options={options} /> : <p>Loading...</p>}
        </div>
    );
};

export default PieChart;
