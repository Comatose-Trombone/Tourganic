import React from 'react'

export default class SearchListEntry extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				This is the tour!
				{this.props.tour}
			</div>
		)
	}
}

// export SearchListEntry = ({tour}) => (
// 	<div>
// 		This is the tour!
// 		{tour}
// 	</div>
// );