import React from 'react';
import axios from "axios/index";
import './LoginReqresIn.css';
import FormTest from "../Form/FormTest";
import {connect} from "react-redux";
// import * as actions from "../../actions";
import {fetchAuth} from "../../actions/auth";



class LoginReqresIn extends React.Component {

  constructor() {
    super();
 }

  submit = values => {
    console.log(values);
    this.props.fetchAuth(values);
  };


    render() {

    return (
      <div>
        <FormTest onSubmit = {this.props.fetchAuth}/>
      </div>
    );
  }
}

export default connect(null, {fetchAuth})(LoginReqresIn);



