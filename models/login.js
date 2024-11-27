const db = require('./db');

const loginUser = async (email, password) => {
  try {
    const [rows] = await db.execute('CALL login_user(?, ?)', [email, password]);

    if (rows.length === 0) {
      throw new Error('Invalid credentials');
    }
    
    // Return the password (for comparison in the controller)
    return rows[0].password;
  } catch (error) {
    throw new Error(error.message);
  }
};
