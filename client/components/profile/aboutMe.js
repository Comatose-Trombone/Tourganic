import React from 'react'
import Profile from './Profile'

export default class AboutMe extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
        <div className='aboutMeParentContainer'>
          <div>Here is the AboutMe Page!</div>
          <div className='profilePicture'> picture </div>
          <div className='profileDescription'> description </div>
        </div>
    )
  }
}