const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  // Get all Thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();

      const thoughtObj = {
        thoughts,
        // headCount: await headCount(),
      };

      res.json(thoughtObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const user = await Thought.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json({
        user,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
// POST a new Thought
async createThought(req, res) {
  try {
    // Create the new thought
    const thought = await Thought.create(req.body);

    // Find the user by ID
    const user = await User.findById(req.body.userId);

    if (!user) {
      return res.status(404).json({ message: "No user with that ID" });
    }

    // Associate the new thought with the user
    user.thoughts.push(thought);

    // Save both the thought and the user
    await thought.save();
    await user.save();

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
},
  // PUT updates to a Thought
  async updateThought(req, res) {
    console.log("You are updating a thought!");
    console.log(req, body);

    try {
      const user = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        req.body,
        { new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No user found with that ID :(" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // DELETE a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({ _id: req.params.Id });

      if (!thought) {
        return res.status(404).json({ message: "No such thought exists" });
      }

      res.json({ message: "Thought successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
