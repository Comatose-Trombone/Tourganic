import React from 'react'

export default class CreateEventForm extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      name: 'name',
      createdBy: 'createdBy',
      location: 'location',
      price: 'price',
      date: 'date'
    }

  }

  handleChange(prop, e) {
    var newState = {};
    console.log(e.target.value);
    newState[prop] = e.target.value;
    this.setState(newState);
  }

  reset(prop, e) {
    var newState = {};
    newState[prop] = '';
    this.setState(newState);
  }


  render() {
    return (
      <div>
        <form>
          <input value={this.state.name} onChange={this.handleChange.bind(this, 'name')} onClick={this.reset.bind(this, 'name')}/><br/>
          <input value={this.state.location} onChange={this.handleChange.bind(this, 'location')} onClick={this.reset.bind(this, 'location')}/><br/>
          <input type='number' value={this.state.price} onChange={this.handleChange.bind(this, 'price')} onClick={this.reset.bind(this, 'price')}/><br/>
          <input value={this.state.date} onChange={this.handleChange.bind(this, 'date')} onClick={this.reset.bind(this, 'date')}/><br/>
          <input type='submit' value='Create Event' onClick={this.props.submitNewEvent.bind(this, this.state)}/>
        </form>
      </div>
    )
  }
}






