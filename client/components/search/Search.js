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
    };


	}

	getToursFromDatabase (options) {
	  $.post('http://localhost:8080/search',
	  	{data: options}
	  )

	  .done(tours => {
	  	//checks if the tours is empty array
	  	if (tours.length === 0) {
	  		this.setState ({
	  			notFound: true,
	  		})
	  	} else {
	  	//when it finds, changes back to false so it is not shown	
	  		this.setState ({
	  			notFound: false,
	  		})
	  	}
	   
	  	this.setState ({
	  			tours: tours
	  	})
	  })
	  .fail(({responseJSON}) => {
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
			<div className="searchContainer">
				<div className="searchList-BarContainer">
					<SearchBar getToursFromDatabase = {this.getToursFromDatabase.bind(this)} />
					<SearchList tours={this.state.tours}/>
				{this.state.notFound ? place : null}
				</div>
				<div className='searchMapContainer'>
				{this.state.tours.length > 0 ? <SearchMap tours={this.state.tours}/> : null}
				</div>
			</div>
		)
	}
}
