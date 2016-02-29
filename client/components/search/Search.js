 import React from 'react'
 import SearchBar from './SearchBar'
 import SearchList from './SearchList'
 import SearchMap from './SearchMap'
 import {Link} from 'react-router'
 import $ from 'jquery'
 import Tour from '../tour/Tour'

 export default class Search extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
      tours: [],
      notFound: false,
      currentTour: {name: 'default', location: 'default', price:'1', date:'1/1/1'},
      show: false
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
	
	//this is passed down to SearchList, which is passed down to SearchListEntry
	getTourInfo(tour) {
		//props will be passed into here, which contains all of the tour information
		this.setState({
			currentTour: tour,
			show: true
		}, function() {console.log(this.state.currentTour, this.state.show)})
		//then change the modal state to show.
	}

	//this is passed down to Tour.
	close() {
    this.setState({show:false});
  };

	changeFound () {
		this.setState ({
  		notFound: false
  	})
	};


	render() {
		
			var place = <p> Could not find the result, please try again </p>
 			var tourProps = {currentTour: this.state.currentTour, close: this.close.bind(this), show: this.state.show}
 			var searchListProps = {tours: this.state.tours, getTourInfo: this.getTourInfo.bind(this)}
		return (

			<div className="searchContainer">
				<Tour {...tourProps} />
				<div className="searchList-BarContainer">

					<SearchBar getToursFromDatabase = {this.getToursFromDatabase.bind(this)} />
					<SearchList {...searchListProps}/>
					{this.state.notFound ? place : null}

				</div>
				<div className='searchMapContainer'>
				{this.state.tours.length > 0 ? <SearchMap tours={this.state.tours}/> : null}
				</div>
			</div>
		)
	}
}





