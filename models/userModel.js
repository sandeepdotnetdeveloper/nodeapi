const db = require('./db');

const registerUser = async (name, email, password,roleID) => {
  try {
    const [result] = await db.execute(
      'CALL USP_AddAdminUser(?, ?, ?, ?)',
      [name, email, password,roleID]
    );
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const loginUser = async (email, password,ipaddress) => {
  try {
    const [rows] = await db.execute('CALL USP_AdminLogin(?, ?, ?)', [email, password,ipaddress]);

    if (rows.length === 0) {
      throw new Error('Invalid credentials');
    }
    console.log(rows);
    const user = rows[0];
    console.log(user[0]);
   //return rows[0].password;
    return user[0];   // Returning stored password for comparison
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserProfile = async (email) => {
  try {
    const [rows] = await db.execute('CALL USP_GetCustomerDetails(?)', [email]);
    if (rows.length === 0) {
      throw new Error('User not found');
    }
    return rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};
const getAdminPages = async (email) => {
    try {
      const [rows] = await db.execute('CALL USP_AdminPages()', []);
      if (rows.length === 0) {
        throw new Error('Page not found');
      }
      return rows[0];
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getAdminUsers= async (email) => {
    try {
      const [rows] = await db.execute('CALL USP_GetAdminUsers()', []);
     
      return rows[0];
    } catch (error) {
      throw new Error(error.message);
    }
  };
  






module.exports = { registerUser, loginUser, getUserProfile,getAdminPages ,getAdminUsers};
