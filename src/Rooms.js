import React, { useState, useEffect, useReducer } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { API } from 'aws-amplify';

import theme from './theme'
import { listChatRooms, listDefaultChatRooms } from './graphql/queries';
import { createChatRoom as CreateChatRoom, CreateDefaultChatRooms } from './graphql/mutations';
import { onCreateChatRoom as OnCreateChatRoom, OnCreateDefaultChatRooms } from './graphql/subscriptions';
import { empty, reindex, AGENDA_ID, AGENDA_ID2} from './utils/helpers';

const { primaryColor } = theme;

const CREATE_ROOM = "CREATE_ROOM";
const SET_ROOMS = "SET_ROOMS";
const SET_LOADING = "SET_LOADING";

const initialState = {
  loading: false,
  rooms: [],
  loading: true
}


function reducer(state, action) {
  switch (action.type) {
    case CREATE_ROOM:
      return { ...state, rooms: [...state.rooms, action.room] };
    case SET_ROOMS:
      return { ...state, rooms: action.rooms };
    case SET_LOADING:
      return { ...state, loading: action.loading };
    default:
      return state;
  }
}

export default function Rooms() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [inputValue, setInputValue] = useState('');
  const history = useHistory();
  let subscription;

  useEffect(() => {
    fetchDefaultRooms();
    subscribe();
    return () => subscription.unsubscribe();
  }, []);
  function subscribe() {
    subscription = API.graphql({
      query: OnCreateDefaultChatRooms,
      variables: {
        agendaId: AGENDA_ID2
      },
      authMode: "AMAZON_COGNITO_USER_POOLS"
    })
    .subscribe({
      next: roomData => {
        console.log("subscription");
        console.log({ roomData });
        //dispatch({ type: CREATE_ROOM, room: roomData.value.data.onCreateChatRoom });
      }
    })
  }
  async function fetchDefaultRooms() {
    try {
      const roomData = await API.graphql({
        query: listDefaultChatRooms,
        variables: {
          searchParams: {
            sortDirection: "ASC",
            agendaId: AGENDA_ID
          }
        },
        authMode: "AMAZON_COGNITO_USER_POOLS"
      });
      console.log('default roomData: ', roomData);
      console.log(JSON.parse(roomData.data.listDefaultChatRooms.data));
      let roomItems;
      if (!empty(roomData) && !empty(roomData.data) && !empty(roomData.data.listDefaultChatRooms) && roomData.data.listDefaultChatRooms.data != null &&  !empty(roomData.data.listDefaultChatRooms.data) && !empty(JSON.parse(roomData.data.listDefaultChatRooms.data)) && !empty(JSON.parse(roomData.data.listDefaultChatRooms.data).items)) {
        roomItems = JSON.parse(roomData.data.listDefaultChatRooms.data).items;
      }else{
        roomItems = [];
      }
    
      if (empty(roomItems)) {
        createDefaultChatRooms();
      }
      dispatch({ type: SET_ROOMS, rooms: roomItems });
      
    } catch (err) {
      console.log('error: ', err)
    }
  }
  
  async function createDefaultChatRooms() {
    
    try {
      const room = await API.graphql({
        query: CreateDefaultChatRooms,
        variables: {
          input: {
            agendaId: AGENDA_ID2
          }
        },
        authMode: "AMAZON_COGNITO_USER_POOLS"
      })
      console.log('create default room: ', room);
      console.log("room");
      console.log(JSON.parse(room.data.createDefaultChatRooms.data));
      //history.push(`/chat/${room.data.createChatRoom.name}/${room.data.createChatRoom.id}`)
    } catch (err) {
      console.log('error creating room: ', err);
    }
  }
  async function createChatRoom() {
    if (!inputValue) return;
    try {
      const room = await API.graphql({
        query: CreateChatRoom,
        variables: {
          input: {
            name: inputValue,
            defaultRoom: "No",
            status: "ACTIVE",
            agendaId:AGENDA_ID
          }
        },
        authMode: "AMAZON_COGNITO_USER_POOLS"
      })
      console.log('create room: ', room);
      console.log(JSON.parse(room.data.createChatRoom.data));
      console.log(room);
      //history.push(`/chat/${room.data.createChatRoom.name}/${room.data.createChatRoom.id}`)
    } catch (err) {
      console.log('error creating room: ', err);
    }
  }
  async function onChange(e) {
    e.persist();
    setInputValue(e.target.value);
  }
  return (
    <div>
      <div>
        <h2 style={titleStyle}>Available chat rooms</h2>
        {
          state.rooms.map((room) => (
            <Link to={`/chat/${room.name}/${room.id}`} key={room.id} style={roomLinkStyle}>
              <p style={roomNameStyle}>{room.name}</p>
            </Link>
          ))
        }
      </div>
      <div style={inputContainerStyle}>
        <div style={inputWrapperStyle}>
          <input
            style={inputStyle}
            placeholder="Room name"
            onChange={onChange}
          />
        </div>
        <div style={buttonWrapperStyle}>
          <button onClick={createDefaultChatRooms} style={buttonStyle}>Create Room</button>
        </div>
      </div>
    </div>
  )
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

const roomLinkStyle = {
  textDecoration: 'none'
}

const roomNameStyle = {
  padding: '20px 0px',
  margin: 0,
  borderBottom: '1px solid #ddd',
  fontSize: 18,
  color: 'black',
  fontWeight: 300
}

const titleStyle = {
  color: primaryColor
}