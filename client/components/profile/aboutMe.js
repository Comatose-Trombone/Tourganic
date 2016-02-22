import React from 'react'
import Profile from './Profile'

export default class AboutMe extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
        <div className='aboutMe'>
          <div>Here is the AboutMe Page!</div>
          <div className='profilePicture'></div>
          <div className='profileDescription'></div>
        </div>
    )
  }
}