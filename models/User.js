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
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model("User", userSchema);

module.exports = User;
