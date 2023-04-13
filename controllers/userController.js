const User = require("../models/User");
const Thought = require("../models/Thought");

const userController = {
  // Get all users
  getUsers(req, res) {
    User.find()
    .populate("friends")
    .populate({
      path: "thoughts",
      populate: { path: "reactions" },
    })
      .then((userData) => {
        return res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Get a single user by its _id and populated thought and friend data
  // Get a single User
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate("friends")
      .populate("thoughts")
      .then((userData) => {
        return res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  //delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() =>
        res.json({ message: "User and associated thoughts have been deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },

  //update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Add a friend to user's friend list
  addFriend(req, res) {
    console.log("Adding a new friend 🥳");
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(student)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete friend from users friend list
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(student)
      )
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = userController;