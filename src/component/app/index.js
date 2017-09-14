// import './_app.scss'
import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Link} from 'react-router-dom';

import DashboardContainer from '../dashboard-container';
import LandingContainer from '../landing-container';
import SettingsContainer from '../settings-container';
import Avatar from '../avatar';
import * as util from '../../lib/util.js';
import {tokenSet} from '../../action/auth-actions.js';
import {profileFetchRequest} from '../../action/profile-actions.js'

class App extends React.Component {
  componentDidMount() {
    let token = util.readCookie('X-Sluggram-Token');
    if(token) {
      this.props.tokenSet(token);
    }
  }

  render() {
    return (
      <div className='app'>
        <BrowserRouter>
          <section>
            <header>
              <h1>Sluggram</h1>
              <nav>
                <ul>
                  <li><Link to='/welcome/signup'>signup</Link></li>
                  <li><Link to='/welcome/login'>login</Link></li>
                  <li><Link to='/settings'>settings</Link></li>
                  <li><Link to='/dashboard'>dashboard</Link></li>
                </ul>
              </nav>
              {util.renderIf(this.props.profile,
              <Avatar profile={this.props.profile}/>
              )}
            </header>
            <main>
              <Route exact path='/welcome/:auth' component={LandingContainer} />
              <Route exact path='/settings' component={SettingsContainer} />
              <Route exact path='/dashboard' component={DashboardContainer} />
              <Route exact path='/' component={DashboardContainer} />
            </main>
          </section>
        </BrowserRouter>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  profile: state.profile
})

let mapDispatchToProps =(dispatch) => ({
  tokenSet: (token) => dispatch(tokenSet(token)),
  profileFetchRequest: () => dispatch(profileFetchRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
