import React, {Component, PropTypes} from 'react';
import {requireServerCss, requireServerImage} from '../util';
import reduxForm from 'redux-form';
import generatorValidation from '../validation/generatorValidation';
import {TextField, RaisedButton} from 'material-ui';
import mui from 'material-ui';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as roomActions from '../actions/roomActions';

import Router from 'react-router';



let ThemeManager = new mui.Styles.ThemeManager();
ThemeManager.setTheme(ThemeManager.types.DARK);
const styles = __CLIENT__ ? require('./Home.scss') : requireServerCss(require.resolve('./Home.scss'));

class Home extends Component {

  static propTypes = {
    errorNetwork: PropTypes.string,
    loading: PropTypes.bool,
    createError: PropTypes.string,
    create: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static childContextTypes = {
    muiTheme: PropTypes.object
  }

  state = {
    url: 'http://baidu.com',
    urlError: ''
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  }

  onChange(event) {
    this.setState({url: event.target.value, urlError:''});
  }
  onSubmit(event) {
      event.preventDefault();
      const errors = generatorValidation({
        url: this.state.url
      });
      if (Object.keys(errors).some(key => errors[key])) {
        this.setState({urlError: errors.url});
      } else {
        this.props.create(this.state.url, this.context.router);
        this.setState({urlError:''});
      }
  }

  render() {
    const {
      createError,
      handleChange,
      error, loading
      } = this.props;
    let {url, urlError} = this.state;

    return (
      <div className={styles.home}>
        <div className={styles.main}>
            <h1>一起弹幕</h1>
            <div className={styles.urlText}>
              <TextField
                     hintText="请输入网址"
                     fullWidth={true}
                     id="url"
                     value={url}
                     onChange={::this.onChange}
                     onBlur={::this.onChange}/>
              {urlError && <div className={styles.textDanger}>{urlError}</div>}
              {createError && <div className={styles.textDanger}>{createError}</div>}
            </div>
            <RaisedButton primary={true} disabled={urlError.length>0||url.length===0}
              className={styles.submitButton} fullWidth={true} onClick={::this.onSubmit}
              label={loading?'创建中':'走起'}>
            </RaisedButton>
        </div>

      </div>
    );
  }
}

@connect(state => ({
  loading: state.room.loadingCreate,
  createError: state.room.createErr,
  roomData: state.room.roomData
}))
export default class HomeContainer extends Component{
  static propTypes = {
    createError: PropTypes.string,
    loading: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
  }

/*
  componentWillReceiveProps(nextProps){
    if(nextProps.roomData&&nextProps.roomData.id){
      let nextPath = `/${nextProps.roomData.id}`;
      if(nextProps.route.path!==nextPath){
        console.log('there u go');
        this.context.router.transitionTo(nextPath);
      }

    }
  }
*/
  render() {
    const { createError, loading, dispatch } = this.props;
    return <Home createError={createError} loading={loading}
      {...bindActionCreators(roomActions, dispatch)}/>;
  }

}