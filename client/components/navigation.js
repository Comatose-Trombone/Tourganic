import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import $ from 'jquery'



export default class Navigation extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showLoginReminder: false
		}
	}

		handleProfileClick() {
			$.get('http://localhost:8080/profile')
				.done( (data) => {
					if (data.isAuth === false) {
						this.setState({
							showLoginReminder: true
						})
					} else {
						this.setState({
							showLoginReminder: false
						})
						window.location = 'http://localhost:8080/#/profile';
					}
				})
		}

		render() {
			var loginReminder = <div>Please login first </div>

			return (
				<div className='nav'>
					<ul> 
						<li><Link to="/search">Search</Link></li>
						<li onClick={ () => this.handleProfileClick() } >Profile</li>
						<li><Link to="/signin">Sign In</Link></li>
						<li><Link to="/signup">Sign Up</Link></li>
					</ul>
					{this.state.showLoginReminder ? loginReminder : null}
				</div>
			)
		}

	}