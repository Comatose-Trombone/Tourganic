import React from 'react'

export default class SearchListEntry extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				{this.props.tour}
			</div>
		)
	}
};

