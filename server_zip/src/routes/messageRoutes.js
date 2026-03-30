const { Router } = require('express');
const { getMessages, sendMessage, markAsRead } = require('../controllers/messageController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = Router();

// All message routes require authentication
router.use(authenticateToken);

// Get messages for a task
router.get('/task/:taskId', getMessages);

// Send message
router.post('/', sendMessage);

// Mark messages as read for a task
router.put('/task/:taskId/read', markAsRead);

module.exports = router;
