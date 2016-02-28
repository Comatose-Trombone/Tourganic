import React from 'react'


export default class SearchListEntry extends React.Component {
	constructor(props) {
		super(props)
	}

	handleTourClick() {
    window.location = 'http://localhost:8080/#/profile/' + this.props.tour._id;
  }
	render() {

		return (
			<div className='searchTourEntry' onClick={this.handleTourClick.bind(this)}>
				<div>Tour: {this.props.tour.name}</div>
				<div>City: {this.props.tour.city}</div>
				<div>Price: ${this.props.tour.price}</div>
				<div>Tour Guide: {this.props.tour.createdBy}</div>
			</div>
		)
	}
};
