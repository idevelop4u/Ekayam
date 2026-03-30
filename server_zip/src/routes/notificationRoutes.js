const { Router } = require('express');
const { getNotifications, markAsRead, markAllAsRead, getUnreadCount } = require('../controllers/notificationController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = Router();

// All notification routes require authentication
router.use(authenticateToken);

// Get notifications
router.get('/', getNotifications);

// Get unread count
router.get('/unread-count', getUnreadCount);

// Mark all as read
router.put('/read-all', markAllAsRead);

// Mark specific notification as read
router.put('/:id/read', markAsRead);

module.exports = router;
