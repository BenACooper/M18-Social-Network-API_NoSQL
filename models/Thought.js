const { Schema, model } = require("mongoose");


const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId, // Use Mongoose's ObjectId data type
      default: () => new Types.ObjectId(), //Default value is set to a new ObjectId
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => {
        return timestamp.toLocaleDateString();
      }
    },
  }
);

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => {
        return timestamp.toLocaleDateString();
      }
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema], // reactionSchema subdocument of thoughtSchema
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});


const Thought = model("Thought", thoughtSchema);

module.exports = Thought;