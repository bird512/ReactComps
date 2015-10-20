import React, {Component} from 'react';
import ReactQuill  from 'react-quill';

export default class Editor extends Component{
	constructor(props){
		super(props);
		this.state = {
			value:''
		}
		let defaultColors = ReactQuill.Toolbar.defaultColors;

		this.toolbarItems = [
			{ label:'Formats', type:'group', items: [
				
				{ label:'Size', type:'size', items: [
					{ label:'Smaller',  value:'10px' },
					{ label:'Normal', value:'13px' },
					{ label:'Larger',  value:'18px' },
					{ label:'Huge',    value:'32px' }
				]},
				{ type:'separator' },
				{ label:'Alignment', type:'align', items: [
					{ label:'', value:'center' },
					{ label:'', value:'left' },
					{ label:'', value:'right' },
					{ label:'', value:'justify' }
				]}
			]},

			{ label:'Text', type:'group', items: [
				{ type:'bold', label:'Bold' },
				{ type:'italic', label:'Italic' },
				{ type:'strike', label:'Strike' },
				{ type:'underline', label:'Underline' },
				{ type:'separator' },
				{ type:'color', label:'Color', items:defaultColors },
				{ type:'background', label:'Background color', items:defaultColors },
				{ type:'separator' },
				{ type:'link', label:'Link' }
			]},

			{ label:'Blocks', type:'group', items: [
				{ type:'bullet', label:'Bullet' },
				{ type:'separator' },
				{ type:'list', label:'List' }
			]}

		];
	} 

	render(){
		return  (
			<div className='quill-wrapper'>
					<ReactQuill className='editor' theme='snow' toolbar={this.toolbarItems} value={this.state.value} />
			</div>);
	}

}