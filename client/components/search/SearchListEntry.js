import React from 'react'


export default class SearchListEntry extends React.Component {
	constructor(props) {
		super(props)
	}


	render() {
		return (
		//on click, will pass props, which contains the tour info, back up to Search.js
			<div className='searchTourEntry' onClick={this.props.getTourInfo.bind(null, this.props.tour)}>
				<div>Tour: {this.props.tour.name}</div>
				<div>City: {this.props.tour.city}</div>
				<div>Price: ${this.props.tour.price}</div>
				<div>Tour Guide: {this.props.tour.createdBy}</div>
			</div>
		)
	}
};
