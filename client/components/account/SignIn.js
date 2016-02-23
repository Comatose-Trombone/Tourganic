import React from 'react'
import $ from 'jquery'

export default class SignIn extends React.Component {
	constructor(props) {
		super(props);
	}

	handleSignIn() {
		var user = {
			username: this.refs.username.value,
			password: this.refs.password.value,
		};
		$.post('http://localhost:8080/signin', {data: user})
			.done(data => {
				console.log('User signed in successfully');
				window.location = 'http://localhost:8080/#/profile';
			})
			.fail(({responseJSON}) => {
			  responseJSON.error.errors.forEach((err) =>
			    console.error(err)
			  )
			});
	}

	render() {

		return (
			<div id='signin'>
			  <h1>Sign In</h1>
			  <form class="sign-" onSubmit={() => this.handleSignIn()}>
			    <input ref="username" class="username" placeholder="username" type='text'/>
			    <input ref="password" class="password" placeholder="password" type="password"/>
			    <input type="submit" value="Sign In"/>
			  </form>
			</div>

		)
	}
}