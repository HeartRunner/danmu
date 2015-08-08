import React, {Component, PropTypes} from 'react';
import {requireServerCss, requireServerImage} from '../util';

import reduxForm from 'redux-form';
import generatorValidation from '../validation/generatorValidation';
import {TextField, RaisedButton} from 'material-ui';

const styles = __CLIENT__ ? require('./homeForm.scss') : requireServerCss(require.resolve('./homeForm.scss'));

@reduxForm('create', generatorValidation)
export default class homeForm extends Component {
  static propTypes ={

  }
/*
  static childContextTypes = {
    muiTheme: PropTypes.object
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  }
*/
  handleSubmit(event) {
    event.preventDefault();
    const {data, showAll, reset} = this.props;
    const errors = generatorValidation(data);
    if (Object.keys(errors).some(key => errors[key])) {
      showAll();
    } else {
      console.log(this.props);
      this.props.onSubmit(this.props.url);
      reset();
    }
  }

  render() {
    const {
      data: {url},
      errors: {url: urlError},
      visited: {url: urlVisited},
      handleChange,
      error, loading
      } = this.props;
    return (
      <div className={styles.main}>
        <h1>一起弹幕</h1>
        <div className={styles.urlText}>
          <TextField
            hintText="请输入网址"
            fullWidth={true}
            id="url"
            value={url}
            onChange={handleChange('url')}
            onBlur={handleChange('url')}/>
          {urlError && urlVisited && <div className={styles.textDanger}>{urlError}</div>}
        </div>
        <RaisedButton primary={true} disabled={urlError}
                      className={styles.submitButton} fullWidth={true} onClick={::this.handleSubmit}
                      label={loading?'创建中':'走起'}>
        </RaisedButton>
      </div>
     );
  }
}