const {  } = require('mongoose'); //update

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true, 
      //  Must be between 1 and 280 characters
    },
    createdAt: {
      type: Date, //double check
      // Set default value to the current timestamp
      // Use a getter method to format the timestamp on query
    },
    username: { // The user that created this thought
      type: String,
      required: true
    },
    reactions: { // These are like replies
      // Array of nested documents created with the reactionSchema
    }
  }
)

// TODO Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.


const Thought = model('thought', thoughtSchema)

module.exports = Thought