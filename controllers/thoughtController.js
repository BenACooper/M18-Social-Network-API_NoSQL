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
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json({
        thought,
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
      const user = await User.findOne({ username: req.body.username });

      if (!user) {
        return res
          .status(404)
          .json({ message: "That username does not exist." });
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
    console.log(req.body);

    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        req.body,
        { new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID :(" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
      console.error(err);
      // console.log(err)
    }
  },
  // DELETE a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No such thought exists" });
      }

      // Remove the thought ID from the associated user's thoughts array
      const user = await User.findOne({ username: thought.username });

      if (user) {
        user.thoughts.pull(thought._id);
        await user.save();
      }

      res.json({ message: "Thought successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // POST a reaction
  async addReaction(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId);

      if (!thought) {
        return res.status(404).json({ message: "No thought!" });
      }

      const newReaction = {
        reactionBody: req.body.reactionBody,
        username: req.body.username,
      };

      thought.reactions.push(newReaction);
      await thought.save();

      res.status(201).json({ message: "Reaction created", thought });
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },
  // DELETE a reaction
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        {
          $pull: {
            reactions: { _id: req.params.reactionId },
          },
        },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought!" });
      }

      res.json({ message: "Reaction deleted", thought });
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },
};
