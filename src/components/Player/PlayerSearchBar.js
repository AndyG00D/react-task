import React from 'react';
import '../DemoFormPage/DemoForm.css';
import {Field} from 'redux-form'
import { reduxForm } from 'redux-form'
import PlayerBtn from "./PlayerBtn";

let PlayerSearchBar = props => {

  return (
  <form className="player__search-bar" onSubmit={props.handleSubmit}>
      <Field
        className="player__search"
        name="search"
        component="input"
        type="text"
        placeholder = "input search track..."
      />
      <PlayerBtn
        title="Search"
        btnClassName="player__search-btn"
        icoClassName="fa-search"
      />
  </form>
  )
};


PlayerSearchBar = reduxForm({form: 'uniqname'})(PlayerSearchBar);


  export default PlayerSearchBar;








