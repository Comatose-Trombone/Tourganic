import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import Navigation from './Navigation'
import Profile from './profile/Profile'
import Search  from './search/Search'
import SignIn from './account/SignIn'
import SignUp from './account/SignUp'
import Welcome from './welcome/Welcome'

class App extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {
		return (
			<div>
				<Navigation />
				{this.props.children}
			</div>
		)
	}
}

render((
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Welcome} />
			<Route path='/welcome' component={Welcome} />
		  <Route path='/profile' component={Profile} />
		  <Route path="/search" component={Search} />
		  <Route path='/signin' component={SignIn} />
		  <Route path='/signup' component={SignUp} />
		</Route>
	</Router>
), document.getElementById('app'));

