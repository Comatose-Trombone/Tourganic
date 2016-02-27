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
				<div>{this.props.tour.name}</div>
				<div>{this.props.tour.city}</div>
				<div>price: ${this.props.tour.price}</div>
				<div>Created By: {this.props.tour.createdBy}</div>
			</div>
		)
	}
};
