import React from 'react'
import $ from 'jquery'

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
      $.post('http://localhost:8080/aboutMeEdit', {data: aboutMe})
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
    var aboutMeEdit = <form className="aboutMeForm" onSubmit={ () => this.handleAboutMeEdit() } >
                        <textarea className="aboutMe" ref="aboutMe">{this.state.aboutMe}</textarea>
                        <input className="aboutMeSubmitButton" type="submit" value="Save changes" />
                      </form>
    var aboutMe = <div className="aboutMe" onClick={ () => this.handleAboutMeEdit() }>{this.state.aboutMe}</div>
    return (
      <div className='aboutMeParentContainer'>
        <div>{this.props.user}</div>
        <div className='profilePicture'> picture </div>
        <div className="aboutMeContainer">
          {this.state.aboutMeEdit ? aboutMeEdit : aboutMe}
        </div>
      </div>
    )
  }
}