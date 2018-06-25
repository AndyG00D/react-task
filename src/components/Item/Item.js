import React from 'react';
import './Item.css';

export default function Item(props) {
  const {altView, image, title, link} = props;

  return (
    <div className={`item ` + (altView ? `item_alt-view` : ``)}>
      <a className="item__image-box" href={link}>
        <img src={image} alt="img" className="item__image"/>
      </a>

      <div className="item__info-box">
        <h2 className="item__title">{title}</h2>
        {altView}
      </div>
    </div>
  )
}

