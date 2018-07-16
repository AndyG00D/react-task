import React from 'react';
import './LoginDeezer.css';
import {fetchAuth, fetchAuthToken} from "../../actions/auth";
import {connect} from "react-redux";
import PropTypes from "prop-types";

class LoginDeezer extends React.Component {

  static propTypes = {
    fetchAuthToken: PropTypes.func,
    fetchAuth: PropTypes.func,
    token: PropTypes.string,
  };

  static defaultProps = {
    fetchAuthToken: () => {
    },
    fetchAuth: () => {
    },
    token: '',
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const query = new URLSearchParams(window.location.search);
    const code = query.get('code');
    if (code) {
      this.props.fetchAuthToken(code);
    }
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <button onClick={this.props.fetchAuth}>Login</button>
        <p>{this.props.token && `Token = ${this.props.token}`}</p>
      </div>
    );
  }
}

const mapStateToProps = ({auth}) => {
  const {
    token
  } = auth;
  return {
    token
  }
};

export default connect(mapStateToProps, {fetchAuth, fetchAuthToken})(LoginDeezer);


