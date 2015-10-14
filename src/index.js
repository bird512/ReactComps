import React from 'react';
import ReactDOM from 'react-dom';
import AutoSizeTextarea from './comp/AutoSizeTextarea';

// do this to enable React tools chrome plugin
window.React = React;

ReactDOM.render( < AutoSizeTextarea defaultValue = 'test value' / > , document.getElementById(
  'content'));
