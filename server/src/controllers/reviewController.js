const Review = require('../models/Review');
const User = require('../models/User');
const Task = require('../models/Task');
const Notification = require('../models/Notification');

// Create a review
const createReview = async (req, res) => {
  try {
    const { taskId, revieweeId, reviewerRole, rating, comment, badges } = req.body;
    const reviewerId = req.user._id;

    if (!taskId || !revieweeId || !reviewerRole || !rating) {
      return res.status(400).json({ message: 'Task ID, Reviewee ID, Role, and Rating are required' });
    }

    // Verify task
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Only allow reviews on completed tasks
    if (task.status !== 'completed') {
      return res.status(400).json({ message: 'Can only review completed tasks' });
    }

    // Create review
    const review = new Review({
      task: taskId,
      reviewer: reviewerId,
      reviewee: revieweeId,
      reviewerRole,
      rating,
      comment,
      badges: badges || [],
    });

    await review.save();

    // Update the reviewee's average rating in the User model
    const reviewee = await User.findById(revieweeId);
    if (reviewee) {
      const stats = await Review.calculateAverageRating(revieweeId);
      reviewee.averageRating = stats.averageRating;
      reviewee.totalReviews = stats.totalReviews;
      
      // Also add points and check for gamification updates
      reviewee.points += 5; // Flat reward for getting a review
      reviewee.updateCertificateLevel(); // Check if they levelled up

      // Optional: Add new badges logic to user's profile
      if (badges && badges.length > 0) {
        // Simple Set-like union
        const currentBadges = new Set(reviewee.badges || []);
        badges.forEach(b => currentBadges.add(b));
        reviewee.badges = Array.from(currentBadges);
      }

      await reviewee.save();
    }

    // Notify the reviewee
    const notification = new Notification({
      user: revieweeId,
      type: 'system',
      title: 'New Review',
      body: `You received a ${rating}-star review for a recent task!`,
      data: { taskId }
    });
    await notification.save();

    res.status(201).json(review);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error for compound index (one review per user per task)
      return res.status(400).json({ message: 'You have already reviewed this task' });
    }
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Failed to create review' });
  }
};

// Get reviews for a user
const getUserReviews = async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const reviews = await Review.find({ reviewee: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('reviewer', 'username profilePhoto')
      .populate('task', 'title type');

    const total = await Review.countDocuments({ reviewee: userId });

    res.status(200).json({
      reviews,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalReviews: total,
    });
  } catch (error) {
    console.error('Error fetching user reviews:', error);
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
};

// Get task review
const getTaskReview = async (req, res) => {
  try {
    const { taskId } = req.params;
    
    // Finds all reviews for a specific task
    const reviews = await Review.find({ task: taskId })
      .populate('reviewer', 'username profilePhoto')
      .populate('reviewee', 'username profilePhoto');

    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching task review:', error);
    res.status(500).json({ message: 'Failed to fetch task review' });
  }
};

module.exports = {
  createReview,
  getUserReviews,
  getTaskReview,
};
