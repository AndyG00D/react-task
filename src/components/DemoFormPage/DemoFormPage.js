import React from 'react';
import DemoForm from "./DemoForm";
import {connect} from "react-redux";
import {fetchFakeAuth} from "../../actions/fakeAuth";

class DemoFormPage extends React.Component {

  constructor(props) {
    super(props);
  }

  submit = values => {
    this.props.fetchAuth(values);
  };

  render() {

    return (
      <div>
        <DemoForm onSubmit={this.props.fetchFakeAuth}/>
      </div>
    );
  }
}

export default connect(null, {fetchFakeAuth})(DemoFormPage);



