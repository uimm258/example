import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service';
import Context from '../../Context';
import TokenService from '../../services/token-service';

class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  }

  state = {
    username: ' ',
    password: ' ',
    error: null
  }

  static contextType = Context

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const {username, password} = event.target

    AuthApiService.postLogin({
      username: username.value,
      password: password.value
    }).then(res => {
      username.value = ' '
      password.value = ' '
      //this.context.processLogin(res.authToken)
      TokenService.saveAuthToken(res.authToken)
      this.props.onLoginSuccess()
    }).catch(res => {
      this.setState({ error: res.error })
    }) 

  }
  
  render() {
    const { error } = this.state
    return(
      <div>
        <form onSubmit={this.handleSubmit}>

          <div role='alert'>
            {error && <p>{error}</p>}
          </div>

          <div>
            <label htmlFor="login-username">Username</label>
            <input required type="text" placeholder="Username is required" name="username" onChange={this.handleChange} />
          </div>

          <div>
            <label>Password</label>
            <input required type="password" placeholder="Password is required" name="password" onChange={this.handleChange}/>
          </div>

          <div>
            <button type="submit">Login</button>
          </div>

        </form>
      </div>
    )
  }
}

export default LoginForm;
