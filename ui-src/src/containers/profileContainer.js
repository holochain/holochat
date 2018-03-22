import { connect } from 'react-redux'
import Profile from '../components/profile'
import {
  register
} from '../actions'

const mapStateToProps = state => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (profile) => {
      console.log('registering!')
      const prof = {
          username: 'Hi',
          firstName: 'Jim',
          lastName: 'Roberts',
          email: '123@email.com'
      }
      dispatch(register(prof))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)