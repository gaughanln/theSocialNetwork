const User = require("../models/User");
const router = require("express").Router();
const Thought = require("../models/Thought");

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
    .populate('reactions')
         .then((thoughtData) => {
        return res.json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Get a single thought by id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thoughtData) => {
        return res.json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

   // Create a new thought
   createNewThought(req, res) {
    Thought.create(req.body)
      .then((thoughtData) => {
        // add the new thought's id to its associated user's thoughts array
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $push: { thoughts: thoughtData._id } },
          { new: true }
        );
      })
      .then((userData) => {
        // return the updated user document with the new thought
        return res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

// Delete a thought
deleteThought(req, res) {
   Thought.findOneAndDelete({ _id: req.params.thoughtId })
    .then((thoughtData) =>
      !thoughtData
        // ? res.status(404).json({ message: "No user with that ID" })
        // : Thought.deleteMany({ _id: { $in: user.thoughts } })
    )
    .then(() =>
      res.json({ message: "The thought has escaped me 😶‍🌫️" })
    )
    .catch((err) => res.status(500).json(err));
},


  //update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "The thought has escaped me 😶‍🌫️" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

// Create a reaction
  createReaction(req, res) {
    console.log("I've got an opinion on this!");
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: {reactionId: req.params.userId} } },
      { runValidators: true, new: true }
    )
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: "Better luck next time" })
          : res.json(reaction)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete a reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: {_id: req.params.reactionId} } },
      { runValidators: true, new: true }
    )
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: "Better luck next time" })
          : res.json(reaction)
      )
      .catch((err) => res.status(500).json(err));
  },
};