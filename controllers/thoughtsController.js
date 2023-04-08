const User = require("../models/User");
const router = require("express").Router();
const Thought = require("../models/Thought");

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
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
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
      // don't forget to push the created thought's _id to the associated user's thoughts array field
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
      { _id: req.params.reactions },
      { $addToSet: { reaction: {reactionId: req.params.thoughtId} } },
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
      { _id: req.params.reactions },
      { $addToSet: { reaction: {reactionId: req.params.thoughtId} } },
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