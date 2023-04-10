const router = require('express').Router();

const {
  getThoughts, 
  getSingleThought,
  createNewThought,
  deleteThought,
  updateThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtsController')

// Get all thoughts + create new thoughts
router.route('/thoughts').get(getThoughts);

// Get a single thought by it's _id 
// Create new thought
// Update a thought by it's _id
// Remove a thought by it's _id
router.route('/thoughts/:thoughtId').get(getSingleThought).post(createNewThought).delete(deleteThought).put(updateThought);

// Create new reaction 
// delete a reaction
router.route('/thoughts/:thoughtId/reactions').post(createReaction).delete(deleteReaction);

module.exports = router;