const { PubSub, withFilter } = require("graphql-yoga");
const Message = require('./models/message')

const resolvers = {
  Query: {
    messages: () => Message.find()
  },

  Mutation: {
    createMessage: async (
      _,
      { name, body }
    ) => {
      const userText = new Message({
        name,body
      });
      await userText.save();
      pubsub.publish("newMessage", 
       { newMessage: userText}
      );
      return userText;
    },

   

    clearMessage: async (_, { }) => {
      await Message.deleteMany({ });
      return true;
    }
  },

  Subscription: {
    newMessage: {
      subscribe: 
        () => pubsub.asyncIterator("newMessage"), 
    },

  }
};

const pubsub = new PubSub();

module.exports = resolvers;
