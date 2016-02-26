import React from 'react'
import $ from 'jquery'
import {Button, ButtonGroup, DropdownButton, MenuItem, Modal} from 'react-bootstrap'


export default class SignUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      show: false
    }
    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
	}

	handleSignUp() {
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

		return (
		  <div>
        <div className='modal-container' style={{height:150}}>
        <Button
          bsStyle='default'
          bsSize='small'
          onClick={this.show}
        >
        SignUp
        </Button>

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
					  </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
    
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