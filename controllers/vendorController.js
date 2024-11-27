const vendor = require('../models/vendor');

const getVendorList = async (req, res) => {
  try {
    const { searchText, pageNumber, statusType, state,pageSize=10 } = req.body;
    
    console.log(req.body);
    // Call the stored procedure to get vendor list
    const result = await vendor.getVendorList(searchText, pageNumber, statusType, state,pageSize);
    const vendorList = result[0]; // First result set
    const totalVendors = result[1]; // Second result set

    // Check if the result has any data
    if (vendorList && totalVendors.length > 0) {
      // If there are results, send success response with data
      return res.status(200).json({
        message: 'VendorList',
        data: vendorList,
        totalVendors:totalVendors,
        errorCode: 0,
      });
    } else {
      // If no results found, send empty data with errorCode 1
      return res.status(200).json({
        message: 'VendorList',
        data: [],
        totalVendors:0,
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


const addVendor = async (req, res) => {
  try {
    const jsonData = req.body;
    console.log(jsonData);
    if (!Array.isArray(jsonData)) {
      return res.status(400).json({ error: 'Invalid data format' });
    }
    const result = await vendor.addVendor(jsonData);
    if (result) {
      
      return res.status(200).json({
        message: 'VendorList',
        data: result,
        errorCode: 0,
      });
    } else { 
      return res.status(200).json({
        message: 'VendorList',
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

const getVendorAddress = async (req, res) => {
  try {
    const vendorUniqueID =  req.params.id;
    
    console.log(vendorUniqueID);
    // Call the stored procedure to get vendor list
    const result = await vendor.getVendorAddress(vendorUniqueID);
    const vendorAddress = result[0]; // First result set
    

    // Check if the result has any data
    if (vendorAddress && vendorAddress.length > 0) {
      // If there are results, send success response with data
      return res.status(200).json({
        message: 'Vendor Logistic Address',
        data: vendorAddress[0],
       
        errorCode: 0,
      });
    } else {
      // If no results found, send empty data with errorCode 1
      return res.status(200).json({
        message: 'No record found.',
        data: [],
        totalVendors:0,
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

const updateVendorAddress = async (req, res) => {
  try {
    const {VendorUniqueID,ContactPerson,AddressLine1,AddressLine2,AddressLine3,City,State,Pincode,ContactNumber} =  req.body;
    
   
    // Call the stored procedure to get vendor list
    const result = await vendor.updateVendorAddress(VendorUniqueID,ContactPerson,AddressLine1,AddressLine2,AddressLine3,City,State,Pincode,ContactNumber);
    const response = result[0]; // First result set
    

    // Check if the result has any data
    if (response && response.length > 0) {
      // If there are results, send success response with data
      return res.status(200).json({
        message: 'Updated successfully',
        data: response[0],
        errorCode: 0,
      });
    } else {
      // If no results found, send empty data with errorCode 1
      return res.status(200).json({
        message: 'No record found.',
        data: {},
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

module.exports = { getVendorList,addVendor,getVendorAddress,updateVendorAddress };
