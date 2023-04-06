const {  } = require('mongoose'); //update

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true, 
      trimmed: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
       // Must match a valid email address (look into Mongoose's matching validation)
      //  can i use this? https://github.com/validatorjs/validator.js
    },
    thoughts: {
      //  Array of _id values referencing the Thought model
    },
    friends: {
      // Array of _id values referencing the User model (self-reference)
    }
  }
)

// TODO Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

userSchema.virtual('friendCount')
.get(function() {
  // code
})

const User = model('user', userSchema)

module.exports = User