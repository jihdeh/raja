import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import Chatkit from '@pusher/chatkit';
import { onSendChat, onSendChatError, setRoom } from '../../Actions/ChatAction';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onSend = this.onSend.bind(this);
  }

  // BEGIN slack clone
  setRoom(room) {
    this.setState({ room, sidebarOpen: false })
    this.actions.scrollToEnd()
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

  // END slack clone

  onSend([message]) {
    console.log('onsend message', message)
    const { chat: { user, currentRoom }, user: { userExtended } } = this.props;
    const message = {text: message.text, roomId: currentRoom}
    this.props.onSendChat({
      ...message,
      user: {
        _id: userExtended.id,
        name: 'Me',
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmXGGuS_PrRhQt73sGzdZvnkQrPXvtA-9cjcPxJLhLo8rW-sVA'
      }
    })
    user.sendMessage(message)
    .catch(err => this.props.onSendChatError(err))
  }

  render() {
    const { chat: { messages, currentRoom } } = this.props;
    
    return (
      <GiftedChat
        // loadEarlier={this.state.loadEarlier}
        // onLoadEarlier={this.onLoadEarlier}
        // isLoadingEarlier={this.state.isLoadingEarlier}
        // onPressAvatar={}
        messages={messages[currentRoom] || []}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: CHATKIT_USER_NAME
        }}
      />
    );
  }

  componentWillUnmount() {
    this.props.setRoom(null)
  }
}

const mapStateToProps = state => ({
  user: state.get('auth').toJS(),
  chat: state.get('chat'),
});

const mapDispatchToProps = dispatch => ({
  onSendChat: bindActionCreators(onSendChat, dispatch),
  onSendChatError: bindActionCreators(onSendChatError, dispatch),
  setRoom: bindActionCreators(setRoom, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
