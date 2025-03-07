import React, { useEffect, useState } from "react";
import { getTransactionsByMonth } from "../api.js"; 
import "./TransactionStats.css"; 


const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];


const TransactionStats = ({ selectedMonth }) => {
    const [totalSale, setTotalSale] = useState(0);
    const [totalSoldItems, setTotalSoldItems] = useState(0);
    const [totalNotSoldItems, setTotalNotSoldItems] = useState(0);

    useEffect(() => {
        if (selectedMonth) {
            getTransactionsByMonth(selectedMonth).then(data => {
                const soldItems = data.filter(item => item.sold);
                const notSoldItems = data.filter(item => !item.sold);
    
                
                const totalSaleAmount = soldItems.reduce((sum, item) => sum + item.price, 0);
    
                setTotalSale(totalSaleAmount.toFixed(2)); 
                setTotalSoldItems(soldItems.length);
                setTotalNotSoldItems(notSoldItems.length);
            }).catch(error => console.error("Error fetching statistics:", error));
        }
    }, [selectedMonth]);
    

    return (
        <div className="stats-container">
            <h3>Statistics -{monthNames[selectedMonth - 1]}</h3>
            <div className="stats-box">
                <p><strong>Total Sale:</strong> ₹{totalSale}</p>
                <p><strong>Total Sold Items:</strong> {totalSoldItems}</p>
                <p><strong>Total Not Sold Items:</strong> {totalNotSoldItems}</p>
            </div>
        </div>
    );
};

export default TransactionStats;
