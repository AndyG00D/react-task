import React from 'react';
import axios from "axios/index";
import './Login.css';
import FormTest from "../Form/FormTest";
import {connect} from "react-redux";
// import * as actions from "../../actions";



export default class Login extends React.Component {

  constructor() {
    super();

    this.state = {
      token: ''
    };
  }

  app_id = 287084;
  secret = '8b1fc6d49b349eea103cad59b9bbb9bd';
  redirect_uri = 'http://localhost:3000/login/';
  perms = 'basic_access,email';

  componentDidMount() {
    const query = new URLSearchParams(window.location.search);
    const code = query.get('code');
    // const code = this.props.match.params.code;
    if(code) {
      axios(`https://cors-anywhere.herokuapp.com/https://connect.deezer.com/oauth/access_token.php?app_id=${this.app_id}&secret=${this.secret}&code=${code}`)
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
      axios(`https://cors-anywhere.herokuapp.com/https://connect.deezer.com/oauth/auth.php?app_id=${this.app_id}&redirect_uri=${this.redirect_uri}&perms=${this.perms}`)
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



