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
      notFound: false,
      showMap: false
    };


	}

	getToursFromDatabase (options) {
	  console.log("first time called")
	  $.post('http://localhost:8080/search',
	  	{data: options}
	  )

	  .done(tours => {
	  	//checks if the tours is empty array
	  	if (tours.length === 0) {
	  		this.setState ({
	  			notFound: true,
	  			showMap: false
	  		})
	  	} else {
	  	//when it finds, changes back to false so it is not shown	
	  		this.setState ({
	  			notFound: false,
	  			showMap: true
	  		})
	  	}
	   
	  	this.setState ({
	  			tours: tours
			// Only show map if a search has been entered and there are more than 0 results
	  	// if (tours.length > 0) {
	   // 		this.setState({
	  	// 		tours: tours,
	  	// 		showMap: true
	  	// 	})
	  	// } else {
	  	// 	this.setState({
	  	// 		tours: [],
	  	// 		showMap: false
	  	// 	})
	  	// }
	  })
	  })
	  .fail(({responseJSON}) => {
	  	console.log("insideerror")
	    responseJSON.error.errors.forEach((err) =>
	      console.error(err)
	    )
	  });
	};
	

	changeFound () {
		this.setState ({
  		notFound: false
  	})
	};


	render() {
		
			var place = <p> Could not find the result, please try again </p>
 
		return (
			<div>
				<SearchBar getToursFromDatabase = {this.getToursFromDatabase.bind(this)} />
				<SearchList tours={this.state.tours}/>
				{this.state.notFound ? place : null}
				{this.state.showMap ? <SearchMap tours={this.state.tours}/> : null}
			</div>
		)
	}
}
