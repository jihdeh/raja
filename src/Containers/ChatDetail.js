import React from 'react';
import { bindActionCreators } from 'redux';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import { onSendChat, onSendChatError, setRoom } from '../Actions/ChatAction';
import { Text } from 'react-native';
import Reactotron from 'reactotron-react-native'

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onSend = this.onSend.bind(this);
  }

  static navigationOptions ({ navigation }) {
    const { state: { params: { name } } } = navigation
    return { headerTitle: name }
  }

  // BEGIN slack clone
  setRoom(room) {
    this.setState({ room, sidebarOpen: false })
    this.actions.scrollToEnd()
  }

  componentDidMount() {
    this.createConvo()
  }

  joinRoom(roomId) {
    console.log('joining room');
    this.props.setRoom(roomId)
    // this.actions.subscribeToRoom(room)
    const { chat: { user, messages } } = this.props;
    // user.setReadCursor({ roomId, position: parseInt(position) })
    
    if (user && messages[roomId] && messages[roomId].length) {
      user.setReadCursor({ roomId, position: messages[roomId][messages[roomId].length - 1].id })
    }
  }

  // subscribeToRoom(room) {
  //   !this.state.user.roomSubscriptions[room.id] &&
  //   this.state.user.subscribeToRoom({
  //     roomId: room.id,
  //     hooks: { onNewMessage: this.actions.addMessage },
  //   })
  // }

  // createRoom(options) {
  //   this.state.user.createRoom(options).then(this.actions.joinRoom)
  // }

  createConvo() {
    console.log('creating convo')
    const { 
      chat: { user },
      navigation: { state: { params: { roomId, chatMember } } },
    } = this.props;

    if (roomId) return this.joinRoom(roomId);

    console.log('roomId exists');
    if (!chatMember || !user) return;
    console.log('chatmember and user exists');

    if (chatMember.id !== user.id) {
      console.log('here');
      const room = rooms.find(x => x.name === user.id + chatMember.id || x.name === chatMember.id + user.id)
      Reactotron.log('rooom', room)
      room ? 
        this.joinRoom(room.name) : 
        user.createRoom({
          name: user.id + chatMember.id,
          addUserIds: [chatMember.id],
          private: true,
        }).then(room => {
          console.log('room created', room)
          this.joinRoom(room.id)
        }).catch(e => console.log('eeee', e))
    }
  }

  // END slack clone

  onSend([message]) {
    console.log('onsend message', message)
    const { 
      chat: { user, currentRoom },
      user: { userExtended },
      navigation: { state: { params: { roomId } } },
    } = this.props;

    const data = {text: message.text, roomId: roomId || currentRoom}
    // this.props.onSendChat({
    //   ...message,
    //   roomId: roomId || currentRoom,
    //   user: {
    //     _id: userExtended.id,
    //     name: 'Me',
    //     avatar:
    //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmXGGuS_PrRhQt73sGzdZvnkQrPXvtA-9cjcPxJLhLo8rW-sVA'
    //   }
    // })
    user.sendMessage(data)
    .catch(err => this.props.onSendChatError(err))
  }

  render() {
    const { 
      chat: { user, messages, currentRoom }
    } = this.props;
    
    if (!currentRoom) return <Text>loading...</Text>;
    
    return (
      <GiftedChat
        // loadEarlier={this.state.loadEarlier}
        // onLoadEarlier={this.onLoadEarlier}
        // isLoadingEarlier={this.state.isLoadingEarlier}
        // onPressAvatar={}
        inverted={false}
        messages={messages[currentRoom] || []}
        onSend={messages => this.onSend(messages)}
        user={{ _id: user.id }}
      />
    );
  }

  componentWillUnmount() {
    console.log('chat unmounting')
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
