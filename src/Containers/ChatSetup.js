import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Chatkit from '@pusher/chatkit';
import { onReceiveMessage, setChatUser } from '../Actions/ChatAction';
import Reactotron from 'reactotron-react-native'
import { BASE_URL } from '../Constants/BaseUrl';

const CHATKIT_TOKEN_PROVIDER_ENDPOINT = 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/49729f5a-a444-4e01-97b9-4f9a46bd5ee7/token';
const CHATKIT_INSTANCE_LOCATOR = 'v1:us1:49729f5a-a444-4e01-97b9-4f9a46bd5ee7';

class ChatSetup extends React.Component {
  constructor(props) {
    super(props);
    const { token, user } = this.props.chat;

    this.state = {
      messages: {},
      loadEarlier: false,
      isLoadingEarlier: false,
      user: user || null,
      token,
      typing: {},
    };

    this.onReceive = this.onReceive.bind(this);
  }

  componentDidMount() {

    const { user: { userExtended } } = this.props;
    if (userExtended) {
      this.tokenProvider = new Chatkit.TokenProvider({
        url: CHATKIT_TOKEN_PROVIDER_ENDPOINT
        // url: (id, token) => `${BASE_URL}/user/chat-token`,
      });
      this.connectChat()
    }
  }

  componentDidUpdate(prevProps) {
    const { user: { userExtended } } = this.props;

    if (userExtended && !this.props.chat.user && !this.isConnecting) {
      console.log('in if');
      this.tokenProvider = new Chatkit.TokenProvider({
        url: CHATKIT_TOKEN_PROVIDER_ENDPOINT
        // url: (id, token) => `${BASE_URL}/user/chat-token`,
      });
      this.connectChat()
    } else if (!userExtended && this.props.chat.user) {
      this.clearSubscription()
    }
  }

  componentWillUnmount() {
    this.clearSubscription()
  }

  clearSubscription() {
    console.log('clear sub');
    const { chat: { user } } = this.props;
    if (!user) return;

    user.disconnect(); 
    this.props.setUser(null);
  }

  connectChat() {
    console.log('connect chat')
    this.isConnecting = true;
    const { user: { userExtended } } = this.props;

    const chatManager = new Chatkit.ChatManager({
      instanceLocator: CHATKIT_INSTANCE_LOCATOR,
      userId: userExtended.id,
      tokenProvider: this.tokenProvider
    });

    chatManager.connect()
    .then(currentUser => {
     this.isConnecting = false;
      console.log('chatmanager connect');
      this.props.setUser(currentUser);
      return Promise.all(
        currentUser.rooms.map(room => currentUser.subscribeToRoom({
          roomId: room.id,
          hooks: { onNewMessage: this.onReceive }
        }))
      )
    }).then(rooms => {this.isConnecting = false; console.log('all connected') })
    .catch(error => {
      this.isConnecting = false;
      console.log('chatroom connect error', error)
    })
  }

  // BEGIN slack clone
  setRoom(room) {
    this.setState({ room, sidebarOpen: false })
    this.scrollToEnd()
  }

  joinRoom(room) {
    this.actions.setRoom(room)
    this.actions.subscribeToRoom(room)
    this.state.messages[room.id] &&
      this.actions.setCursor(
        room.id,
        Object.keys(this.state.messages[room.id]).pop()
      )
  }

  subscribeToRoom(room) {
    !this.state.user.roomSubscriptions[room.id] &&
    this.state.user.subscribeToRoom({
      roomId: room.id,
      hooks: { onNewMessage: this.actions.addMessage },
    })
  }

  createRoom(options) {
    this.state.user.createRoom(options).then(this.actions.joinRoom)
  }

  createConvo(options) {
    if (options.user.id !== this.state.user.id) {
      const exists = this.state.user.rooms.find(
        x =>
          x.name === options.user.id + this.state.user.id ||
          x.name === this.state.user.id + options.user.id
      )
      exists
        ? this.actions.joinRoom(exists)
        : this.actions.createRoom({
            name: this.state.user.id + options.user.id,
            addUserIds: [options.user.id],
            private: true,
          })
    }
  }

  setCursor(roomId, position) {
    const { chat: { user } } = this.props;
    user.setReadCursor({ roomId, position: parseInt(position) })
      // .then(x => this.forceUpdate())
  }

  isTyping(room, user) {
    this.setState(set(this.state, ['typing', room.id, user.id], true))
  }

  notTyping(room, user) {
    this.setState(del(this.state, ['typing', room.id, user.id]))
  }
  // END slack clone

  onReceive(data) {
    console.log('on receivesss')
    Reactotron.log(data)
    const { senderId, id, roomId, text, createdAt } = data;
    const { chat: { user, currentRoom } } = this.props;
    let name, avatar;
    if (data.userStore && data.userStore.store && data.userStore.store.store) {
      msgSender = data.userStore.store.store[senderId];
      name = msgSender ? msgSender.name : null
      avatar = msgSender ? msgSender.avatarURL : null
      
    }
    const incomingMessage = {
      id,
      _id: id,
      text,
      roomId,
      createdAt,
      user: {
        _id: senderId,
        name: name || 'user',
        avatar: avatar || 
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmXGGuS_PrRhQt73sGzdZvnkQrPXvtA-9cjcPxJLhLo8rW-sVA'
      }
    };

    this.props.onReceive(incomingMessage)
    if (roomId === currentRoom) {
      // Update cursor if the message was read
      const cursor = user.readCursor({ roomId }) || {}
      const cursorPosition = cursor.position || 0
      cursorPosition < id && this.setCursor(roomId, id)
      // this.scrollToEnd()
    }
  }

  onSend([message]) {
    console.log('onsendd', message)
    const { chat: { currentRoom, user } } = this.props;
    user.sendMessage({
      text: message.text,
      roomId: currentRoom
    });
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  user: state.get('auth').toJS(),
  chat: state.get('chat')
});

const mapDispatchToProps = dispatch => ({
  setUser: bindActionCreators(setChatUser, dispatch),
  onReceive: bindActionCreators(onReceiveMessage, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatSetup);
