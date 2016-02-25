import React from 'react'

export default class CreatedEventsEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      location: "",
      price: ""
    }
  }

  componentDidMount () {
    $.post('http://localhost:8080/createdEventsEntry', {data: this.props.userMadeEvent})
    .done( (data) => {
      this.setState({
        user : data.username,
        description : data.description,
        userMadeEvents : data.createdEvents
      })
    })
    .fail( (err) => {
      console.log('error getProfile', err);
    })
  }

  render() {
    return (
      <div onClick={ () => this.props.handleTourClick() }>
        <div className='eventContainer'> {this.props.userMadeEvent.Name} </div>
        <div className='eventContainer'> {this.props.userMadeEvent.Name} </div>
        <div className='eventContainer'> {this.props.userMadeEvent.Name} </div>
      </div>
    )
  }

}