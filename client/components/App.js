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
			<div className='motherContainer'>
				<div className='jumbotron'>
					<span className='welcomeText'>Welcome To Tour-Allure</span>
				</div>
				<div className='nav'>
					<ul> 
						<li><Link to="/search">Search</Link></li>
						<li><Link to="/profile">Profile</Link></li>
					</ul> 
				</div>
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

