import React from 'react'

export default class Welcome extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div className='motherContainer'>
				<div className='jumbotron'>
					<span className='welcomeText'>Welcome To Tourganic</span>
				</div>
			</div>
		)
	}
}