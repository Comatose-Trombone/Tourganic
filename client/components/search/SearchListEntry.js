import React from 'react'


export default class SearchListEntry extends React.Component {
	constructor(props) {
		super(props)
	}


	render() {
		return (
		//on click, will pass props, which contains the tour info, back up to Search.js
			<div style={{backgroundImage: 'url(' + this.props.tour.pictureUrl + ')', backgroundRepeat: 'no-repeat', backgroundSize:'cover', backgroundPosition: 'center center'}} className='searchTourEntry' onClick={this.props.getTourInfo.bind(null, this.props.tour)}>
				<div className='searchListEntryName'>{this.props.tour.name}</div>
				<div className='searchListEntryPrice'>${this.props.tour.price}</div>
			</div>
		)
	}
};


