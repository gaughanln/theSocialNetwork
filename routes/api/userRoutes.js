const router = require('express').Router();

const {
  getUsers,
  getSingleUser
  createUser
  // deleteUser
} = require('../../controllers/userController')

// /api/users
router.route('/').get(getUsers).post(createUser);


// GET a single user by its _id and populated thought and friend data
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// POST a new user:
// PUT to update a user by its _id

// DELETE to remove user by its _id

// /api/users/:userId/friends/:friendId
// POST to add a new friend to a user's friend list
// DELETE to remove a friend from a user's friend list
// Aggregate function to get the number of students overall

module.exports = router;