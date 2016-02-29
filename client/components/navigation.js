import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import $ from 'jquery'
import {Button, ButtonGroup, Navbar, Nav, NavItem} from 'react-bootstrap'
import SignIn from './account/SignIn'
import SignUp from './account/SignUp'



export default class Navigation extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showLoginReminder: false,
			signedIn: false,
		}
		this.signIn = this.signIn.bind(this);
		this.endSession = this.endSession.bind(this);
	}
	

		handleProfileClick() {
			$.get('https://localhost:8080/profile')
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
						window.location = 'https://localhost:8080/#/profile';
					}
				})
		};

		componentWillMount() {
			$.get('https://localhost:8080/session')
				.done( (data) => {
					if (data.isAuth === false) {
						this.setState({
							signedIn: false
						})
					} else {
						this.setState({
							signedIn: true
						})
					}
				});
		};

		endSession() {
			$.get('https://localhost:8080/logout').done(() => {
					this.setState({
					signedIn: false
				})
				window.location = 'https://localhost:8080/#/welcome'
			})
		};

		signIn() {
			console.log('signin called');
			this.setState({
				signedIn: true
			})
		} 

	render() {

		var logout = <NavItem onClick={this.endSession}> Logout </NavItem>
		var profile = <NavItem href="#/profile">Profile</NavItem>
		return (
			<div>
				<Navbar pullLeft={true}>
					<Navbar.Header>
			      <Navbar.Brand>
			        <a href="#">Tourganic</a>
			      </Navbar.Brand>
			    </Navbar.Header>
					<Nav>
						 <NavItem href="#/search">Search</NavItem>
	      		 { this.state.signedIn ? profile : null }
	      		 { this.state.signedIn ? null : <SignUp signIn={this.signIn}/> }
	      		 { this.state.signedIn ? null : <SignIn signIn={this.signIn}/> }
	      		 { this.state.signedIn ? logout : null }
					</Nav>
				</Navbar>
			</div>
		)
	}
}