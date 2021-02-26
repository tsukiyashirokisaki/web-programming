require('dotenv-defaults').config()

const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const WebSocket = require('ws')

const Message = require('./models/message')
const { update } = require('./models/message')

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

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
  console.log('MongoDB connected!')

  wss.on('connection', ws => {
    const sendData = (data) => {
      ws.send(JSON.stringify(data))
    }

    const sendStatus = (s) => {
      sendData(['status', s])
    }
    Message.find()
      .limit(100)
      .sort({ _id: 1 })
      .exec((err, res) => {
        if (err) throw err

        // initialize app with existing messages
        sendData(['init', res])
      })
      function up(){
        Message.find()
        .then(res=>{sendData(['init', res])}).catch(err=>console.log(err));        
      }
      setInterval(up,100)
      
    
    

    ws.onmessage = (message) => {
      const { data } = message
      const [task, payload] = JSON.parse(data)

      switch (task) {
        case 'input': {
          const instance = new Message(payload);
         
          // instance.save((err,instance)=>
          // {
          //   if(err){
          //     return console.log(err)
          //   }
          //   console.log('document saved');
            
          // }).
          Message.create(payload).
          then(()=>Message.find())
          .then(res=>{console.log(res);sendData(['init', res])}).catch(err=>console.log(err));

          
          
          
          break
        }
        case 'clear': {
          Message.deleteMany({}, () => {
            console.log("send clear");
            sendData(['cleared',[]])
            sendStatus({
              type: 'info',
              msg: 'Message cache cleared.'
            })
          })

          break
        }
        default:
          break
      }
    }
  })

  const PORT = process.env.port || 4000

  server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
  })
})
