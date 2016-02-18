import React from 'react'
import {}
import { Router, Route, Link } from 'react-router'

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<h1>Tour-Allure</h1>
			<Nav />
		)
	}
}

render((
	<Router>
		<Route path="/" component={App}>
			<IndexRoute component={Welcome} />
		</Route>
	</Router>
	), document.body);