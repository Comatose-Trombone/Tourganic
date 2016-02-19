 import React from 'react'
 import SearchBar from 'SearchBar'
 import SearchList from 'SearchList'
 import {Link} from 'react-router'

 class searchApp extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
      tours: ["example tour 1"],
    };

	}

	render() {
		return (
			<div>
				<SearchBar />
				<SearchList tours={this.state.tours}/>
			</div>
		)
	}
}
