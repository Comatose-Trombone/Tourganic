import React from 'react'

// class Search extends React.Component {
// 	constructor (props) {
// 		super(props);
// 		this.state = {
// 			value: ""
// 		}
// 	}

// 	render () {
// 		return (
// 			<div>
// 				<input
// 			</div>
// 		)
// 	}
// }

export default class SearchBar extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
      value: ""
    };
	}

	handleInputChange(e) {
    this.setState({
      value: e.target.value
    });
  }

	render() {
		return (
			<div>
				 <form class="searchForm" onSubmit >
		      <input class="searchLocation" placeholder="Put Location" onChange = {this.handleInputChange.bind(this)}/>
		      <input type="submit"/>
			   </form>
			</div>
		)
	}
}



// var SearchBar = ({handleSearch}) => (
// 	<div>
// 	 <form class="searchForm" onSubmit >
// 	 		This is the Search Bar
//       <input class="searchLocation" placeholder="Put Location"/>
//     </form>
// 	</div>





// )
 
// export SearchBar;