 import React from 'react'
 import SearchBar from './SearchBar'
 import SearchList from './SearchList'
 import {Link} from 'react-router'
 import $ from 'jquery'

 export default class Search extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
      tours: [],
      notFound: false
    };

	}

	getToursFromDatabase (options) {
	  console.log("first time called")
	  $.post('http://localhost:8080/search',
	  	{data: options}
	  )
	  .done(data => {
	  	if (data.length === 0) {
	  		this.setState ({
	  			notFound: true
	  		})
	  	} else {
	  		this.setState ({
	  			notFound: false
	  		})
	  	}
	   
	  	this.setState ({
	  			tours: data,
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
			</div>
		)
	}
}
