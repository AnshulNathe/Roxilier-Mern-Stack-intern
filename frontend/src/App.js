import React, { useState } from "react";
import TransactionsTable from "./components/TransactionsTable";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import TransactionStats from "./components/TransactionStats";
import "./App.css";

function App() {
    const [selectedMonth, setSelectedMonth] = useState("3"); 

    return (
        <div>   
            <TransactionsTable selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
            <TransactionStats selectedMonth={selectedMonth} />
            <div className="chart-wrapper">
                <BarChart selectedMonth={selectedMonth} />
                <PieChart selectedMonth={selectedMonth} />
            </div>
        </div>
    );
}

export default App;
