
import { connect } from 'react-redux'
import ProfileForm from '../components/profile'
import {
  register,
  myProfile
} from '../actions'




const mapStateToProps = state => {
  return { profile: state.profile }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (profile, then) => {
      dispatch(register(profile, then))
    },
    myProfile: (then) => {
      dispatch(myProfile(then))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileForm)
