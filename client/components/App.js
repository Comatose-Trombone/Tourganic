import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import Profile from './profile/Profile'


class App extends React.Component {
	constructor(props) {
		super(props);

	}


	render() {
		return (
			<div>
				<div ><Link to="/search">Search</Link></div>
				<div><Link to="/profile">Profile</Link></div>


		 	{/****** what does the line below do? ****/}
				{this.props.children}
			</div>
		)
	}
}

// ReactDOM.render(<App />, document.getElementById('app'));


class welcome extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div>
				<div {/*onClick = { ()=>this.getProfile() }*/}> get Profile </div>
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

