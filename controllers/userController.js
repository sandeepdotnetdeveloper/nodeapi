const userModel = require('../models/userModel');

const getUserProfile = async (req, res) => {
  try {
    //const user = req.user;  // Extract user info from JWT token
    const { id} = req.query
//c3946371-64cc-11ed-a655-42010abe0003
    // Call the stored procedure to get user profile
    const userProfile = await userModel.getUserProfile(id);

    res.json(userProfile);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getAdminPages = async (req, res) => {
    try {
      const user = req.user;  // Extract user info from JWT token
  
      // Call the stored procedure to get user profile
      const userProfile = await userModel.getAdminPages();
  
      res.json(userProfile);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };

module.exports = { getUserProfile,getAdminPages };
