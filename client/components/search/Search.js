 import React from 'react'
 import SearchBar from './SearchBar'
 import SearchList from './SearchList'
 import SearchMap from './SearchMap'
 import {Link} from 'react-router'
 import $ from 'jquery'

 export default class Search extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
      tours: [],
      showMap: false
    };


	}

	getToursFromDatabase (options) {
	  $.post('http://localhost:8080/search',
	  	{data: options}
	  )
	  .done(tours => {
	  	if (tours.length > 0) {
	   		this.setState({
	  			tours: tours,
	  			showMap: true
	  		})
	  	} else {
	  		this.setState({
	  			showMap: false
	  		})
	  	}
	  })
	  .fail(({responseJSON}) => {
	    responseJSON.error.errors.forEach((err) =>
	      console.error(err)
	    )
	  });
	};
	


	render() {
		// Only show map if a search has been entered and there are more than 0 results
		var map = <SearchMap tours={this.state.tours}/>;
		return (
			<div>
				<SearchBar getToursFromDatabase = {this.getToursFromDatabase.bind(this)} />
				<SearchList tours={this.state.tours}/>
				{this.state.showMap ? map : null}
			</div>
		)
	}
}
