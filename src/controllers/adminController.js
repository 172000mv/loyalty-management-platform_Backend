// controllers/adminController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../utils/supabaseClient');
const logger = require('../middlewares/logger');
require('dotenv').config();

exports.registerAdmin = async (req, res) => {
  logger(req, res, () => {});
  console.log("Request Body:",req.body);
  console.log("JWT Secret from .env:", process.env.JWT_SECRET);
  console.log("JWT Secret received from frontend:", req.body.JWT_SECRET);


  const { user, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from('admin_users')
    .insert([{ user, email, password: hashedPassword }])
    .select();  // Ensure to select data to get the inserted record back

  if (error || !data || data.length === 0) {
    return res.status(400).json({ error: error?.message || 'Registration failed' });
  }

  const token = jwt.sign({ id: data[0].id, email: data[0].email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({ message: 'Admin registered successfully', token });
};

exports.loginAdmin = async (req, res) => {
  logger(req, res, () => {}); 

  const { user, password } = req.body;
  const { data: admin, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('user', user)
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({ message: 'Success', token });
};
