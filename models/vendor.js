const db = require('./db');

const getVendorList = async (searchText,pageNumber,statusType,state,pageSize) => {
  try {
    const [rows] = await db.execute('CALL USP_GetVendorList(?, ?, ?, ?, ?)', [searchText,pageNumber,statusType,state,pageSize]);
    
    console.log(rows);
  return rows;
    
  } catch (error) {
    throw new Error(error.message);
  }
};






const addVendor = async (jsonData) => {
  try {
    const responeStaus = [];

    // Use map to create an array of promises for parallel execution
    const promises = jsonData.map(async (row) => {
      const { Name, PhoneNumber, Email, StoreLegalName } = row;

      
      const [rows] = await db.execute('CALL USP_AddNewVendor(?, ?, ?, ?)', [Name, PhoneNumber, Email, StoreLegalName]);

      console.log('Procedure result:', rows);

      const resultSet = rows[0];
      if (resultSet && resultSet.length > 0) {
        const result = resultSet[0]; // Get the first row (assuming single-row response)
        responeStaus.push({ ...row, Status: result.Successfull==1?'Added':result.Successfull=2?'Email already exists':'Some went wrong.' });
        console.log('Successfull value:', result.Successfull);
      } else {
        console.log('No result returned from stored procedure.');
      }
    });

    
    await Promise.all(promises);

   
    console.log('Processed Results:', responeStaus);

   
    return responeStaus;

  } catch (error) {
    console.error('Error:', error.message);
    throw new Error(error.message);
  }
};


const getVendorAddress = async (vendorUniqueID) => {
  try {
    const [rows] = await db.execute('CALL USP_GetVendorAddressDetails(?)', [vendorUniqueID]);
    
    console.log(rows);
  return rows;
    
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateVendorAddress = async (VendorUniqueID,ContactPerson,AddressLine1,AddressLine2,AddressLine3,City,State,PINCODE,ContactNumber) => {
  try {
    const [rows] = await db.execute('CALL USP_UpdateVendorAddress(?, ?, ?, ?, ?, ?, ?, ?, ?, ? )', [VendorUniqueID,ContactPerson,AddressLine1,AddressLine2,AddressLine3,City,State,PINCODE,ContactNumber,""]);
    
    console.log(rows);
  return rows;
    
  } catch (error) {
    throw new Error(error.message);
  }
};




module.exports = { getVendorList,addVendor,getVendorAddress,updateVendorAddress};
