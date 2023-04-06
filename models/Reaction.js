const {  } = require('mongoose'); //update

const reactionSchema = new Schema(
  {
    reactionId: {
      // Use Mongoose's ObjectId data type
      // Default value is set to a new ObjectId
    },
    reactionBody: {
      type: String, 
      required: true,
      maxlength: 280,
    },
    username: { 
      type: String,
      required: true
    },
    createdAt: { 
      type: Date,
      default: Date.now,
      // Use a getter method to format the timestamp on query
    }
  }
  {
    toJSON: {
      getters: true,
    },
  }
)

// TODO This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.


const Reaction = model('reaction', reactionSchema)

module.exports = Reaction