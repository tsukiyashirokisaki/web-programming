const { PubSub, withFilter } = require("graphql-yoga");
const Message = require('./models/message')
const { ObjectID } = require('mongodb');


const resolvers = {
  Query: {
    messages: () => Message.find(),
    messagebyID: async(_,{id}) => {
      const message = await Message.findById({_id:ObjectID(id)});
      return message
    },
    messagebyName: async(_,{name}) => {
      return Message.find({$or: [{from:name},{to:name}]});
      
    }
  },

  Mutation: {
    createMessage: async (
      _,
      { from, to, body }
    ) => {
      const userText = new Message({
        from, to ,body
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
      subscribe: withFilter(
        () => pubsub.asyncIterator("newMessage"),
        (payload, variables) => {
          return payload.newMessage.from === variables.name || payload.newMessage.to === variables.name;
         },
      )
        } 
    },

  
};

const pubsub = new PubSub();

module.exports = resolvers;
