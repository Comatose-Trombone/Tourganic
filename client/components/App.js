/*****************************
This is a functional router, with some bugs. Code is very un-clean right now. 
******************************/



import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div><Link to="/search">Search For Tours</Link></div>
		 	{/****** what does the line below do? ****/}
				{this.props.children}
			</div>
		)
	}
}

// ReactDOM.render(<App />, document.getElementById('app'));
render((
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component= { welcome } />
			<Route path="/search" component={searchApp} />
		</Route>
	</Router>
), document.getElementById('app'));

