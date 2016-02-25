import React from 'react'


export default class SearchListEntry extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<div>{this.props.tour.name}</div>
				<div>{this.props.tour.location}</div>
				<div>price: ${this.props.tour.price}</div>
				<div>Created By: {this.props.tour.createdBy}</div>
			</div>
		)
	}
};
