import React from 'react';
import './FormTest.css';
import {Field, reducer as formReducer} from 'redux-form'
import { reduxForm } from 'redux-form'
import {required} from "./validationsUtils";

const validate = values =>{
  const errors = {};
  if(!values.firstName){
    errors.firstName = 'Requared'
  }
  return errors;
};



const RenderField = ({input, meta}) => {
  // const {input, meta} = field;
  console.log(meta.error);
  return (
    <div>
      <label htmlFor="firstName">First Name</label>
      {/*<input {...field} name="firstName" component="input" type="text"/>*/}
      <input {...input} validate={required}/>
    </div>
  )
};

let FormTest = props => {

  const submitted = (values) => {
    console.log(values);
  };

  return (
  <form className="test-form" onSubmit={props.handleSubmit(submitted)}>
    {/*<div>*/}
      {/*<label htmlFor="firstName">First Name</label>*/}
      {/*<Field name="firstName" component={RenderField} type="text"/>*/}
    {/*</div>*/}
    <div>
      <label htmlFor="email">Email</label>
      <Field name="email" component="input" type="email"/>
    </div>
    <div>
      <label htmlFor="password">pass</label>
      <Field name="password" component="input" type="password"/>
    </div>
    <div>
      <button type="submit">Отправить форму</button>
    </div>
  </form>
  )
};


  FormTest = reduxForm({form: 'uniqname'})(FormTest);


  export default FormTest;








