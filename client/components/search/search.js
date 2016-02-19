 import React from 'react'
 import Search_Bar from 'Search_Bar'
 import Search_List from 'Search_List'
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
				<Search_Bar />
				<Search_List tours={this.state.tours}/>
			</div>
		)
	}
}