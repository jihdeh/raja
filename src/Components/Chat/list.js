import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import Chatkit from '@pusher/chatkit';

const CHATKIT_TOKEN_PROVIDER_ENDPOINT = 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/49729f5a-a444-4e01-97b9-4f9a46bd5ee7/token';
const CHATKIT_INSTANCE_LOCATOR = 'v1:us1:49729f5a-a444-4e01-97b9-4f9a46bd5ee7';
const CHATKIT_ROOM_ID = 'room1';
const CHATKIT_USER_NAME = 'user1';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: {},
      loadEarlier,
      isLoadingEarlier: false,
      user: {},
      typing: {},
    };

    this.onReceive = this.onReceive.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && !this.state.user) {
      this.setState({ user: nextProps.user })
    }
  }

  componentDidMount() {
    const tokenProvider = new Chatkit.TokenProvider({
      url: CHATKIT_TOKEN_PROVIDER_ENDPOINT
    });

    const chatManager = new Chatkit.ChatManager({
      instanceLocator: CHATKIT_INSTANCE_LOCATOR,
      userId: CHATKIT_USER_NAME,
      tokenProvider: tokenProvider
    });

    chatManager.connect().then(currentUser => {
      this.currentUser = currentUser;
      Promise.all(
        currentUser.rooms.map(room => currentUser.subscribeToRoom({
          roomId: room.id,
          hooks: { onNewMessage: this.onReceive }
        }))
      ).then(rooms => console.log('all connected'))
      .catch(error => console.log('chatroom error', error))
    });
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

  setCursor(roomId, position) {
    this.state.user
      .setReadCursor({ roomId, position: parseInt(position) })
      .then(x => this.forceUpdate())
  }

  isTyping(room, user) {
    this.setState(set(this.state, ['typing', room.id, user.id], true))
  }

  notTyping(room, user) {
    this.setState(del(this.state, ['typing', room.id, user.id]))
  }
  // END slack clone

  onReceive(data) {
    console.log('on receive', data)
    console.log('state here', this.state)
    const { id, senderId, text, createdAt } = data;
    const incomingMessage = {
      _id: id,
      text: text,
      createdAt: new Date(createdAt),
      user: {
        _id: senderId,
        name: senderId,
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmXGGuS_PrRhQt73sGzdZvnkQrPXvtA-9cjcPxJLhLo8rW-sVA'
      }
    };

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, incomingMessage)
    }));
  }

  onSend([message]) {
    this.currentUser.sendMessage({
      text: message.text,
      roomId: CHATKIT_ROOM_ID
    });

    // this.setState(previousState => ({
    //   messages: GiftedChat.append(previousState.messages, [message])
    // }));
  }

  render() {
    return (
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
      >
        {get(notifications, 'length') ? (
          notifications.reverse().map((notification, key) => {
            return (
              <View
                key={key}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#d6d7d8',
                  padding: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <Text>{notification.actor} followed you </Text>
                <Text style={{ fontSize: 10 }}>
                  {moment(notification.created_at).fromNow(true)}
                </Text>
              </View>
            )
          })
        ) : (
          <View>
            <Text>No new notifications</Text>
          </View>
        )}
      </ScrollView>
    )
    // return (
    //   <GiftedChat
    //     // loadEarlier={this.state.loadEarlier}
    //     // onLoadEarlier={this.onLoadEarlier}
    //     // isLoadingEarlier={this.state.isLoadingEarlier}
    //     messages={this.state.messages}
    //     onSend={messages => this.onSend(messages)}
    //     user={{
    //       _id: CHATKIT_USER_NAME
    //     }}
    //   />
    // );
  }
}

const mapStateToProps = state => ({
  shared: state.get('shared').toJS(),
  user: state.get('auth').toJS(),
});

// const mapDispatchToProps = dispatch => ({
//   createProduct: bindActionCreators(createProduct, dispatch),
//   clearProduct: bindActionCreators(clearProduct, dispatch)
// });

export default connect(mapStateToProps)(Chat);
