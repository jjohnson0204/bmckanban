import React, { useState } from 'react';
import {DragSource, DropTarget} from 'react-dnd';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import cn from 'classnames';
import _ from 'lodash';
import "../css/Card.css"

export function Card(props) {
  let [fullName, setFullname] = useState("")
  const { assignee, workOrderGroup, workOrderId, summary, status } = props;
  
  return _.flowRight(props.connectDragSource, props.connectDropTarget)(
    <div
      className={cn('card', {
        'Card--dragging': props.isDragging,
        'Card--spacer': props.isSpacer,
      })}
    ><React.Fragment>
      <div className="Card__title"></div>
      <div className="icon"></div>
      <div className="data">
        <div className="user">
            <p>{workOrderId}</p>
            <p>{assignee}</p>
            <p>{workOrderGroup}</p>
        </div>
        <h4>Summary:</h4>
        <p> {summary}</p>
      </div>
    </React.Fragment> 
    </div>
  );
}

export const DraggableCard = _.flowRight([
  DropTarget(
    'Card',
    {
      hover(props, monitor) {
        const {columnId, columnIndex} = props;
        const draggingItem = monitor.getItem();
        if (draggingItem.id !== props.id) {
          props.moveCard(draggingItem.id, columnId, columnIndex);
        }
      },
    },
    connect => ({
      connectDropTarget: connect.dropTarget(),
    })
  ),
  DragSource(
    'Card',
    {
      beginDrag(props) {
        return {id: props.id};
      },

      isDragging(props, monitor) {
        return props.id === monitor.getItem().id;
      },
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    })
  ),
])(Card);
