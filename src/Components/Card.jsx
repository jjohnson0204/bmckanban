import React, { useState,useEffect } from 'react';
import {DragSource, DropTarget} from 'react-dnd';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import 'react-edit-text/dist/index.css';
import cn from 'classnames';
import _ from 'lodash';
import "../CSS/Card.css"
import ReactTooltip from 'react-tooltip';
import { render } from '@testing-library/react';
import FormReasons from './FormReasons';

const reasons = [
  "None",
  "No Longer Required",
  "Funding Not Available",
  "To Be Re-Scheduled",
  "Resources Not Available",
  "Successful",
  "Successful with Issues",
  "Unsuccessful",
  "Backed Out",
  "Final Review Complete",
  "Final Review Required",
  "Additional Coding Required",
  "Insufficient Task Data",
  "In Verification",
  "In Rollout",
  "Insufficient Change Data",
  "Schedule Conflicts",
  "In Development",
  "In Test",
  "In Build",
  "In Rollback",
  "In Documentation",
  "Vendor Purchase",
  "Support Group Communication",
  "Task Review",
  "Miscellaneous",
  "Future Enhancement",
  "Manager Intervention",
  "Accepted",
  "Assigned",
  "Built",
  "On Hold",
  "Automatically Closed",
  "Client Hold",
  "Client Additional Information Requested",
  "Client Action Required",
  "Support Contact Hold",
  "Local Site Action Required",
  "Purchase Order Approval",
  "Supplier Delivery",
  "Third Party Vendor Action Required",
  "Infrastructure Change",
  "Initial Status",
  "Awaiting Request Assignee",
  "Work not started",
  "Cancelled by Requester",
  "Cancelled by Support",
  "Customer Close",
  "System Close",
  "System Close with Issues",
  "Requirements Gathering",
  "Implementation Schedule",
  "Customer Action",
  "External Dependency",
  "Implementation Scheduled"
]
export function Card(props) {
  let [fullName, setFullname] = useState("")
  const { isSpacer, assignee, workOrderGroup, workOrderId, summary, status, statusReason } = props;
  
  // handle for change of summary text.
  const [text, setText] =React.useState(summary); //Controll component
  const handleChange = (e) => {
    setText(e.target.value)
  };
  const handleSave = ({summary, value, previousValue }) => {
    alert(summary + ' saved as: ' + value + ' (prev: ' + previousValue + ')');
  };
  
  return _.flowRight(props.connectDragSource, props.connectDropTarget)(
    <div
      className={cn('card', {
        'Card--dragging': props.isDragging,
        'Card--spacer': props.isSpacer,
      })}
      data-tip={status}

      // If no WO have assignment catergory will show empty
    >{!isSpacer ? <React.Fragment>
      <div className="Card__title" style={{marginBottom: 15}}></div>
      <div className="icon"></div>
      <div className="data">
        <div className="user">
            <p>{workOrderId}</p>
            <p>{assignee}</p>
            <p>{workOrderGroup}</p>
        </div>
        <h5 style={{marginTop: 15}}>Summary:</h5>
        <div className='summary'>
          <EditText 
            defaultValue={text}
            onChange={handleChange}
            onSave={handleSave}
          />
        </div>
        <h5>Status Reason:</h5>
        <FormReasons currentStatus={status} workOrderId={workOrderId} />
        {/* <p> <select
              style={{ width: "100%"}}
              value={statusReason}> 
              <option>None</option>
              {reasons.map(reason => <option>{reason}</option>)}
          </select></p> */}
      </div>
      <ReactTooltip place='right' type='light' effect='float' />
    </React.Fragment> : null }
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
