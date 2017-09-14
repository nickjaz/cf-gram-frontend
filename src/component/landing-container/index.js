import React from 'react';
import {connect} from 'react-redux';
import AuthForm from '../auth-form';
import * as util from '../../lib/util.js';
import {signupRequest, loginRequest} from '../../action/auth-actions.js';
import {profileFetchRequest} from '../../action/profile-actions.js'

class LandingContainer extends React.Component {
  componentWillReceiveProps(props){
  if(props.auth && props.profile)
    props.history.replace('/dashboard')
  if(props.auth && !props.profile)
    props.history.replace('/settings')
  }

  render() {
    let {params} = this.props.match;

    let handleComplete = params.auth === 'login'
      ? this.props.login
      : this.props.signup

    return (
      <div>
        <AuthForm
          auth={params.auth}
          onComplete={handleComplete}
        />
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
})

let mapDispatchToProps = (dispatch) => {
  return {
    signup: (user) => dispatch(signupRequest(user)),
    login: (user) => dispatch(loginRequest(user)),
    profileFetch: () => dispatch(profileFetchRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer);
