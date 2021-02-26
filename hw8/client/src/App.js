import './App.css'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Input, message, Result, Tag } from 'antd'
import {MessagesbyNameQuery,CreateMessageMutation,ClearMessageMutation,NewMessageSubscription} from './Message-Query'
import {gql, useQuery, useMutation,useSubscription} from '@apollo/client'
function App() {
  const [messages, setMessages] = useState([])
  const [login, setlogin] = useState(false)
  const [status, setStatus] = useState({})
  const [opened, setOpened] = useState(false)
  const [username, setUsername] = useState('')
  const [friend, setFriend] = useState('')
  const [body, setBody] = useState('')
  const bodyRef = useRef(null)
  const [skip, setskip] = useState(true)
  const displayStatus = (s) => {
    if (s.msg) {
      const { type, msg } = s
      const content = {
        content: msg,
        duration: 0.5
      }
      switch (type) {
        case 'success':
          message.success(content)
          break
        case 'info':
          message.info(content)
          break
        case 'danger':
        default:
          message.error(content)
          break
      }
    }
  }

  useEffect(() => {
    displayStatus(status)
  }, [status])
  const { loading,error,data,refetch,subscribeToMore } = useQuery(MessagesbyNameQuery,{ variables: { name: username },skip:skip });
 if (!loading && !opened){
   setOpened(true)
 }
  const [clearMessages] = useMutation(ClearMessageMutation);
  const [createMessage, { _ }] = useMutation(CreateMessageMutation);
  useEffect(()=>{
    refetch()
  },[skip])
  useEffect(()=>{
    if (data !== undefined){
      setMessages(Object.assign([],data.messagebyName))
    }
    },[data])
  useEffect(()=>{
    subscribeToMore({
      document:NewMessageSubscription,
      variables:{name:username},
      updateQuery: (prev,{subscriptionData}) => {
        if (!subscriptionData.data) return prev.messagebyName
        const newMessage = subscriptionData.data.newMessage
        let newmessages = Object.assign([],prev.messagebyName)
        newmessages.push(newMessage)
        setMessages(newmessages)
        return {
          messagebyName:newmessages
        }
      }
    })
  },[subscribeToMore,username])
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  if (!login){
    return  <div className="App">
    <Input.Search
    rows={4}
    value={username}
    enterButton="Send"
    onChange={(e) => setUsername(e.target.value)}
    placeholder="Type a username here..."
    onSearch={async (msg) => {
      if (!msg ) {
        displayStatus({
          type: 'error',
          msg: 'Please enter a username.'
        })
        return
      }
      else{
      
      // await setUsername(username)
      setskip(false)
      setlogin(true)
      }  
    }}
  ></Input.Search>
  </div>
  }
  
  return (<div className="App">
      <div className="App-title">
        
        <h1>Hello {username}</h1>
        
        <Button type="primary" danger onClick={()=>{clearMessages();window.location.reload()}}>
          Clear
        </Button>
      </div>
      <div className="App-messages">
        {messages.length === 0 ? (
          <p style={{ color: '#ccc' }}>
            {opened? 'No messages...' : 'Loading...'}
          </p>
        ) : (
          messages.map(({ from,to, body }, i) => (
            <p className="App-message" key={i}>
              <Tag color="blue">{(from===username)?"to "+to:"from "+from}</Tag> {body}
            </p>
          ))
        
        )}
      </div>
      <Input
        placeholder="Friendname"
        value={friend}
        onChange={(e) => setFriend(e.target.value)}
        style={{ marginBottom: 10 }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            bodyRef.current.focus()
          }
        }}
      ></Input>
      <Input.Search
        rows={4}
        value={body}
        ref={bodyRef}
        enterButton="Send"
        onChange={(e) => setBody(e.target.value)}
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if (!msg || !body) {
            displayStatus({
              type: 'error',
              msg: 'Please enter a friendname and a message body.'
            })
            return
          }
          createMessage({variables:{ from: username,to:friend, body: msg}})
   
          setBody('')
        }}
      ></Input.Search>
    </div>
  )
}
export default App
