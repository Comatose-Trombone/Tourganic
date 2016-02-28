import React from 'react'
import SearchListEntry from './SearchListEntry'
import underscore from 'underscore'

export default class SearchList extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="searchListContainer">
				{this.props.tours.map(tour =>
				<SearchListEntry tour={tour} />)}
			</div>
		)
	}
};


