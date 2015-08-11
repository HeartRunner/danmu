import React, {Component, PropTypes} from 'react';
import {requireServerCss} from '../util';
import FlyWordItem from './FlyWordItem';

const styles = __CLIENT__ ? require('./FlyWords.scss') : requireServerCss(require.resolve('./FlyWords.scss'));

export default class FlyWords extends Component {
  static propTypes = {
    words: PropTypes.object,
    removeWord: PropTypes.func
  }

  state = {

  }

  componentWillMount(){
    if(__CLIENT__){
      this.setState({
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth
      })
    }
  }

  componentDidMount(){
    window.addEventListener('resize', ::this.getWindowSize);
  }

  componentWillUnmount(){
    window.removeEventListener('resize', ::this.getWindowSize);
  }

  getWindowSize(){
    this.setState({
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth
    })
  }

  render() {
    const {words, removeWord} = this.props;
    const {windowWidth, windowHeight} = this.state;
    return (
      <div className={styles.flyWords}>
        {
          Object.keys(words).map((key)=> {
            let word= words[key];
            return <FlyWordItem key={key} id={key} windowHeight={windowHeight} windowWidth={windowWidth} word={word} removeWord={removeWord}/>
          })
        }
      </div>
    );
  }
}

