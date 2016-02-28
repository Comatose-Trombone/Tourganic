import React from 'react'
import {Button, Modal } from 'react-bootstrap'

export default class CreateTourForm extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      description: '',
      name: '',
      createdBy: 'createdBy',
      streetAddress: 'streetAddress',
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
    console.log('foobar');
    this.setState({
      show:true
    });
  };


  render() {
    return (
      <div>
        <Button
          bsStyle='default'
          bsSize='small'
          onClick={this.show}
        >
        Create a TOUR
        </Button>
        <Modal
          show={this.state.show}
          dialogClassName="custom-modal"
          onHide={this.close.bind(this)}
          container={this}
          aria-labelledby='contained-modal-title'
        >
          <Modal.Header closeButton>
            <Modal.Title>Create A Tour</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <form>
              <input value={this.state.name} onChange={this.handleChange.bind(this, 'name')} onClick={this.reset.bind(this, 'name')}/><br/>
              <input value={this.state.location} onChange={this.handleChange.bind(this, 'location')} onClick={this.reset.bind(this, 'location')}/><br/>
              <input type='number' value={this.state.price} onChange={this.handleChange.bind(this, 'price')} onClick={this.reset.bind(this, 'price')}/><br/>
              <input value={this.state.date} onChange={this.handleChange.bind(this, 'date')} onClick={this.reset.bind(this, 'date')}/><br/>
              <input type='submit' value='Create Tour' onClick={this.props.submitNewTour.bind(this, this.state)}/>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}



{/*}
      <div>
        <form>
          <input value={this.state.name} onChange={this.handleChange.bind(this, 'name')} onClick={this.reset.bind(this, 'name')} placeholder= "Enter the name of the tour"/><br/>
          <input value={this.state.streetAddress} onChange={this.handleChange.bind(this, 'streetAddress')} onClick={this.reset.bind(this, 'streetAddress')} placeholder= "Enter the street address"/><br/>
          <input value={this.state.city} onChange={this.handleChange.bind(this, 'city')} onClick={this.reset.bind(this, 'city')} placeholder= "Enter the city"/><br/>
          <input value={this.state.state} onChange={this.handleChange.bind(this, 'state')} onClick={this.reset.bind(this, 'state')} placeholder= "Enter the state"/><br/>
          <input type='number' value={this.state.price} onChange={this.handleChange.bind(this, 'price')} onClick={this.reset.bind(this, 'price')} placeholder= "Enter the price of the tour"/><br/>
          <input value={this.state.date} onChange={this.handleChange.bind(this, 'date')} onClick={this.reset.bind(this, 'date')} placeholder= "Enter the date of the tour"/><br/>
          <textarea value={this.state.description} onChange={this.handleChange.bind(this, 'description')} onClick={this.reset.bind(this, 'description')} placeholder= "Brief description about the tour"/><br/>
          <input type='submit' value='Create Tour' onClick={this.props.submitNewTour.bind(this, this.state)}/>
        </form>
      </div>
*/}
