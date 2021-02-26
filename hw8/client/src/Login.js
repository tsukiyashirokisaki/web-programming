import './App.css'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Input, message, Result, Tag } from 'antd'
import {MessagesQuery,CreateMessageMutation,ClearMessageMutation,NewMessageSubscription} from './Message-Query'
import {gql, useQuery, useMutation,useSubscription} from '@apollo/client'
import App from './App'

function Login() {
    const bodyRef = useRef(null)
    const [username, setUsername] = useState('')
  
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
    return  username===''?<div className="App">
    <Input.Search
    rows={4}
    value={username}
    ref={bodyRef}
    enterButton="Send"
    onChange={(e) => setUsername(e.target.value)}
    placeholder="Type a username here..."
    onSearch={(msg) => {
      if (!msg ) {
        displayStatus({
          type: 'error',
          msg: 'Please enter a username.'
        })
        return
      }
    //   createMessage({variables:{ name: username, body: msg}})
      
      setUsername('')
    }}
  ></Input.Search>
  </div>:<h1>as</h1>
    
}
export default Login