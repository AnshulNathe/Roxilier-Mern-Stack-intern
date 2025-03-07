import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/transactions"; 

export const getTransactions = async () => {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
};

export const getTransactionsByMonth = async (month) => {
    const response = await axios.get(`${API_BASE_URL}/${month}`);
    return response.data;
};

export const getPriceRangeData = async (month) => {
    const response = await axios.get(`${API_BASE_URL}/price-range/${month}`);
    return response.data;
};

export const getCategoryWiseData = async (month) => {
    const response = await axios.get(`${API_BASE_URL}/category-wise/${month}`);
    return response.data;
};
