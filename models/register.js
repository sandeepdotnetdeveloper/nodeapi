const db = require('./db');

const registerUser = async (name, email, password) => {
  try {
    const [result] = await db.execute(
      'CALL register_user(?, ?, ?)',
      [name, email, password]
    );
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = { registerUser};