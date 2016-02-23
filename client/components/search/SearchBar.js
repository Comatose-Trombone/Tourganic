import React from 'react'


export default class SearchBar extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
      value: ""
    }
	}

	handleInputChange(e) {
    this.setState({
      value: e.target.value
    });
  }

	render() {
		return (
			<div>
				 <form class="searchForm" >
		      <input class="searchLocation" placeholder="Put Location" onChange = {this.handleInputChange.bind(this)}/>
		      <input type="submit" onClick = { (e) => this.props.getToursFromDatabase(this.state.value)}/>
			   </form>
			</div>
		)
	}
};