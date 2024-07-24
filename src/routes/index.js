const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const transactionController = require('../controllers/transactionController');
const pointsController = require('../controllers/pointsController');
const membersController = require('../controllers/membersController');
const authenticateToken = require('../middlewares/auth');

// Admin routes,
router.post('/register',adminController.registerAdmin);
router.post('/login', adminController.loginAdmin);

// Transaction routes
router.get('/transactions', authenticateToken, transactionController.getTransactions);
router.get('/trends', authenticateToken, transactionController.getTransactionTrends);

// Points routes
router.post('/points', authenticateToken, pointsController.updatePoints);
router.get('/totalpoints', authenticateToken, pointsController.getTotalPoints);

// Members routes
router.get('/members', authenticateToken, membersController.getMembers);
router.post('/addmember', authenticateToken, membersController.addMembers);

module.exports = router;
