import React,{Component} from 'react';
import ReactDOM from 'react-dom';

import heading from './heading';
// import {applyHeadingOne,applyHeadingTwo,applyHeadingThree,applyHeadingFour,applyHeading,getTopLevelSelectionNode} from './heading';
import keyhandlers from './keyhandlers';
import selection from './selection';
import formatting from './formatting';

export default class Editor2 extends Component{
	constructor(props) {
	    super(props);
	   //  this.displayName = 'RTEditor',
  		//this.mixins = [selection, keyhandlers, headings, formatting];
  		// this.topLevelNodes = ['div', 'p', 'h1', 'h2', 'h3', 'h4', 'ul', 'ol'],
	    //this.state = this.getInitialState();
		let rootKey = 'root';
		let modifiedData = this.addKeysToTags(this.props.data, rootKey);
		
		//let {applyHeadingOne,applyHeadingTwo,applyHeadingThree,applyHeadingFour,applyHeading,getTopLevelSelectionNode} = heading;
		// this.applyHeadingOne = applyHeadingOne;
		// this.applyHeadingTwo = applyHeadingTwo;
		// this.applyHeadingThree = applyHeadingThree;
		// this.applyHeadingFour = applyHeadingFour;
		// this.applyHeadingOne = applyHeadingOne;
		Object.assign(this,heading);
		Object.assign(this,keyhandlers);
		Object.assign(this,selection);
		Object.assign(this,formatting);
		//console.log('applyHeadingOne = ',applyHeadingOne);
		console.log('this.applyHeadingOne = ',this.applyHeadingOne);
		this.state = {
			content:modifiedData,
			rootKey: rootKey
		}
	    //console.log('this.state = ',this.state);
	}

	addKeysToTags(content,previousLevel){
	  	var item, this$ = this;
	    previousLevel = previousLevel;
	    item = 0;
	    content.childNodes.map(function(item, index){
	      var key;
	      if (item.nodeType !== 3) {
	        key = previousLevel + '.' + index;
	        item['key'] = key;
	        this$.addKeysToTags(item, key);
	      }
	      return item;
	    });
	    content['key'] = previousLevel;
		//console.log('addKeysToTags content = ',content);
	    return content;
	}
	convertToJson(){
	    var c, result;
	    c = document.querySelector('#contenteditable');
	    return result = this.traverse(c);
  	}

  	traverse(node){
	    var childNodes, res$, i$, ref$, len$, childNode;
	    res$ = [];
	    for (i$ = 0, len$ = (ref$ = node.childNodes).length; i$ < len$; ++i$) {
	      childNode = ref$[i$];
	      if (childNode.nodeType === 1) {
	        res$.push(this.traverse(childNode));
	      } else {
	        res$.push({
	          nodeType: childNode.nodeType,
	          textContent: node.textContent
	        });
	      }
	    }
	    childNodes = res$;
	    return {
	      nodeType: node.nodeType,
	      tagName: node.tagName.toLowerCase(),
	      childNodes: childNodes
	    };
	  }
	  updateState(content, selectionElTagKey, selectionStart){
	    return this.setState({
	      content: content,
	      selectionElTagKey: selectionElTagKey,
	      selectionStart: selectionStart || 0
	    });
	  }
	  onKeyPress(event){
	    console.log('enter onKeyPress. this = ',this);
	    var content, selectionModel;
	    content = this.state.content;
	    event.preventDefault();
	    event.stopPropagation();
	    if (event.key === 'Enter') {
	      selectionModel = this.getSelectionModel();
	      if (selectionModel.multilineSelection) {
	        if (selectionModel.normalTextOnly) {
	          return this.handleEnterKeyForMultilineNormalText(selectionModel);
	        } else {
	          return this.handleEnterKeyForMultilineFormattedText(selectionModel);
	        }
	      } else {
	        if (selectionModel.normalTextOnly) {
	          return this.handleEnterKeyForSingleLineNormalText(selectionModel);
	        } else {
	          return this.handleEnterKeyForSingleLineFormattedText(selectionModel);
	        }
	      }
	    } else {
		  console.log('enter onKeyPress handleCharacterChange ');
	      return this.handleCharacterChange(true, event.key);
	    }
	  }
	  onKeyDown(event){
	    console.log('enter onKeyPress this = ',this);
	    var content;
	    console.log(event.key);
	    content = this.state.content;
	    if (event.key === 'Backspace' || event.key === 'Delete') {
	      event.preventDefault();
	      event.stopPropagation();
	      return this.handleCharacterChange(false, event.key);
	    }
	  }
	  componentDidUpdate(prevProps, prevState){
	    var range, selection, el;
	    range = document.createRange();
	    selection = window.getSelection();
	    if (this.state.selectionStart === 'last-character') {
	      el = document.querySelector("[data-tag-key='" + this.state.selectionElTagKey + "']").lastChild;
	      range.setStart(el, el.length);
	    } else {
	      el = document.querySelector("[data-tag-key='" + this.state.selectionElTagKey + "']");
	      if (el.firstChild) {
	        el = el.firstChild;
	        range.setStart(el, this.state.selectionStart);
	      } else {
	        range.setStartBefore(el);
	      }
	    }
	    range.collapse(true);
	    selection.removeAllRanges();
	    return selection.addRange(range);
	  }
	  renderJsonToHtmlTwo(node){
	    var this$ = this;
	    if (node.childNodes && node.childNodes.length === 1 && node.childNodes[0].nodeType === 3) {
	      return React.createFactory(node.tagName)({
	        'data-tag-key': node.key
	      }, node.childNodes[0].textContent);
	    } else if (node.tagName === 'br') {
	      return React.createFactory(node.tagName)(null);
	    } else {
	      return React.createFactory(node.tagName)({
	        'data-tag-key': node.key
	      }, node.childNodes.map(function(childNode){
	        return this$.renderJsonToHtmlTwo(childNode);
	      }));
	    }
	  }
	  
