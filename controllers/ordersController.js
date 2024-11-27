const order = require('../models/order');

const getOrders = async (req, res) => {
  try {
    const { pageNumber,searchText,fromDate,toDate,pageSize=10 } = req.body;
    
    console.log(req.body);
    // Call the stored procedure to get vendor list
    const result = await order.getOrders(pageNumber,searchText,fromDate,toDate,pageSize);
    const orders = result[0]; // First result set
    const totalOrders = result[1]; // Second result set

    // Check if the result has any data
    if (orders && totalOrders.length > 0) {
      // If there are results, send success response with data
      return res.status(200).json({
        message: 'Orders',
        data: orders,
        totalOrders:totalOrders,
        errorCode: 0,
      });
    } else {
      // If no results found, send empty data with errorCode 1
      return res.status(200).json({
        message: 'Orders',
        data: [],
        totalOrders:0,
        errorCode: 1,
      });
    }
  } catch (err) {
    // Handle any unexpected errors
    return res.status(500).json({
      message: 'Server error',
      error: err.message,
    });
  }
};

const getOrdersOnline = async (req, res) => {
  try {
    const { pageNumber,searchText,fromDate,toDate,pageSize=10 } = req.body;
    
    console.log(req.body);
    // Call the stored procedure to get vendor list
    const result = await order.getOrdersOnline(pageNumber,searchText,fromDate,toDate,pageSize);
    const orders = result[0]; // First result set
    const totalOrders = result[1]; // Second result set

    // Check if the result has any data
    if (orders && totalOrders.length > 0) {
      // If there are results, send success response with data
      return res.status(200).json({
        message: 'Orders',
        data: orders,
        totalOrders:totalOrders,
        errorCode: 0,
      });
    } else {
      // If no results found, send empty data with errorCode 1
      return res.status(200).json({
        message: 'Orders',
        data: [],
        totalOrders:0,
        errorCode: 1,
      });
    }
  } catch (err) {
    // Handle any unexpected errors
    return res.status(500).json({
      message: 'Server error',
      error: err.message,
    });
  }
};


const getCustomerOnlineTransactionLogs = async (req, res) => {
  try {
    
   
    // Call the stored procedure to get vendor list
    const result = await order.getCustomerOnlineTransactionLogs(req.params.id);

    const table1 = result[0]; // First result set
    const table2 = result[1]; // Second result set
    const logs={paymentlog:table1,transactionLog:table2}
console.log(logs);

    // Check if the result has any data
    if (table2 && table2.length > 0) {
      // If there are results, send success response with data
      return res.status(200).json({
        message: 'Logs',
        data: logs,
      
        errorCode: 0,
      });
    } else {
      // If no results found, send empty data with errorCode 1
      return res.status(200).json({
        message: 'Logs',
        data: [],
        errorCode: 1,
      });
    }
  } catch (err) {
    // Handle any unexpected errors
    return res.status(500).json({
      message: 'Server error',
      error: err.message,
    });
  }
};


const getOrderBonusPaymentReport = async (req, res) => {
  try {
    const { pageNumber,searchText,fromDate,toDate,pageSize=10 } = req.body;
    
    console.log(req.body);
    // Call the stored procedure to get vendor list
    const result = await order.getOrderBonusPaymentReport(pageNumber,searchText,fromDate,toDate,pageSize);
    const orders = result[0]; // First result set
    const totalOrders = result[1]; // Second result set

    // Check if the result has any data
    if (orders && totalOrders.length > 0) {
      // If there are results, send success response with data
      return res.status(200).json({
        message: 'Orders',
        data: orders,
        totalOrders:totalOrders,
        errorCode: 0,
      });
    } else {
      // If no results found, send empty data with errorCode 1
      return res.status(200).json({
        message: 'Orders',
        data: [],
        totalOrders:0,
        errorCode: 1,
      });
    }
  } catch (err) {
    // Handle any unexpected errors
    return res.status(500).json({
      message: 'Server error',
      error: err.message,
    });
  }
};

const updateBonusPaymentStatusByAdmin = async (req, res) => {
  try {
    
    console.log(req.body);
   const {paymentGuidID,paymentStatus,adminID}=req.body
    // Call the stored procedure to get vendor list
    const result = await order.updateBonusPaymentStatusByAdmin(paymentGuidID,paymentStatus,adminID);

    const table1 = result[0]; // First result set
    


    // Check if the result has any data
    if (table1 && table1.length > 0) {
      // If there are results, send success response with data
      return res.status(200).json({
        message: 'Logs',
        data: table1,
      
        errorCode: 0,
      });
    } else {
      // If no results found, send empty data with errorCode 1
      return res.status(200).json({
        message: 'Updated Successfully.',
        data: [],
        errorCode: 1,
      });
    }
  } catch (err) {
    // Handle any unexpected errors
    return res.status(500).json({
      message: 'Server error',
      error: err.message,
    });
  }
};

module.exports = { getOrders,getOrdersOnline,getCustomerOnlineTransactionLogs,getOrderBonusPaymentReport,updateBonusPaymentStatusByAdmin };
