
import { connect } from 'react-redux'
import {getFormValues} from 'redux-form'
import ProfileForm from '../components/profile'
import {
  register
} from '../actions'




const mapStateToProps = state => {
  return {
    userHash: state.holochatReducer.userHash
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
