const dashboard = require('../models/dashboard');

const getDashBoardData = async (req, res) => {
  try {
    
    // Call the stored procedure to get user profile
    const dashboarddata = await dashboard.getDashBoardData();

    res.json(dashboarddata);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};



module.exports = { getDashBoardData };
