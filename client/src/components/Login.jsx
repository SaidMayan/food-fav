import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pw_digest: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({
      email: '',
      pw_digest: ''
    });
  }

  render() {
    return (

      <form onSubmit={this.handleSubmit}>
        <label>

          <input
            type='text'
            onChange={this.handleInputChange}
            value={this.state.email}
            name='email'
            placeholder='Log in email'
          />
        </label>
        <label>

          <input
            type='password'
            onChange={this.handleInputChange}
            value={this.state.password}
            name='pw_digest'
            placeholder="Log in password"
          />
        </label>
        <button type='submit'>Login</button>
      </form>
    )
  }
}

export default Login;
