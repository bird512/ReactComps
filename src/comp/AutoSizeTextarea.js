import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class AutoSizeTextarea extends Component {
  onChange(e) {
    let {target} = e;
    this.resize(target);
  }
  resize(target){
    target.style.height = 'auto';
    target.style.height = (target.scrollHeight + 10) + 'px';
  }

  componentDidMount(){
    let target = this.refs.textarea;
    this.resize(target);
  }

  render() {
    return <textarea ref='textarea' {...this.props} style={{'height':'100%'}} onChange = {this.onChange.bind(this)}/> ;
  }
}
