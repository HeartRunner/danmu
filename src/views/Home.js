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
    url: '',
    urlError: '',
    title: ''
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  }

  onTextKeyDown(event){
    if(event.keyCode===13){
      this.onSubmit();
    }
  }

  onChange(event) {
    this.setState({url: event.target.value, urlError:''});
  }
  onTitleChange(event){
    this.setState({title: event.target.value});
  }
  onSubmit() {
      //event.preventDefault();
      const errors = generatorValidation({
        url: this.state.url
      });
      if (Object.keys(errors).some(key => errors[key])) {
        this.setState({urlError: errors.url});
      } else {
        this.props.create(this.state.url, this.state.title, this.context.router);
        this.setState({urlError:''});
      }
  }
  onRandomSubmit(){
    this.props.getActive(this.context.router);
  }

  render() {
    const {
      createError,
      handleChange,
      error, loading
      } = this.props;
    let {url, urlError, title} = this.state;

    return (
      <div className={styles.home}>
        <div className={styles.main}>
            <h1>一起弹幕</h1>
            <div className={styles.description}>
              好友间的弹幕，无论何处何时
            </div>
            <div className={styles.urlText}>

              <TextField
                     hintText="请输入网址,例如：http://live.zjstv.com/"
                     fullWidth={true}
                     id="url"
                     value={url}
                     onChange={::this.onChange}
                     onBlur={::this.onChange}
                     onKeyDown={::this.onTextKeyDown}/>
              <TextField
                     hintText="可选：房间标题"
                     fullWidth={true}
                     id="title"
                     value={title}
                     onChange={::this.onTitleChange}
                     onBlur={::this.onTitleChange}
                     onKeyDown={::this.onTextKeyDown}/>

              {urlError && <div className={styles.textDanger}>{urlError}</div>}
              {createError && <div className={styles.textDanger}>{createError}</div>}
            </div>
            <RaisedButton disabled={urlError.length>0||url.length===0}
              className={styles.submitButton} fullWidth={true} onClick={::this.onSubmit}
              label={loading?'创建中':'走起'}/>
            <RaisedButton style={{marginTop:'12'}} className={styles.submitButton} fullWidth={true} onClick={::this.onRandomSubmit}
              label="随机加入"/>
            <div className={styles.copyright}>
              测试原型，联系：yaotianyu0512@gmail.com
            </div>
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