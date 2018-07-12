import React from 'react';
import '../Form/FormTest.css';
import {Field, reducer as formReducer} from 'redux-form'
import { reduxForm } from 'redux-form'
import PlayerBtn from "./PlayerBtn";

let PlayerSearchBar = props => {

  const submitted = (values) => {
    console.log(values);
  };

  // onSubmit={props.handleSubmit()}
  return (
  <form className="player__search-bar" onSubmit={props.handleSubmit}>
      <Field className="player__search" name="search" component="input" type="text"/>
      {/*<button type="submit">Send</button>*/}
      <PlayerBtn
        title="Search"
        btnClassName="player__search-btn"
        icoClassName="fa-search"
        // onClick={submitted}
      />
  </form>
  )
};


PlayerSearchBar = reduxForm({form: 'uniqname'})(PlayerSearchBar);


  export default PlayerSearchBar;








