
import { connect } from 'react-redux'
import ProfileForm from '../components/profile'
import {
  register
} from '../actions'




const mapStateToProps = state => {
  return {
    userHash: state.profile.userHash
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (profile) => {
      dispatch(register(profile))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileForm)