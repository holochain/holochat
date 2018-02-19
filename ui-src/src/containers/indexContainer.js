import { connect } from 'react-redux'
import Index from '../components/index'
import {
  register
} from '../actions'

const mapStateToProps = state => {
  return {
    userHash: state.userHash
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (entry) => {
      console.log('REGISTER!')
      const profile = {
        agent_id: 'entry',
        username: 'username',
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'email'
      }
      dispatch(register(profile))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)
