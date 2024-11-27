const db = require('./db');

const getUserProfile = async (email) => {
  try {
    const [rows] = await db.execute('CALL get_user_profile(?)', [email]);
    if (rows.length === 0) {
      throw new Error('User not found');
    }
    return rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { registerUser, loginUser, getUserProfile };
