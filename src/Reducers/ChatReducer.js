import {
  SET_CHAT_USER,
  SET_ROOM,
  IS_TYPING,
  IS_NOT_TYPING,
  ON_RECEIVE_MESSAGE,
  SEND_MESSAGE,
  SEND_MESSAGE_ERROR
} from '../Constants/ActionTypes';

const initialState = {
  loadEarlier: false,
  isLoadingEarlier: false,
  user: null,
  token: null,
  messages: {},
  isTyping: false,
  error: null,
  currentRoom: null,
};

const ChatReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CHAT_USER:
      return {...state, user: payload};
    case SET_ROOM:
      return {...state, currentRoom: payload};
    case IS_TYPING:
      return {...state, typing: true};
    case IS_NOT_TYPING:
      return {...state, typing: false};
    case ON_RECEIVE_MESSAGE:
      if (state.messages[payload.roomId]) {
        return {
          ...state,
          messages: {...state.messages, [payload.roomId]: [...state.messages[payload.roomId], payload]} 
        };
      } else {
        return {
          ...state, 
          messages: {...state.messages, [payload.roomId]: [payload]}
        };
      }
    case SEND_MESSAGE:
      return {
        ...state,
        error: null,
        messages: {
          ...state.messages,
          [state.currentRoom]: [...state.messages[state.currentRoom], payload]
        } 
      };
    case SEND_MESSAGE_ERROR:
      console.log('send message errossr', payload)
      return {...state, error: payload};
    default:
      return state;
  }
};

export default ChatReducer;
