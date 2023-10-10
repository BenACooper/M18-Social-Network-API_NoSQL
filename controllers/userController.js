const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  // GET all Users
  async getUsers(req, res) {
    try {
      const users = await User.find();

      const userObj = {
        users,
        // headCount: await headCount(),
      };

      res.json(userObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // GET a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json({
        user,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // POST a new User
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // PUT updates to a single user
  async updateUser(req, res) {
    console.log("You are updating a user!");
    console.log(req.body);

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        req.body,
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with that ID :(" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // DELETE an existing user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }

      res.json({ message: "User successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // PUT to add a friend to an existing user
  async addUserFriend(req, res) {
    try {
      //Get both user and friend.
      const user = await User.findById({ _id: req.params.userId });
      const friend = await User.findById({ _id: req.params.friendId });

      //Check if both user and friend exist.
      if (!user || !friend) {
        return res
          .status(404)
          .json({ message: "Either user or friend does not exist." });
      }

      //Check of they are already friends.
      if (user.friends.includes(friendId)) {
        return res.status(400).json({ message: "Users are already friends" });
      }

      //Add new friend to users friend list.
      user.friends.push(friendId);
      await user.save();

      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  async deleteUserFriend(req, res) {
    try {
      //Get both user and friend.
      const user = await User.findById({ _id: req.params.userId });
      const friend = await User.findById({ _id: req.params.friendId });;

      //Check if both user and friend exist.
      if (!user || !friend) {
        return res
          .status(404)
          .json({ message: "Either user or friend does not exist." });
      }

      //Only delete if the user is already a friend.
      if (user.friends.includes(friend._id)) {
        user.friends.pull(friend._id);
        await user.save();
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};
