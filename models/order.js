const db = require('./db');

const getOrders = async (pageNumber,searchText,fromDate,toDate,pageSize) => {
  try {
    const [rows] = await db.execute('CALL USP_DateWiseAndVendorWiseTransactionReport(?, ?, ?, ?, ?)', [pageNumber,searchText,fromDate,toDate,pageSize]);
    
    console.log(rows);
  return rows;
    
  } catch (error) {
    throw new Error(error.message);
  }
};

const getOrdersOnline = async (pageNumber,searchText,fromDate,toDate,pageSize) => {
  try {
    const [rows] = await db.execute('CALL USP_GetCustomerOnlineTransactionReport(?, ?, ?, ?, ?)', [pageNumber,searchText,fromDate,toDate,pageSize]);
    
    console.log(rows);
  return rows;
    
  } catch (error) {
    throw new Error(error.message);
  }
};

const getCustomerOnlineTransactionLogs = async (id) => {
  console.log(id);
  if (id === undefined || id === null) {
    throw new Error("Invalid ID provided.");
  }
  try {
    const [rows] = await db.execute('CALL USP_GetCustomerOnlineTransactionLogs(?)', [id]);
    console.log(rows);
    
  return rows;
    
  } catch (error) {
    throw new Error(error.message);
  }
};


const getOrderBonusPaymentReport = async (pageNumber,searchText,fromDate,toDate,pageSize) => {

  try {
    const [rows] = await db.execute('CALL USP_GetOrderBonusPaymentReport(?, ?, ?, ?,?)', [pageNumber,searchText,fromDate,toDate,pageSize]);
    console.log(rows);
    
  return rows;
    
  } catch (error) {
    throw new Error(error.message);
  }
};


const updateBonusPaymentStatusByAdmin = async (paymentGuidID,paymentStatus,adminID) => {

  try {
    const [rows] = await db.execute('CALL USP_UpdateBonusPaymentStatusByAdmin(?, ?, ?)', [paymentGuidID,paymentStatus,adminID]);
    console.log(rows);
    
  return rows;
    
  } catch (error) {
    throw new Error(error.message);
  }
};

//USP_GetCustomerOnlineTransactionLogs USP_GetOrderBonusPaymentReport





module.exports = { getOrders,getOrdersOnline,getCustomerOnlineTransactionLogs,getOrderBonusPaymentReport,updateBonusPaymentStatusByAdmin};
