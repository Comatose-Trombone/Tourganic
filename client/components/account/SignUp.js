import React from 'react'
import $ from 'jquery'
import {Button, ButtonGroup, DropdownButton, MenuItem, Modal, NavItem} from 'react-bootstrap'


export default class SignUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      show: false,
      showError: false
      showValidateEmailError: false
    }
    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
	}

  validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

  handleSignUp() {
    if (this.validateEmail(this.refs.email.value)) {
      var user = {
        username: this.refs.username.value,
        password: this.refs.password.value,
        email: this.refs.email.value
      };
      $.post('http://localhost:8080/signup', {data: user})
        .done(data => {
          window.location = 'http://localhost:8080/#/profile';
        })
        .fail((err) => {
          console.log('error in signUp', err);
        });
    } else {
      this.setState({showValidateEmailError:true}, function() {
        var setState = this.setState.bind(this);
        setTimeout(function() {
          setState({showValidateEmailError:false});
        }, 2000);
      });
    }
  }

	close() {
    this.setState({show:false});
  };

  show() {
    console.log('foobar');
    console.log(this);
    this.setState({
      show:true
    });
  };

	render() {
    var emailError = <div>Please enter valid email</div>;

    var error = <div> Username Already Exists.</div>;

		return (
		  <NavItem
          bsStyle='default'
          bsSize='small'
          onClick={this.show}
       >
        SignUp

        <div className='modal-container'>
      <Modal
        show={this.state.show}
        dialogClassName="custom-modal"
        onHide={this.close.bind(this)}
        container={this}
        aria-labelledby='contained-modal-title'
      >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Sign Up Here</Modal.Title>
          </Modal.Header>
          <Modal.Body >
						<form className="sign-">
					    <input ref="username" class="username" placeholder="username" type='text'/><br/>
					    <input ref="password" class="password" placeholder="password" type="password"/><br/>
					    <input ref="email" class="email" placeholder="email" type="text"/><br/>
					    <Button bsStyle='default' onClick={() => this.handleSignUp()}> Sign Up </Button>
              {this.state.showValidateEmailError ? emailError : null}
					  </form>
          </Modal.Body>
        </Modal>
      </div>
    </NavItem>
    
			// <div id='signup'>
			//   <h1>Sign Up</h1>
			//   <form class="sign-" onSubmit={() => this.handleSignUp()}>
			//     <input ref="username" class="username" placeholder="username" type='text'/>
			//     <input ref="password" class="password" placeholder="password" type="password"/>
			//     <input ref="email" class="email" placeholder="email" type="text"/>
			//     <input type="submit" value="Sign Up"/>
			//   </form>
			// </div>

		)
	}
}