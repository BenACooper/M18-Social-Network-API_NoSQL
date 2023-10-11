const { Schema, model } = require("mongoose");
const thoughtScherma = require("./Thought");

//Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought", // Reference thought model.
      },
    ],
    friends: [
      {
      type: Schema.Types.ObjectId,
      ref: "User", // Self-reference to User model for friends
      }
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

// userSchema.virtual('friendCount').get(function () {
//   // console.log("=======", this.friends)
//   // console.log("=======", this.username) //! Why is it undefined??
//   console.log("THIS >>>", this) //! "this" refers to the first object inside the friends array???
//   return this.friends.length;
// });

// userSchema.virtual('friendCount').get(async function () {
//   try {
//     const friendCount = await User.countDocuments({ _id: { $in: this.friends } });
//     return friendCount;
//   } catch (err) {
//     console.error(err);
//     return 0; // Return 0 if there is an error
//   }
// });

//Not sure how this resolve the issue since console.log on lines 38 and 49 of userController.js show that the friends field is an array. The population method is asynchronous, maybe it does not become an array until after the process is complete?
userSchema.virtual('friendCount').get(function () {
  console.log(this)
  return Array.isArray(this.friends) ? this.friends.length : 0; 
});

const User = model("User", userSchema);

module.exports = User;
