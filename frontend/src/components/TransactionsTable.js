import React, { useEffect, useState } from "react";
import { getTransactionsByMonth } from "../api.js";
import "./TransactionsTable.css"; 

const TransactionsTable = ({ selectedMonth, setSelectedMonth }) => {
    const [transactions, setTransactions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(3); 

    useEffect(() => {
        if (selectedMonth) {
            getTransactionsByMonth(selectedMonth)
                .then(data => setTransactions(data))
                .catch(error => console.error("Error fetching transactions:", error));
        }
    }, [selectedMonth]);

    const filteredTransactions = transactions.filter(transaction =>
        transaction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.price.toString().includes(searchTerm)
    );

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredTransactions.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);

    const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
    const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

    const months = [
        { value: "1", label: "January" },
        { value: "2", label: "February" },
        { value: "3", label: "March" },
        { value: "4", label: "April" },
        { value: "5", label: "May" },
        { value: "6", label: "June" },
        { value: "7", label: "July" },
        { value: "8", label: "August" },
        { value: "9", label: "September" },
        { value: "10", label: "October" },
        { value: "11", label: "November" },
        { value: "12", label: "December" }
    ];

    return (
        <div className="transactions-container">
            <h1>Transaction Dashboard</h1>

            <div className="filters-container">
                <div>
                    <label>Select Month: </label>
                    <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                        {months.map((month) => (
                            <option key={month.value} value={month.value}>{month.label}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="transactions-container">
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th className="col-id">ID</th>
                                <th className="col-title">Title</th>
                                <th className="col-description">Description</th>
                                <th className="col-price">Price</th>
                                <th className="col-category">Category</th>
                                <th className="col-sold">Sold</th>
                                <th className="col-image">Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRows.length > 0 ? currentRows.map(transaction => (
                                <tr key={transaction.id}>
                                    <td className="col-id">{transaction.id}</td>
                                    <td className="col-title">{transaction.title}</td>
                                    <td className="col-description">{transaction.description}</td>
                                    <td className="col-price">₹{transaction.price}</td>
                                    <td className="col-category">{transaction.category}</td>
                                    <td className="col-sold">{transaction.sold ? "Yes" : "No"}</td>
                                    <td className="col-image">
                                        <img src={transaction.image} alt={transaction.title} />
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: "center", padding: "10px" }}>No matching transactions found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="pagination">
                <span>Page No: {currentPage}</span>
                <div className="movement-button">
                <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
                <button onClick={nextPage} disabled={currentPage >= totalPages}>Next</button>
                </div>
                <span>Per Page: {rowsPerPage}</span>
            </div>
        </div>
    );
};

export default TransactionsTable;
