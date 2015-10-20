import 'babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import AutoSizeTextarea from './comp/AutoSizeTextarea';
import Editor2 from './lib/editor2';
import ReactQuill  from 'react-quill';
//import '../assets/css/quill.base.css';
import '../assets/css/quill.snow.css';
import '../assets/css/style.css';
import Editor from './comp/Editor';

// do this to enable React tools chrome plugin
window.React = React;
let testData = {
  childNodes: [
    {
      tagName: 'p',
      nodeType: 1,
      childNodes: [{
        nodeType: 3,
        textContent: '0123456789'
      }]
    }, {
      tagName: 'p',
      nodeType: 1,
      childNodes: [{
        nodeType: 3,
        textContent: 'Two paragrapghs!'
      }]
    }, {
      tagName: 'p',
      nodeType: 1,
      childNodes: [{
        nodeType: 3,
        textContent: 'And the third for testing'
      }]
    }, {
      tagName: 'p',
      nodeType: 1,
      childNodes: [
        {
          tagName: 'span',
          nodeType: 1,
          childNodes: [{
            nodeType: 3,
            textContent: 'Here is '
          }]
        }, {
          tagName: 'b',
          nodeType: 1,
          childNodes: [{
            nodeType: 3,
            textContent: 'the '
          }]
        }, {
          tagName: 'i',
          nodeType: 1,
          childNodes: [
            {
              tagName: 'b',
              nodeType: 1,
              childNodes: [{
                nodeType: 3,
                textContent: 'test '
              }]
            }, {
              tagName: 'span',
              nodeType: 1,
              childNodes: [{
                nodeType: 3,
                textContent: 'asdfghjk '
              }]
            }, {
              tagName: 'u',
              nodeType: 1,
              childNodes: [{
                tagName: 'del',
                nodeType: 1,
                childNodes: [{
                  nodeType: 3,
                  textContent: 'foobar '
                }]
              }]
            }, {
              tagName: 'span',
              nodeType: 1,
              childNodes: [{
                nodeType: 3,
                textContent: 'else'
              }]
            }
          ]
        }
      ]
    }, {
      tagName: 'p',
      nodeType: 1,
      childNodes: [{
        nodeType: 3,
        textContent: 'Last line not formatted text'
      }]
    }
  ],
  nodeType: 1,
  tagName: 'div'
};
//ReactDOM.render( < AutoSizeTextarea defaultValue = 'test value' / > , document.getElementById('content'));
//ReactDOM.render( <ReactQuill className='editor'/> , document.getElementById('content'));
//ReactDOM.render( <div><ReactQuill className='editor' theme='snow'/> aa <Editor /></div>, document.getElementById('content'));
ReactDOM.render( <Editor /> , document.getElementById('content'));
