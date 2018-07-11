import React from 'react';
import PropTypes from 'prop-types';

PlayerBtn.propTypes = {
  title: PropTypes.string,
  btnClassName: PropTypes.string,
  icoClassName: PropTypes.string,
  onClick: PropTypes.func
};

PlayerBtn.defaultProps = {
  title: 'Button',
  btnClassName: '',
  icoClassName: 'fa-play',
  onClick: () => {}
};

export default function PlayerBtn(props) {
  const {title, btnClassName, icoClassName, onClick} = props;
  return (
    <button
      className={'player__btn ' + btnClassName}
      onClick={onClick}
      title={title}
    >
      <i className={'fa ' + icoClassName}/>
    </button>
  )
}

