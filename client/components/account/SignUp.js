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
		$.post('http://localhost:8080/signup', {data: user})
			.done(data => {
				console.log('User added successfully')
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
			  <form class="sign-" onClick={() => this.handleSignUp()}>
			    <input ref="username" class="username" placeholder="username" type='text'/>
			    <input ref="password" class="password" placeholder="password" type="password"/>
			    <input ref="email" class="email" placeholder="email" type="text"/>
			    <input type="submit" value="Sign In"/>
			  </form>
			  <a href="#/signup">Don't have an account yet? <strong>Sign Up</strong> ...</a>
			</div>

		)
	}
}