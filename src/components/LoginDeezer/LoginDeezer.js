import React from 'react';
import axios from "axios/index";
import './LoginDeezer.css';
import {apiUrls} from "../../apiUrls";

export default class LoginDeezer extends React.Component {

  constructor() {
    super();

    this.state = {
      token: ''
    };
  }

  componentDidMount() {
    const query = new URLSearchParams(window.location.search);
    const code = query.get('code');
    if (code) {
      axios(apiUrls.token + code)
        .then(res => {
          console.log(res.data);
          this.setState({
            token: res.data
          });
        })
    }
  }

  onLogin = () => {
    console.log('click');
    axios(apiUrls.login)
      .then(response => {
        window.open(response.headers['x-final-url'], '_self');
      });
  };

  submit = values => {
    console.log(values);
    this.props.fetchAuth(values);
  };


  render() {
    return (
      <div>
        <h1>Login</h1>
        <button onClick={this.onLogin}>Login</button>
        <br/>
        <br/>
        {this.state.token}
      </div>
    );
  }
}



