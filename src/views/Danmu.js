import React, {Component, PropTypes} from 'react';
import {requireServerCss, requireServerImage} from '../util';
import {isRoomLoaded} from '../reducers/room';
import {getRoom as loadRoom} from '../actions/roomActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as roomActions from '../actions/roomActions';
import {TextField, FlatButton} from 'material-ui';
import mui from 'material-ui';

let ThemeManager = new mui.Styles.ThemeManager();

const styles = __CLIENT__ ? require('./Danmu.scss') : requireServerCss(require.resolve('./Danmu.scss'));
//const kitten = __CLIENT__ ? require('./kitten.jpg') : requireServerImage('./kitten.jpg');

class Danmu extends Component {

  static propTypes = {
    roomData: PropTypes.object
  }

  state = {

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
  }

  render() {

    const {roomData: {url}} = this.props;
    console.log('props', this.props);

    return (
      <div className={styles.danmu}>
        <div className={styles.frame}>
          <div className={styles.wordsContainer}>
            <div className={styles.logo}>一起弹幕</div>

          </div>
          <div className={styles.inputContainer}>
            <div className={styles.textField}>
              <TextField
                hintText="发一发弹幕"
                fullWidth={true}
                id="url"
                />
            </div>
            <div className={styles.sendButton}>
              <FlatButton label="发送" />
            </div>
          </div>
          <iframe src={url} width="100%" height="100%"/>
        </div>
        <div className={styles.sideBar}>
          <div className={styles.banner}>
            在线用户
          </div>
        </div>
      </div>
    );
  }
}


@connect(state => ({
  roomData: state.room.roomData
}))
export default
class DanmuContainer {
  static propTypes = {
    roomData: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  }

  static fetchData(store, params) {
    if (!isRoomLoaded(store.getState())) {
      return store.dispatch(loadRoom(params.roomId));
    }
  }

  render() {
    const { roomData, dispatch } = this.props;
    return <Danmu roomData={roomData} {...bindActionCreators(roomActions, dispatch)}>
      {this.props.children}
    </Danmu>;
  }
}
