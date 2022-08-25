import React from 'react';
import {TextForm} from './TextForm';
import "../CSS/Column.css"
export function Column(props) {
  return (
    <div className="Column">
      {/* <div className="Column__title"><b><em>{props.title}</em></b> <span style={{float: "right"}}> Quantity: {props.count}</span> </div> */}
      <div className="Column__title"
      style={{ fontWeight: "bold"}}>{props.title} <span style={{float: "right", fontWeight: "normal", fontStyle: "italic", fontSize: ".60em"}}> Quantity: {props.count}</span> </div>
      {props.children}
    </div>
  );
}