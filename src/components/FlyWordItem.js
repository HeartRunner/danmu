import React, {Component, PropTypes} from 'react';
import {requireServerCss} from '../util';
const styles = __CLIENT__ ? require('./FlyWordItem.scss') : requireServerCss(require.resolve('./FlyWordItem.scss'));

export default class FlyWordItem extends Component {

  static propTypes = {
    word: PropTypes.string.isRequired,
    windowHeight: PropTypes.number.isRequired,
    windowWidth: PropTypes.number.isRequired,
    removeWord: PropTypes.func,
    id: PropTypes.any
  }

  state = {
    width: this.props.word.length*20,
    right: -this.props.word.length*20
  }


  componentWillMount() {
    this.setState({
      top: this.randomTop()
    })
  }
  componentDidMount(){
    setTimeout(()=>{
      this.setState({right: this.state.right + 200});
    }, 500)
    this.moveHandle = setInterval(()=>{
      if(this.state.right > this.props.windowWidth + this.state.width) {
        ::this.removeHandle();
      }
      else this.setState({right: this.state.right + 200})
    }, 5000)
  }

  componentWillUnmount(){
    ::this.removeHandle();
  }

  randomTop(){
    return Math.round((12 + Math.random() * (this.props.windowHeight-32))/20)*20;
  }

  removeHandle(){
    if(this.moveHandle){
      clearInterval(this.moveHandle);
      this.moveHandle = null;
    }
    this.props.removeWord(this.props.id);
  }

  render() {
    const {word} = this.props;
    const {top, right, width} = this.state;
    let style={
      top: top,
      right: right,
      minWidth: width
    }
    return (
      <div style={style} className={styles.flyWordItem}>
        {word}
      </div>
    );
  }
}

