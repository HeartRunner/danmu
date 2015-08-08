import React, {Component, PropTypes} from 'react';
import {requireServerCss, requireServerImage} from '../util';
import {isRoomLoaded} from '../reducers/room';
import {getRoom as loadRoom} from '../actions/roomActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as roomActions from '../actions/roomActions';

const styles = __CLIENT__ ? require('./Danmu.scss') : requireServerCss('./Danmu.scss');
//const kitten = __CLIENT__ ? require('./kitten.jpg') : requireServerImage('./kitten.jpg');

class Danmu extends Component {

  static propTypes = {
    roomData: PropTypes.object
  }

  state = {

  }


  render() {

    const {roomData: {url}} = this.props;
    console.log('props', this.props);

    return (
      <div className={styles.danmu}>
        <iframe className={styles.frame} src={url} width="100%" height="100%"/>
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
