const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const Joi = require('joi');

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    // Hash password before calling stored procedure
    const hashedPassword = await bcrypt.hash(password, 10);

    // Call stored procedure to register the user
    await userModel.registerUser(name, email, hashedPassword,1);

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const clientIp = req.ip;
  const hashedPassword = await bcrypt.hash(password, 10);
  // Validate input
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    // Call stored procedure to get user password
    const result = await userModel.loginUser(email, hashedPassword,clientIp);
  if (result.LoginAttemptSuccessful==1){
    // Compare password with the stored hashed password
    const isMatch = await bcrypt.compare(password, result.Password);
    
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign({ userID:result.AdminUserID,role:result.RoleName,roleID:result.RoleID,name:result.Name,email:result.Email }, process.env.JWT_SECRET, { expiresIn: '48h' });
    res.json({ message: 'Login successful', token });
    }
    else{
      res.status(400).json({ message: 'Invalid email or password.'});
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { registerUser, loginUser };
