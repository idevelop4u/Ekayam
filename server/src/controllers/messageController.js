const Message = require('../models/Message');
const Task = require('../models/Task');
const Notification = require('../models/Notification');

// Get messages for a specific task
const getMessages = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user._id;

    // Verify task exists and user is participant
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if user is requester or assigned helper
    if (task.requester.toString() !== userId.toString() && 
       (!task.helper || task.helper.toString() !== userId.toString())) {
      return res.status(403).json({ message: 'Not authorized to view these messages' });
    }

    const messages = await Message.find({ task: taskId })
      .sort({ createdAt: 1 })
      .populate('sender', 'name username profilePhoto')
      .populate('receiver', 'name username profilePhoto');

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
};

// Send a new message
const sendMessage = async (req, res) => {
  try {
    const { taskId, receiverId, content, messageType, locationData, imageUrl } = req.body;
    const senderId = req.user._id;

    if (!taskId || !receiverId || !content) {
      return res.status(400).json({ message: 'Task ID, Receiver ID, and Content are required' });
    }

    // Creating message
    const message = new Message({
      task: taskId,
      sender: senderId,
      receiver: receiverId,
      content,
      messageType: messageType || 'text',
      locationData,
      imageUrl,
    });

    await message.save();

    // Create a notification for the receiver
    const notification = new Notification({
      user: receiverId,
      type: 'chat_message',
      title: 'New Message',
      body: `You have a new message from ${req.user.username || 'someone'}`,
      data: {
        taskId,
        messageId: message._id,
      }
    });
    await notification.save();

    // The socket.io server should ideally emit this, but REST acts as fallback
    res.status(201).json(message);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
};

// Mark messages as read
const markAsRead = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user._id;

    await Message.markAllAsRead(taskId, userId);

    res.status(200).json({ message: 'Messages marked as read' });
  } catch (error) {
    console.error('Error marking messages as read:', error);
    res.status(500).json({ message: 'Failed to mark messages as read' });
  }
};

module.exports = {
  getMessages,
  sendMessage,
  markAsRead,
};
