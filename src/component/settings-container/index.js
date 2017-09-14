import React from 'react';
import {connect} from 'react-redux';
import ProfileForm from '../profile-form';
import {profileCreateRequest} from '../../action/profile-actions.js';

class SettingsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleProfileCreate = this.handleProfileCreate.bind(this);
  }

  handleProfileCreate(profile) {
    return this.props.profileCreate(profile)
    .then(() => {
      this.props.history.push('/dashboard')
    })
    .catch(console.error)
  }

  //TODO:
  handleProfileUpdate() { };

  render() {
    let handleComplete = this.props.profile
    ? this.handleProfileUpdate
    : this.handleProfileCreate

    return (
      <div className='settings-container'>
        <h2> Profile Settings: </h2>
        <ProfileForm
          profile={this.props.profile}
          buttonText='create profile'
          onComplete={handleComplete}
        />
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  profile: state.profile
})

let mapDispatchToProps = (dispatch) => ({
  profileCreate: (profile) => dispatch(profileCreateRequest(profile)),
  profileUpdate: (profile) => dispatch(profileUpdateRequest(profile))
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
