import React from 'react';
import {TextForm} from './TextForm';
import "../css/Column.css"
export function Column(props) {
  return (
    <div className="Column">
      <div className="Column__title">{props.title} {props.count}</div>
      {props.children}
      <TextForm onSubmit={props.addCard} placeholder="Add card..." />
    </div>
  );
}