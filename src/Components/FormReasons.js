import { Component } from "react";
import { EditText, EditTextarea } from 'react-edit-text';
export class FormReasons extends Component {

workOrderLog= {
  Details: [
    "z1D_Details"
  ]
}  
reasons = {
  Assigned: [
    "None",
    "Initial Status",
    "Awaiting Request Assignee"
  ],
  Pending: [
    "None",
    "Client Hold",
    "Client Additional Information Requested",
    "Client Action Required",
    "Support Contact Hold",
    "Local Site Action Required",
    "Purchase Order Approval",
    "Supplier Delivery",
    "Third Party Vendor Action Required",
    "Infrastructure Change"
  ],
  "In Progress": [
    "None"
  ],
  Planning: [
    "None",
    "Work not started"
  ],
  Completed: [
    "None",
    "Successful",
    "Successful with issues"
  ],
  Cancelled: [
    "None",
    "Cancelled by Requester",
    "Cancelled by Support"
  ]
}
  constructor(props) {
    super(props);
    this.state = {
      reason: "None",
      details: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {  
    if(event.target) {
      let target = event.target 
      this.setState({...this.state, reason: target.value});  
    }else {
      let { value } = event;
      this.setState({...this.state, details: value })
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    // if(this.state.reason == "none"){
    //   alert("Must provide a status reason");
    //   return;
    // }
    if(!this.state.details) {
      alert('Must Provide a worklog detail');
      return;
    }
    let body = {
      data: {
        "Status Reason": this.state.reason,
        "z1D_Details": this.state.details,
        "Description": this.props.summary
      },
      requestId: this.props.requestId
    }
    console.log(body)
      
      //this is where where do the post request
      //pull the dropdown value from this.state.value
      //work order id is in this.props.workOrderId
      fetch("/modify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body),
      }).then((res)=>{
          let resJson = res.json();
          return resJson
      }).then((res)=>{
          if (res.status) {
              // this.setReasons("None");
              console.log("Status reason updated successfully");
              this.props.closeCard()
          } else {
              console.log("Some error occured, status reason unchanged");
          }
      }).catch((err) => {
          console.error(err);
      })

    } 

  render() {
    let { requestId, summary, status, closeCard } = this.props;
    let reasons = this.reasons[status || "Assigned"]
    return (
      <form onSubmit={this.handleSubmit}>
       
          Choose the reason:
          <select value={this.state.reason} onChange={this.handleChange.bind(this)} id="reason">
            {reasons.map((reason, i) => <option key={i}>{reason}</option>)}
          </select>
         <label>
          Worklog Details: 
        </label>
        <div className='details'>
          <EditText 
            id="details"
            placeholder="Enter worklog details here..."
            defaultValue={this.state.details}
            onSave={this.handleChange.bind(this)}
          />
        </div>
        <input type="submit" value="Submit" onSubmit={this.handleSubmit.bind(this)}/>
      </form>
    );
  }
}

export default FormReasons;