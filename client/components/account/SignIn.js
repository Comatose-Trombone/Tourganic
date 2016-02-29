import React from 'react'
import $ from 'jquery'
import {Button, ButtonGroup, DropdownButton, MenuItem, Modal, NavItem} from 'react-bootstrap'


export default class SignIn extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      show: false,
      showInvalidFieldsError: false,
      showInvalidUsernameOrPassword: false
    }
    this.show = this.show.bind(this);
    this.close = this.close.bind(this);

	}


	handleSignIn() {
		var user = {
			username: this.refs.username.value,
			password: this.refs.password.value,
		};
		if (!user.username || !user.password) {
      this.setState({
        showInvalidFieldsError: true
      }, function() {
        var setState = this.setState.bind(this);
        setTimeout(function() {
          setState({showInvalidFieldsError: false});
        }, 2000);
      });      
      return;
    }

		$.post('/signin', {data: user})
			.done(data => {
				console.log('data', data);
				//depending on the error, the server will respond with a given message.
				if (data === 'Username and/or password invalid.') {
			    this.setState({
		        showInvalidUsernameOrPassword: true
		      }, function() {
		        var setState = this.setState.bind(this);
		        setTimeout(function() {
		          setState({showInvalidUsernameOrPassword: false});
		        }, 2000);
		      }); 
		      return;
				} 
				else {
					this.props.signIn();
					window.location = '/#/profile';
				}
				this.setState({
					show: false
				})
			})
		.fail((err) => {
			console.error('cannot signin');
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
		var invalidFieldsError = <div> Please fill out all forms. </div>
		var invalidUsernameOrPassword = <div> Incorrect username or password. </div>

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
							    {this.state.showInvalidFieldsError ? invalidFieldsError : null}
							    {this.state.showInvalidUsernameOrPassword ? invalidUsernameOrPassword : null}
					  		</form>
		          </Modal.Body>
		        </Modal>
	      	</div>
	    </NavItem>

		)
	}
}


















