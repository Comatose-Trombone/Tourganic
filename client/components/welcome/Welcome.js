import React from 'react'
import {Jumbotron} from 'react-bootstrap'

export default class Welcome extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {

		return (
				<Jumbotron className='jumbotron'>
				<span className='welcomeText'> Welcome to Tourganic</span>
				</Jumbotron>
		)
	}
}