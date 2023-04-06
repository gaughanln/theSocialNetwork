const User = require('../../models/user');

const router = require('express').Router();

// POST a new user:
// PUT to update a user by its _id

// DELETE to remove user by its _id

// /api/users/:userId/friends/:friendId
// POST to add a new friend to a user's friend list
// DELETE to remove a friend from a user's friend list
// Aggregate function to get the number of students overall



const headCount = async () =>
  User.aggregate()
    .count('userCount')
    .then((numberOfUsers) => numberOfUsers);

module.exports = {
  // Get all users
  getUsers(req, res) {
    user.find()
      .then(async (users) => {
        const userObj = {
          users,
          headCount: await headCount(),
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // GET a single user by its _id and populated thought and friend data
  // Get a single User
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      },

  // create a new student
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  
     
 