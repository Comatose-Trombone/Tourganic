import React from 'react'
import $ from 'jquery'

export default class SignUp extends React.Component {
	constructor(props) {
		super(props);
	}

	handleSignUp() {
		var user = {
			username: this.refs.username.value,
			password: this.refs.password.value,
			email: this.refs.email.value
		};
		console.log('user', user);
		$.post('http://localhost:8080/signup', {data: user})
			.done(data => {
				console.log('User added successfully');
				window.location = 'http://localhost:8080/#/profile';
			})
			.fail((err) => {
				console.log('error in signUp', err);
			});
	}

	render() {

		return (
			<div id='signup'>
			  <h1>Sign Up</h1>
			  <form class="sign-" onSubmit={() => this.handleSignUp()}>
			    <input ref="username" class="username" placeholder="username" type='text'/>
			    <input ref="password" class="password" placeholder="password" type="password"/>
			    <input ref="email" class="email" placeholder="email" type="text"/>
			    <input type="submit" value="Sign Up"/>
			  </form>
			</div>

		)
	}
}