import React from 'react'
import $ from 'jquery'

export default class AboutMe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      aboutMeEdit: false,
      aboutMe: this.props.aboutMe + 'Hello'
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
    var aboutMeEdit = <form onSubmit={ () => this.handleAboutMeClick() } >
                        <textarea ref="aboutMe">{this.state.aboutMe}</textarea>
                        <input type="submit" value="Save changes" />
                      </form>
    var aboutMe = <div onClick={ () => this.handleAboutMeClick() }>{this.state.aboutMe}</div>
    return (
      <div className='aboutMeParentContainer'>
        <div>{this.props.user}</div>
        <div className='profilePicture'> picture </div>
        <div className='aboutMeContainer'>
          Here is the container
          {this.state.aboutMeEdit ? aboutMeEdit : aboutMe}
        </div>
      </div>
    )
  }
}