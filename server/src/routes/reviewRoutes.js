const { Router } = require('express');
const { createReview, getUserReviews, getTaskReview } = require('../controllers/reviewController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = Router();

// Review routes
router.post('/', authenticateToken, createReview);

// Get reviews directed at a specific user (can be public)
router.get('/user/:userId', authenticateToken, getUserReviews);

// Get reviews associated with a specific task
router.get('/task/:taskId', authenticateToken, getTaskReview);

module.exports = router;
