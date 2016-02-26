import React from 'react'
import $ from 'jquery'
import {Button, ButtonGroup, DropdownButton, MenuItem, Modal, NavItem} from 'react-bootstrap'


export default class SignIn extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      show: false
    }
    this.show = this.show.bind(this);
    this.close = this.close.bind(this);

	}


	handleSignIn() {
		var user = {
			username: this.refs.username.value,
			password: this.refs.password.value,
		};
		$.post('http://localhost:8080/signin', {data: user})
			.done(data => {
				console.log('User signed in successfully');
				console.log('this', this);
				this.setState({
					show: false
				})
				this.props.signIn();
				window.location = 'http://localhost:8080/#/profile';
			})
			.fail((err) => {
		    console.error('cannot signIn', err);
		  });
	}

	close() {
    this.setState({show:false});
  };

  show() {
    this.setState({
      show:true
    });
  };


	render() {
		return (
				 <NavItem
	        bsStyle='default'
	        bsSize='small'
	        onClick={this.show}
	       >
	       SignIn

	     <div className='modal-container' style={{height:150}}>
		      <Modal
		        show={this.state.show}
		        dialogClassName="custom-modal"
		        onHide={this.close.bind(this)}
		        container={this}
		        aria-labelledby='contained-modal-title'
		      >
		          <Modal.Header closeButton>
		            <Modal.Title>Sign In Here</Modal.Title>
		          </Modal.Header>
		          <Modal.Body >
		            <form className="sign-">
							    <input ref="username" class="username" placeholder="username" type='text'/><br/>
							    <input ref="password" class="password" placeholder="password" type="password"/><br/>
							    <Button onClick={() => this.handleSignIn()} bsStyle='default'> Sign In </Button>
					  		</form>
		          </Modal.Body>
		        </Modal>
	      	</div>
	    </NavItem>

    	/***************old code ***********************/
			// <div id='signin'>
			//   <h1>Sign In</h1>
			//   <form class="sign-" onSubmit={() => this.handleSignIn()}>
			//     <input ref="username" class="username" placeholder="username" type='text'/>
			//     <input ref="password" class="password" placeholder="password" type="password"/>
			//     <input type="submit" value="Sign In"/>
			//   </form>
			// </div>

		)
	}
}


