	  render(){
	  	//console.log('applyHeadingOne = ',applyHeadingOne);
		return <div className='react-rte'>
				<div className='rte-toolbar'>
					<button onClick={this.applyHeadingOne.bind(this)}>H1</button>
					<button onClick={::this.applyHeadingTwo}>H2</button>
					<button onClick={::this.applyHeadingThree}>H3</button>
					<button onClick={::this.applyHeadingFour}>H4</button>
				
					<button onClick={::this.applyBoldFormat}>B</button>
					<button onClick={::this.applyItalicFormat}>I</button>
					<button onClick={::this.applyUnderlineFormat}>U</button>
					<button onClick={::this.applyStriketroughFormat}>S</button>
				
				</div>
				<div id='contenteditable' style={{'white-space':'pre'}} contentEditable='true' 
					onKeyPress={::this.onKeyPress} onKeyDown={::this.onKeyDown}>
					{this.renderJsonToHtmlTwo(this.state.content)}
				</div>
				<button onClick={::this.convertToJson}>Convert</button>
			   	<div className='result' style={{'display':'block'}}>{
			   		this.state.content.childNodes.map(function(item){
				      return React.createFactory(item.tagName)({
				        'data-tag-key': item.key
				      }, item.childNodes.map(function(cn){
				        if (cn.nodeType === 3) {
				          return cn.textContent;
				        } else {
				          return React.createFactory(cn.tagName)({
				            'data-tag-key': cn.key
				          }, cn.childNodes.map(function(cn2){
				            if (cn2.nodeType === 3) {
				              return cn2.textContent;
				            }
				          }));
				        }
				      }));
				    })
			   	}</div>
			   </div>;
	    
	  }
	  render2(){
		let div = React.createFactory('div');
		let p = React.createFactory('p');
		let button = React.createFactory('button');
	  	console.log(' in render div2 =',div);
	    return div({
	      className: 'react-rte'
	    }, div({
	      className: 'rte-toolbar'
	    }, button({
	      onClick: this.applyHeadingOne
	    }, 'H1'), button({
	      onClick: this.applyHeadingTwo
	    }, 'H2'), button({
	      onClick: this.applyHeadingThree
	    }, 'H3'), button({
	      onClick: this.applyHeadingFour
	    }, 'H4'), button({
	      onClick: this.applyBoldFormat
	    }, 'B'), button({
	      onClick: this.applyItalicFormat
	    }, 'I'), button({
	      onClick: this.applyUnderlineFormat
	    }, 'U'), button({
	      onClick: this.applyStriketroughFormat
	    }, 'S')), div({
	      id: 'contenteditable',
	      style: {
	        'white-space': 'pre'
	      },
	      contentEditable: true,
	      onKeyPress: this.onKeyPress,
	      onKeyDown: this.onKeyDown
	    }, this.renderJsonToHtmlTwo(this.state.content)), button({
	      onClick: this.convertToJson
	    }, 'Convert'), div({
	      className: 'result',
	      style: {
	        display: 'block'
	      }
	    }, this.state.content.childNodes.map(function(item){
	      return React.createFactory(item.tagName)({
	        'data-tag-key': item.key
	      }, item.childNodes.map(function(cn){
	        if (cn.nodeType === 3) {
	          return cn.textContent;
	        } else {
	          return React.createFactory(cn.tagName)({
	            'data-tag-key': cn.key
	          }, cn.childNodes.map(function(cn2){
	            if (cn2.nodeType === 3) {
	              return cn2.textContent;
	            }
	          }));
	        }
	      }));
	    })));
	  }
}