const router = require('express').Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController')

// Get all users + create user
router.route('/').get(getUsers).post(createUser);

// Get a single user by it's _id & populated friend + thought data
// Update a user by it's _id
// Remove user by it's _id
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

// Add new friend to user's friend list
// Delete a friend from user's friend list
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;