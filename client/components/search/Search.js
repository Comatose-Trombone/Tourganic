 import React from 'react'
 import SearchBar from './SearchBar'
 import SearchList from './SearchList'
 import {Link} from 'react-router'

 export default class Search extends React.Component {
	constructor(props) {
		super(props)
		console.log("Made it to Search");

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
