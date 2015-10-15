import React from 'react';
import ReactDOM from 'react-dom';
import AutoSizeTextarea from './comp/AutoSizeTextarea';
import Editor2 from './lib/editor2';

// do this to enable React tools chrome plugin
window.React = React;

//ReactDOM.render( < AutoSizeTextarea defaultValue = 'test value' / > , document.getElementById('content'));
ReactDOM.render( < Editor2 / > , document.getElementById('content'));
//ReactDOM.render( < editor3 defaultValue = 'test value'/ > , document.getElementById('content'));
