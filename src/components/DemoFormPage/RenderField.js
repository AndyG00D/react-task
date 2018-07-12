import React from 'react';

export const RenderField = ({input, label, meta}) => {

  const getErrorMsg = (meta) => {
    let message = '';
    switch (meta.error) {
      case 'required':
        message = 'Field is required';
        break;
      case 'email':
        message =  'Wrong email format';
        break;
      case 'password':
        message =  'Wrong password format (expl:dfs45435)';
        break;
    }
    return meta.touched && message && <div className="alert">{message}</div>
  };

  return (
    <div className="field">
      <label className="label">{label}</label>
      <input className="input" {...input} placeholder={label}/>
      {getErrorMsg(meta)}
    </div>
  )
};



