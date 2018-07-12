import React from 'react';
import './DemoForm.css';
import {Field} from 'redux-form'
import {reduxForm} from 'redux-form'
import {email, required, password} from "./validationsUtils";
import {RenderField} from "./RenderField";

let DemoForm = props => {

  return (
    <form className="test-form" onSubmit={props.handleSubmit}>
      <Field
        name="email"
        label="Email"
        component={RenderField}
        type="email"
        validate={[required, email]}/>
      <Field
        name="password"
        label="Password"
        component={RenderField}
        type="password"
        validate={[required, password]}
      />
      <button className="" type="submit">Отправить форму</button>
    </form>
  )
};


DemoForm = reduxForm({form: 'uniqname'})(DemoForm);


export default DemoForm;








