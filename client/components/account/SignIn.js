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
				if (data === 'Username does not exist.') {
					window.location = 'http://localhost:8080/#/welcome';
				} else {
					this.props.signIn();
					window.location = 'http://localhost:8080/#/profile';
				}
				this.setState({
					show: false
				})
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

	     <div className='modal-container'>
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

		)
	}
}


















