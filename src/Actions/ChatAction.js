import {
  SET_CHAT_USER,
  SET_ROOM,
  ON_RECEIVE_MESSAGE,
  SEND_MESSAGE,
  SEND_MESSAGE_ERROR
} from '../Constants/ActionTypes';

export const setChatUser = data => dispatch => {
  dispatch({
    type: SET_CHAT_USER,
    payload: data
  });
};

export const setRoom = data => dispatch => {
  dispatch({
    type: SET_ROOM,
    payload: data
  });
};

export const onSendChat = data => dispatch => {
  dispatch({
    type: SEND_MESSAGE,
    payload: data
  });
};

export const onSendChatError = data => dispatch => {
  dispatch({
    type: SEND_MESSAGE_ERROR,
    payload: data
  });
};

export const onReceiveMessage = data => dispatch => {
  dispatch({
    type: ON_RECEIVE_MESSAGE,
    payload: data
  });
};
