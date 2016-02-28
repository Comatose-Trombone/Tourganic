import React from 'react'


export default class SearchBar extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
        name: "",
        city: "",
        price: ""
    }
	}

	handleInputChange(prop, e) {
    var newState = {}
    newState[prop] = e.target.value;
    this.setState(newState);
  };
  reset(prop, e) {
  var newState = {};
  newState[prop] = '';
  this.setState(newState);
}


	render() {
		return (
			<div className="searchBarContainer">
			  <form className="searchForm">
		        <input className="searchInput" value={this.state.name} placeholder="Tour Name" onChange = {this.handleInputChange.bind(this, "name")} onClick={this.reset.bind(this, 'name')}/>
            <input className="searchInput" value={this.state.city} placeholder="City" onChange = {this.handleInputChange.bind(this,"city")} onClick={this.reset.bind(this, 'city')}/>
            <select className="searchInput" value={this.state.price} onChange = {this.handleInputChange.bind(this,'price')}>
    				  <option value="" selected>Price Range</option>
    				  <option>$</option>
    				  <option>$$</option>
    				  <option>$$$</option>
    				  <option>$$$$</option>
				    </select>
		        <input className="searchInput" type="submit" value="Search" onClick = { (e) => this.props.getToursFromDatabase(this.state)}/>
			  </form>
			</div>
		)
	}
};