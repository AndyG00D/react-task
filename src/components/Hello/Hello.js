import React from 'react';
import PropTypes from 'prop-types'
import './Hello.css';


Hello.propTypes ={
  name: PropTypes.string,
  number: PropTypes.number,
};

export default function Hello (props) {

   return (
     <div>
     <h1> Hello {props.name}</h1>
     <p> show me some number - {props.number}</p>
     </div>
    );
  }




