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
      // 280 character maximum
    },
    username: { 
      type: String,
      required: true
    },
    createdAt: { 
      // Date
      // Set default value to the current timestamp
      // Use a getter method to format the timestamp on query
    }
  }
)

// TODO This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.


const Reaction = model('reaction', reactionSchema)

module.exports = Reaction