require('dotenv-defaults').config()
const { PubSub, withFilter, GraphQLServer } = require("graphql-yoga");
const mongoose = require('mongoose')
const Message = require('./models/message')
const typeDefs = require('./schema.graphal');
const resolvers = require('./resolvers');
const { ObjectID } = require('mongodb');



if (!process.env.MONGO_URL) {
    console.error('Missing MONGO_URL!!!')
    process.exit(1)
  }

mongoose.set('bufferCommands', false);
  setTimeout(function() {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log("time");
  }, 6000);
  

const db = mongoose.connection
  

db.on('error', (error) => {
  console.error(error)
})

db.once('open', () => {
  server.start(() => console.log("We make magic over at localhost:4000"))
  console.log('MongoDB connected!')
  // Message.find().then(items=>console.log(items));
  // Message.findById({_id:ObjectID("5fed79658e75b00bf815fa95")}).then(item=>console.log(item))

  })

const pubsub = new PubSub();
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } });
  
 
