import React from 'react'
import $ from 'jquery'
import {Button} from 'react-bootstrap'

export default class AboutMe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      aboutMeEdit: false,
      aboutMe: this.props.aboutMe
    }
  }

  handleAboutMeEdit() {
    if (this.state.aboutMeEdit === true) {
      var aboutMe = this.refs.aboutMe.value;
      $.post('/aboutMeEdit', {data: aboutMe})
        .done(data => {
          console.log('About me edited successfully');
          this.setState({
            aboutMeEdit: false,
            aboutMe: data.aboutMe
          })
        })
        .fail((err) => {
          console.error('cannot signIn', err);
        });
    } else {
      this.setState({
        aboutMeEdit: true
      })
    }
  }

  render() {
    var aboutMeEdit = <form className="aboutMeForm">
                        <textarea className="aboutMe" ref="aboutMe">{this.state.aboutMe}</textarea>
                        <Button className="aboutMeSubmitButton" onClick={() => this.handleAboutMeEdit()} bsSize='small' bsStye='defualt'>
                          Save Changes
                        </Button>
                      </form>
    var aboutMe = <div className="aboutMe" onClick={ () => this.handleAboutMeEdit() }>{this.state.aboutMe}</div>
    return (
      <div className='aboutMeParentContainer'>
        <div className='welcomeBackTitle'>Welcome Back, {this.props.user}</div>
        <div className='profilePicture'></div>
        <div className="aboutMeContainer">
          {this.state.aboutMeEdit ? aboutMeEdit : aboutMe}
        </div>
      </div>
    )
  }
}