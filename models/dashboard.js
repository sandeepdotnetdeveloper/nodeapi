const db = require('./db');

const getDashBoardData = async (email) => {
  try {
    const [rows] = await db.execute('CALL USP_GetDashBaordData()', []);
    if (rows && rows.length > 0) {
        const data = {};

  // Check and assign each result set to the data object
  if (Array.isArray(rows[0]) && rows[0].length > 0) {
    data.TotalVendors = rows[0][0].TotalVendors;
  }
  if (Array.isArray(rows[1]) && rows[1].length > 0) {
    data.TotalActiveVendors = rows[1][0].TotalActiveVendors;
  }
  if (Array.isArray(rows[2]) && rows[2].length > 0) {
    data.TotalFailedVendors = rows[2][0].TotalFailedVendors;
  }
  if (Array.isArray(rows[3]) && rows[3].length > 0) {
    data.TotalKYCPendingVendors = rows[3][0].TotalKYCPendingVendors;
  }

  // Return the data as a single object
  return data;
    }
    else {
        throw new Error('No data returned from the database');
      }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { getDashBoardData};
