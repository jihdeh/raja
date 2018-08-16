import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment/moment'
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";
import Reactotron from 'reactotron-react-native'
import { setRoom } from '../Actions/ChatAction';

moment.updateLocale('en', {
  relativeTime : {
      future: "in %s",
      past:   "%s ago",
      s  : '%ds',
      ss : '%ds',
      m:  "%dm",
      mm: "%dm",
      h:  "%dh",
      hh: "%dh",
      d:  "%dd",
      dd: "%dd",
      M:  "%dmonth",
      MM: "%dmonths",
      y:  "a year",
      yy: "%d years"
  }
});

class ChatList extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    };

    this.getChats = this.getChats.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
    this.renderSeparator = this.renderSeparator.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
  }

  componentDidMount() {
    console.log('list mounted')
  }

  getChats() {
    console.log('get chats')
    // const { page, seed } = this.state;
    // const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    // this.setState({ loading: true });

    // fetch(url)
    //   .then(res => res.json())
    //   .then(res => {
    //     this.setState({
    //       data: page === 1 ? res.results : [...this.state.data, ...res.results],
    //       error: res.error || null,
    //       loading: false,
    //       refreshing: false
    //     });
    //   })
    //   .catch(error => {
    //     this.setState({ error, loading: false });
    //   });
  }

  handleRefresh() {
    this.setState({
      page: 1,
      seed: this.state.seed + 1,
      refreshing: true
    }, () => this.getChats());
  }

  handleLoadMore() {
    this.setState({
      page: this.state.page + 1,
    }, () => this.getChats());
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

  enterChat({ roomId, name  }) {
    const { navigation } = this.props;
    navigation.navigate('ChatDetailScreen', { roomId, name })
  }

  setCursor(roomId, position) {
    this.state.user
      .setReadCursor({ roomId, position: parseInt(position) })
      .then(x => this.forceUpdate())
  }

  renderSeparator() {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  }

  renderHeader () {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  }

  renderFooter() {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  render() {
    const { chat: { messages } } = this.props;
    const { user: { userExtended } } = this.props;
    const defaultAvatar = 'http://via.placeholder.com/50x50' 
    const roomIds = Object.keys(messages).reverse();

    if (!roomIds.length) {
      return (
      <View>
        <Text>No chat at the moment</Text>
      </View>
      )
    }


    const chats = roomIds.map((roomId, index) => {
      const lastMessage = [...messages[roomId]].reverse().find(msg => msg.user._id !== userExtended.id)
      return {
        id: lastMessage ? lastMessage.id : index,
        roomId: lastMessage ? lastMessage.roomId : null,
        name: lastMessage ? lastMessage.user.name : 'user',
        createdAt: lastMessage ? moment(lastMessage.createdAt).fromNow(true) : '',
        text: lastMessage ?
          (lastMessage.attachment ? 'sent a file' : lastMessage.text ) : '...',
        avatar: lastMessage ? (lastMessage.user.avatar || defaultAvatar) : defaultAvatar,
      }
    })
    
    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={chats}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              hideChevron={true}
              rightTitle={item.createdAt}
              title={`${item.name}`}
              subtitle={item.text}
              avatar={{ uri: item.avatar }}
              containerStyle={{ borderBottomWidth: 0 }}
              onPress={() => this.enterChat(item)}
            />
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}
        />
      </List>
    )
  }
}

const mapStateToProps = state => ({
  user: state.get('auth').toJS(),
  chat: state.get('chat'),
});

const mapDispatchToProps = dispatch => ({
  setRoom: bindActionCreators(setRoom, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
