import React from 'react';
import './Item.css';

export default function Item(props) {
  const {i, id, artist, title_short, duration, isCheck, onClickHandler} = props;

  const onClick = id => {
    return () => {
      onClickHandler(id);
    }
  };

  return (
      <a className={`item__image-box ${ isCheck? "check": ""}`} onClick={onClick(id)}>
       <p className={isCheck? "check": ""}>  {`${i+1}. ${artist} -  ${title_short} (${duration})`} </p>
      </a>
  )
}

