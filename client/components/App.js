import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import Profile from './profile/Profile'
import Search  from './search/Search'

class App extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {
		return (
			<div>
				<div> Welcome to Tour Allure! </div>
				<nav class='nav'>
					<ul> 
						<li><Link to="/search">Search</Link></li>
						<li><Link to="/profile">Profile</Link></li>
					</ul> 
				</nav>
				{this.props.children}
			</div>
		)
	}
}

render((
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			  <Route path='/profile' component={Profile} />
  		  <Route path="/search" component={Search} />
		</Route>
	</Router>
), document.getElementById('app'));

