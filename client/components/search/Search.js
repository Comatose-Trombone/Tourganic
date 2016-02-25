 import React from 'react'
 import SearchBar from './SearchBar'
 import SearchList from './SearchList'
 import {Link} from 'react-router'
 import $ from 'jquery'

 export default class Search extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
      tours: []
    };

	}

	getToursFromDatabase (options) {
	  $.post('http://localhost:8080/search',
	  	{data: options}
	  )
	  .done(data => {
	  	console.log('data from search', data);
	   this.setState ({
	  			tours: [data.name]
	  		})
	  })
	  .fail(({responseJSON}) => {
	    responseJSON.error.errors.forEach((err) =>
	      console.error(err)
	    )
	  });
	};
	


	render() {
		return (
			<div>
				<SearchBar getToursFromDatabase = {this.getToursFromDatabase.bind(this)} />
				<SearchList tours={this.state.tours}/>
			</div>
		)
	}
}
