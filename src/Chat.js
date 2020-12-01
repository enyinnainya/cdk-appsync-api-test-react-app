import React, { useState, useEffect, useReducer, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { API, Auth } from 'aws-amplify';
import theme from './theme';

import { listChatMessagesForRoom as ListChatMessages } from './graphql/queries';
import { createChatMessage as CreateChatMessage } from './graphql/mutations';
import { onCreateChatMessageByRoomId as OnCreateChatMessage } from './graphql/subscriptions';


const { primaryColor } = theme;

const CREATE_MESSAGE = "CREATE_MESSAGE";
const SET_MESSAGES = "SET_MESSAGES";
const SET_LOADING = "SET_LOADING";

const initialState = {
  messages: [],
  loading: true
}


function reducer(state, action) {
  switch(action.type) {
    case CREATE_MESSAGE:
      return {
        ...state, messages: [...state.messages, action.message]
      }
    case SET_MESSAGES:
      return {
        ...state, messages: action.messages, loading: false
      }
    case SET_LOADING:
      return {
        ...state, loading: action.loading
      }
    default:
      return state;
  }
}

const scrollToRef = (ref) => {
  if (!ref.current) return;
  window.scrollTo(0, ref.current.offsetTop);
}

const scrollToRefWithAnimation = ref => {
  if (!ref.current) return;
  window.scrollTo({
    top: ref.current.offsetTop,
    behavior: 'smooth'
  });
}

export default function Chat() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [user, setUser] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const params = useParams();
  const scrollRef = useRef(null);
  const executeScroll = () => scrollToRef(scrollRef);
  const executeScrollWithAnimation = () => scrollToRefWithAnimation(scrollRef);
  const { name, id } = params;
  let subscription;
  let isMounted = true;
  useEffect(() => {
    listMessages();
    setUserState();
    subscribe();
    return () => {
      subscription.unsubscribe();
      isMounted = false;
    }
  }, []);
  function subscribe() {
    subscription = API.graphql({
      query: OnCreateChatMessage,
      variables: {
        roomId: id
      }
    })
    .subscribe({
      next: async subscriptionData => {
        const { value: { data: { onCreateChatMessageByRoomId }}} = subscriptionData;
        const currentUser = await Auth.currentAuthenticatedUser();
        if (onCreateChatMessageByRoomId.userName === currentUser.username) return;
        dispatch({ type: CREATE_MESSAGE, message: onCreateChatMessageByRoomId });
        executeScrollWithAnimation();
      }
    })
  }
  async function setUserState() {
    const user = await Auth.currentAuthenticatedUser();
    if (!isMounted) return;
    setUser(user);
  }
  async function listMessages() {
    try {
      const messageData = await API.graphql({
        query: ListChatMessages,
        variables: {
          roomId: id,
          sortDirection: 'ASC'
        }
      })
      dispatch({ type: SET_MESSAGES, messages: messageData.data.listChatMessagesForRoom.items });
      executeScroll();
    } catch (err) {
      console.log('error fetching messages: ', err)
    }
  }
  async function createMessage() {
    if (!inputValue) return;
    const message = { userName: user.username, userId: user.username, content: inputValue, roomId: id };
    console.log('message to create');
    console.log(user);
    console.log(message);
  
    setTimeout(() => {
      executeScrollWithAnimation();
    })
    try {
      const addResult = await API.graphql({
        query: CreateChatMessage,
        variables: {
          input: message
        }
      });
      console.log('addResult');
      console.log(addResult);
      if (addResult) {
        dispatch({ type: CREATE_MESSAGE, message });
        setInputValue('');
        console.log('message created!')
      }
     
    } catch (err) {
      console.log('error creating message: ', err);
    }
  }
  function onChange (e) {
    e.persist();
    setInputValue(e.target.value);
  }
  return (
    <div>
      <h2>Room: {name}</h2>
      {
        state.messages.length === Number(0) && !state.loading && (
          <div style={noMessageContainer}>
            <h1>No messages yet!</h1>
          </div>
        )
      }
      <div>
        {
          state.messages.map((message, index) => (
            <div
              ref={(index === Number(state.messages.length - 1) ? scrollRef : null)}
              key={message.id || message.content}
              style={messageContainerStyle(user, message)}>
              <p style={messageStyle(user, message)}>{message.content}</p>
              <p style={ownerStyle(user, message)}>{message.userName}</p>
            </div>
          ))
        }
      </div>
      <div style={inputContainerStyle}>
        <div style={inputWrapperStyle}>
          <input
            style={inputStyle}
            placeholder="Message"
            onChange={onChange}
            value={inputValue}
          />
        </div>
        <div style={buttonWrapperStyle}>
          <button onClick={createMessage} style={buttonStyle}>Create message</button>
        </div>
      </div>
    </div>
  )
}

const messageContainerStyle = (user, message) => {
  const isOwner = user && user.username === message.userName;
  return {
    backgroundColor: isOwner ? primaryColor : '#ddd',
    padding: '15px 18px',
    borderRadius: 20,
    marginBottom: 10,
    boxShadow: `0 1px 1px rgba(0,0,0,0.11), 
    0 2px 2px rgba(0,0,0,0.11)`
  }
}

const messageStyle = (user, message) => {
  const isOwner = user && user.username === message.userName;
  return {
     color: isOwner ? 'white' : 'black',
     fontSize: 22,
     margin: 0
  }
}

const ownerStyle = (user, message) => {
  const isOwner = user && user.username === message.userName;
  return {
     color: isOwner ? '#ddd' : '#666',
     fontWeight: 400,
     fontSize: 18,
     marginTop: 8,
     marginBottom: 0
  }
}

const inputWrapperStyle = {
  display: 'flex'
}

const buttonWrapperStyle = {
  display: 'flex',
  alignItems: 'center'
}

const buttonStyle = {
  height: 40,
  outline: 'none',
  border: 'none',
  padding: '0px 20px',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  border: '1px solid',
  fontSize: 18
}

const inputContainerStyle = {
  display: 'flex',
  position: 'fixed',
  bottom: 0,
  height: 80,
  backgroundColor: '#ddd',
  width: '100%',
  left: 0
}

const inputStyle = {
  border: 'none',
  outline: 'none',
  width: 300,
  padding: 9,
  backgroundColor: 'transparent',
  fontSize: 20,
  marginLeft: 30
}

const noMessageContainer = {
  marginTop: 200,
  display: 'flex',
  justifyContent: 'center',
  color: primaryColor
}