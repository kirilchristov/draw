/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
import React from 'react';

function Square(props) {
  return (
    <button
      className="square"
      onClick={props.onClick}
      data-pro={props.value}
    >
      {props.value}
    </button>
  );
}

export default Square;
