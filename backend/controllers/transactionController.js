const Transaction = require('../models/Transaction');

// This API is for Get all transactions
const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching transactions', details: error.message });
    }
};

// This API is for Get transactions by month
const getTransactionsByMonth = async (req, res) => {
    try {
        const { month } = req.params;

        if (!month || isNaN(month) || month < 1 || month > 12) {
            return res.status(400).json({ error: 'Invalid month parameter' });
        }

        const transactions = await Transaction.find({
            $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] }
        });

        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching transactions by month', details: error.message });
    }
};

// This API is for Get price range distribution
const getPriceRangeData = async (req, res) => {
    try {
        const { month } = req.params;

        const transactions = await Transaction.find({
            $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] }
        });

        const priceRanges = {
            "0-100": 0, "101-200": 0, "201-300": 0, "301-400": 0, "401-500": 0,
            "501-600": 0, "601-700": 0, "701-800": 0, "801-900": 0, "901-above": 0
        };

        transactions.forEach(t => {
            if (t.price <= 100) priceRanges["0-100"]++;
            else if (t.price <= 200) priceRanges["101-200"]++;
            else if (t.price <= 300) priceRanges["201-300"]++;
            else if (t.price <= 400) priceRanges["301-400"]++;
            else if (t.price <= 500) priceRanges["401-500"]++;
            else if (t.price <= 600) priceRanges["501-600"]++;
            else if (t.price <= 700) priceRanges["601-700"]++;
            else if (t.price <= 800) priceRanges["701-800"]++;
            else if (t.price <= 900) priceRanges["801-900"]++;
            else priceRanges["901-above"]++;
        });

        res.status(200).json(priceRanges);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching price range data', details: error.message });
    }
};

// This API is for Get category-wise data
const getCategoryWiseData = async (req, res) => {
    try {
        const { month } = req.params;

        const transactions = await Transaction.find({
            $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] }
        });

        const categoryCounts = {};
        transactions.forEach(t => {
            categoryCounts[t.category] = (categoryCounts[t.category] || 0) + 1;
        });

        res.status(200).json(categoryCounts);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching category-wise data', details: error.message });
    }
};

module.exports = { 
    getAllTransactions, 
    getTransactionsByMonth, 
    getPriceRangeData, 
    getCategoryWiseData 
};
