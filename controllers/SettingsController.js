const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const Joi = require('joi');


const getAdminUsers = async (req, res) => {
 
  try {
   
    const result = await userModel.getAdminUsers();
    const table1 = result[0];

    if (table1 && table1.length > 0) {
    
      return res.status(200).json({
        message: 'Users',
        data: table1,
        errorCode: 0,
      });
    } else {
      
      return res.status(200).json({
        message: 'No record found.',
        data: [],
        errorCode: 1,
      });
    }

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getAdminUsers };
