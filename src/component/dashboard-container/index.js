// import './_dashboard-container.scss';
import React from 'react';
import {connect} from 'react-redux';
import * as util from '../../lib/util.js';
import * as photoActions from '../../action/photo-actions.js';

import PhotoForm from '../photo-form';
import PhotoItem from '../photo-item';

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.photosFetch()
    .catch(util.logError);
  }

  render() {
    return (
      <div className='dashboard-container'>
        <h2>Dashboard</h2>
        <p>Upload a photo:</p>
        <PhotoForm
          buttonText='post'
          onComplete={(photo) => {
            return this.props.photoCreate(photo)
            .catch(console.error);
          }}
        />
        <p>Gallery:</p>
        {this.props.photo.map(photo =>
          <PhotoItem key={photo._id} photo={photo} />
        )}
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  profile: state.profile,
  photo: state.photo ? state.photo : []
})

let mapDispatchToProps = (dispatch) => ({
  photoCreate: (photo) => dispatch(photoActions.photoCreateRequest(photo)),
  photosFetch: (photos) => dispatch(photoActions.photosFetchRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
