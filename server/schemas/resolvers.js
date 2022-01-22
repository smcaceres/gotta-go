const { AuthenticationError } = require("apollo-server-express");
const { async } = require("rxjs");
const { User, Post, Restroom } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // get all users
    users: async () => {
      const users = await User.find({})
        .select("-__v -password")
        .populate("posts");

      return users;
    },
    // get user by _id
    user: async (parent, { _id }) => {
      const user = await User.findOne({ _id: _id })
        .select("-__v -password")
        .populate("posts");

      return user;
    },
    // get all posts
    posts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ createdAt: -1 });
    },
    // get post by _id
    post: async (parent, { _id }) => {
      return Post.findOne({ _id });
    },
    // get all restrooms
    restrooms: async (parent, { lat, long }) => {
      const params = lat ? { lat, long } : {};
      return Restroom.find(params);
    },
    // get restroom by restroomId
    restroom: async (parent, { restroomId }) => {
      return Restroom.findOne({ restroomId });
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if(!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if(!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    }
  }
};

module.exports = resolvers;
