/*****************************
This is a functional router, with some bugs. Code is very un-clean right now. 
******************************/

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import Profile from './profile/Profile'
// import { searchApp } from './search/Search.js'


class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div><Link to="/search">Search</Link></div>
		 	{/****** what does the line below do? ****/}
				{this.props.children}
			</div>
		)
	}
}

// ReactDOM.render(<App />, document.getElementById('app'));


/* Code is copied here because we were having issues referencing them from separate files */
// class searchApp extends React.Component {
// 	constructor(props) {
// 		super(props)
// 	}
// 	render() {
// 		return (
// 			<div>
// 				This is the search page
// 			</div>
// 		)
// 	}
// }

class welcome extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div>
				This is the welcome
			</div>
		)
	}
}

render((
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component= { welcome } />
			 <Route path="/search" component={Profile} />
			<Route path='/profile' component={Profile} />

		</Route>
	</Router>
), document.getElementById('app'));

