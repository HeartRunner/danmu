import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as infoActions from '../actions/infoActions';
import {requireServerCss} from '../util';

const styles = __CLIENT__ ? require('./InfoBar.scss') : requireServerCss(require.resolve('./InfoBar.scss'));

class InfoBar extends Component {
  static propTypes = {
    info: PropTypes.object,
    load: PropTypes.func.isRequired
  }

  render() {
    const {info, load} = this.props;
    return (
      <div className={styles.infoBar + ' well'}>
        <div className="container">
          This is an info bar
          {' '}
          <strong>{info ? info.message : 'no info!'}</strong>
          <span className={styles.time}>{info && new Date(info.time).toString()}</span>
          <button className="btn btn-primary" onClick={load}>Reload from server</button>
        </div>
      </div>
    );
  }
}

@connect(state => ({
  info: state.info.data
}))
export default
class InfoBarContainer {
  static propTypes = {
    info: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  }

  render() {
    const { info, dispatch } = this.props;
    return <InfoBar info={info} {...bindActionCreators(infoActions, dispatch)}/>;
  }
}
