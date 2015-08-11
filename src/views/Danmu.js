import React, {Component, PropTypes} from 'react';
import {requireServerCss, requireServerImage} from '../util';
import {isRoomLoaded} from '../reducers/room';
import {getRoom as loadRoom} from '../actions/roomActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import cn from 'classnames';
import * as roomActions from '../actions/roomActions';
import {TextField, FlatButton, List, ListItem, ListDivider} from 'material-ui';
import mui from 'material-ui';
import FlyWords from '../components/FlyWords';


let ThemeManager = new mui.Styles.ThemeManager();

const styles = __CLIENT__ ? require('./Danmu.scss') : requireServerCss(require.resolve('./Danmu.scss'));
//const kitten = __CLIENT__ ? require('./kitten.jpg') : requireServerImage('./kitten.jpg');

class Danmu extends Component {

  static propTypes = {
    roomData: PropTypes.object,
    words: PropTypes.object,
    users: PropTypes.object,
    connected: PropTypes.bool
  }

  state = {
    chat: '',
    hideSide: true
  }

  static childContextTypes = {
    muiTheme: PropTypes.object
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  }

  componentDidMount(){
    //start socketio
    const {
      roomData,
      connect
      } = this.props;
    //if room exist
    if(roomData)
      connect(roomData.id);

  }

  componentWillUnmount(){
    if(__CLIENT__){
      console.log('go disconnect');
     this.props.disconnect();
    }

  }

  sendMessage(){
    this.props.send(this.props.roomData.id, this.state.chat);
    this.setState({chat: ''});
  }
  toggleSideBar(){
    this.setState({hideSide: !this.state.hideSide});
  }
  onTextChange(event){
    this.setState({chat: event.target.value});
  }
  onSendClick(){
    this.sendMessage();
  }
  onTextKeyDown(event){
    if(event.keyCode===13){
      this.sendMessage();
    }
  }

  render() {
    const {roomData, words, removeWord, users, connected} = this.props;
    if(!roomData){
      return (<div>木有这个链接！</div>)
    }

    const {url} = roomData;
    const {hideSide} = this.state;

    const indicator = connected?'😄':'😠';

    return (
      <div className={styles.danmu}>
        <div className={cn(styles.frame, {[styles.hideSide]:hideSide})}>
          <div className={styles.barSwitch} onClick={::this.toggleSideBar}>
            {hideSide?indicator+'一起弹幕':indicator}
          </div>
          <div className={styles.wordsContainer}>
            <FlyWords words={words} removeWord={removeWord}/>
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.textField}>
              <TextField
                hintText="发一发弹幕"
                fullWidth={true}
                id="url"
                value={this.state.chat}
                onChange={::this.onTextChange}
                onKeyDown={::this.onTextKeyDown}
                />
            </div>
            <div className={styles.sendButton}>
              <FlatButton label="发送" onClick={::this.onSendClick} disabled={!connected}/>
            </div>
          </div>
          <iframe className={styles.iframe} src={url} width="100%" height="100%" border="none"/>
        </div>
        <div className={cn(styles.sideBar, {[styles.hideSide]:hideSide})}>
          <div className={styles.banner}>
            一起弹幕
          </div>
          <List subheader="房间信息">
            <ListItem className={styles.listItem} primaryText={url?url:'无内容'}/>
          </List>
          <ListDivider />
          { users !==undefined && users !== null &&
            <List subheader={'在线用户 '+ Object.keys(users).length}>
              {

                Object.keys(users).map((key)=>
                    <ListItem key={key} primaryText={users[key]}/>
                )
              }
            </List>
          }
        </div>
      </div>
    );
  }
}


@connect(state => ({
  roomData: state.room.roomData,
  words: state.room.words,
  users: state.room.users,
  connected: state.room.connected
}))
export default
class DanmuContainer {
  static propTypes = {
    roomData: PropTypes.object,
    users: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    words: PropTypes.object,
    connected: PropTypes.bool
  }

  static fetchData(store, params) {
    if (!isRoomLoaded(store.getState())) {
      return store.dispatch(loadRoom(params.roomId));
    }
  }

  render() {
    const { words, roomData, users, connected, dispatch } = this.props;
    return <Danmu roomData={roomData} words={words} users={users} connected={connected}
      {...bindActionCreators(roomActions, dispatch)}>
      {this.props.children}
    </Danmu>;
  }
}
