import React from 'react';
import DemoForm from "./DemoForm";
import {connect} from "react-redux";
import {fetchAuth} from "../../actions/auth";

class DemoFormPage extends React.Component {

  constructor(props) {
    super(props);
  }

  submit = values => {
    console.log(values);
    this.props.fetchAuth(values);
  };


  render() {

    return (
      <div>
        <DemoForm onSubmit={this.props.fetchAuth}/>
      </div>
    );
  }
}

export default connect(null, {fetchAuth})(DemoFormPage);



