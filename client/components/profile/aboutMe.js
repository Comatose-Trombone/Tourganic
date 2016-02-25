import React from 'react'

export default class AboutMe extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='aboutMeParentContainer'>
        <div>{this.props.user}</div>
        <div className='profilePicture'> picture </div>
        <div className='profileDescription'> {this.props.description} </div>
      </div>
    )
  }
}