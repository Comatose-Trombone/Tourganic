import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import $ from 'jquery'



export default class Navigation extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showLoginReminder: false,
			logOut: false
		}
	}
	

		handleProfileClick() {
			$.get('http://localhost:8080/profile')
				.done( (data) => {
					if (data.isAuth === false) {
						this.setState({
							showLoginReminder: true
						})
						var setState = this.setState.bind(this);
						setTimeout(function(){
							setState({showLoginReminder:false})
						},2000);
					} else {
						this.setState({
							showLoginReminder: false
						})
						window.location = 'http://localhost:8080/#/profile';
					}
				})
		};

		componentDidMount() {
			$.get('http://localhost:8080/session')
				.done( (data) => {
					if (data.isAuth === false) {
						this.setState({
							logOut: false
						})
					} else {
						this.setState({
							logOut: true
						})
					}
				});
		};

		endSession() {
			$.get('http://localhost:8080/logout').done(() => {
					this.setState({
					logOut: false
				})
				window.location = 'http://localhost:8080/#/signin'
			})
		};

		render() {

			var logOut = <li onClick={ () => this.endSession() } >Log Out</li>
			var loginReminder = <div>Please login first </div>
			var signin = <li><Link to="/signin">Sign In</Link></li>
			var signup = <li><Link to="/signup">Sign Up</Link></li>
			return (
				<div className='nav'>
					<ul> 
						<li className='button'><Link to="/search">Search</Link></li>
						<li onClick={ () => this.handleProfileClick() } >Profile</li>
						 {this.state.logOut ? logOut : null}
						 {this.state.logOut ? null : signin}
						 {this.state.logOut ? null : signup}
					</ul>
					{this.state.showLoginReminder ? loginReminder : null}
				</div>
			)
		}

}