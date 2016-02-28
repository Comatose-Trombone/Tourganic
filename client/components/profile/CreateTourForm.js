import React from 'react'
import {Button, Modal } from 'react-bootstrap'


export default class CreateTourForm extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      description: '',
      name: 'name of tour',

      description: 'description',
      name: 'name of tour',
      createdBy: 'createdBy',
      streetAddress: 'street address',
      city: 'city',
      state: 'state',
      price: 'price',
      date: 'date',

      show: false
    }
  };

  handleChange(prop, e) {
    var newState = {};
    newState[prop] = e.target.value;
    this.setState(newState);
  };

  reset(prop, e) {
    var newState = {};
    newState[prop] = '';
    this.setState(newState);
  };

  close() {
    this.setState({show:false});
  };

  show() {
    this.setState({
      show:true
    });
  };

  //closes the modal, and also submits the tour 
  handleTourSubmission() {
    this.close.bind(this)();
    this.props.submitNewTour.bind(null, this.state)();
  }


  render() {
    return (
      <div className='createTourForm'>
        <Button
          bsStyle='default'
          bsSize='small'
          onClick={()=>{this.show()}}
        >
        Create a Tour
        </Button>
        <Modal
          show={this.state.show}
          dialogClassName="custom-modal"
          onHide={this.close.bind(this)}
          container={this}
          aria-labelledby='contained-modal-title'
        >
          <Modal.Header closeButton>
            <Modal.Title>Create a Tour</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <form>
                <input value={this.state.name} onChange={this.handleChange.bind(this, 'name')} onClick={this.reset.bind(this, 'name')}/><br/>
                <input value={this.state.streetAddress} onChange={this.handleChange.bind(this, 'streetAddress')} onClick={this.reset.bind(this, 'streetAddress')}/><br/>
                <input value={this.state.city} onChange={this.handleChange.bind(this, 'city')} onClick={this.reset.bind(this, 'city')}/><br/>
                <input value={this.state.state} onChange={this.handleChange.bind(this, 'state')} onClick={this.reset.bind(this, 'state')}/><br/>
                <input type='number' value={this.state.price} onChange={this.handleChange.bind(this, 'price')} onClick={this.reset.bind(this, 'price')}/><br/>
                <input value={this.state.date} onChange={this.handleChange.bind(this, 'date')} onClick={this.reset.bind(this, 'date')}/><br/>
                <textarea value={this.state.description} onChange={this.handleChange.bind(this, 'description')} onClick={this.reset.bind(this, 'description')}/><br/>
                <input type='submit' value='Create Tour' onClick={()=>{this.handleTourSubmission()}}/>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

