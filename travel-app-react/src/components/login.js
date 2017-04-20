import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login } from '../actions/account'
import { Redirect } from 'react-router-dom'

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      redirect: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRedirect = this.handleRedirect.bind(this)
  }

  componentDidMount() {
    if (this.props.account.account_id !== null) {
      this.setState({
        redirect: true
      })
    }
  }

  handleChange(e) {
    let target = e.target.name
    this.setState({
      [target]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.login(this.state)
    this.setState({
        redirect: true
      })
  }

  handleRedirect() {
    return <Redirect to="/mytrips" />
  }

  render() {
    return(
      <div>
        {this.state.redirect ? this.handleRedirect() : null}
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <input type='text' name='username' value={this.state.username} placeholder='Username' onChange={this.handleChange}/>
          <input type='password' name='password' value={this.state.password} placeholder='Password' onChange={this.handleChange}/>
          <input type='submit' value='Login'/>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.Account
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    login: login
  }, dispatch)
}

const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login)

export default ConnectedLogin
