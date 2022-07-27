import { Component } from "react";

export class FormReasons extends Component {
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
    this.state = {value: 'None'};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {    this.setState({value: event.target.value});  }
  handleSubmit(event) {
      alert('Status reason needed: ' + this.state.value);
      event.preventDefault();
      //this is where where do the post request
      //pull the dropdown value from this.state.value
      //work order id is in this.props.workOrderId
      let res = fetch("/modify", {
          method: "POST",
          body: JSON.stringify({
            "Status Reason": this.state.value
          }),
      }).then((res)=>{
          let resJson = res.json();
          return resJson
      }).then((res)=>{
          if (res.status === 200) {
              // this.setReasons("None");
              console.log("Status reason updated successfully");
          } else {
              console.log("Some error occured, status reason unchanged");
          }
      }).catch((err) => {
          console.error(err);
      })

    } 

  render() {
    let { currentStatus, workOrderId } = this.props;
    if(!currentStatus) currentStatus = "Assigned";

    let reasons = this.reasons[currentStatus] || [];

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
        </label>
          Choose the reason:
          <select value={this.state.value} onChange={this.handleChange.bind(this)}>
            {reasons.map((reason, i) => <option key={i}>{reason}</option>)}
          </select>
        
        <input type="submit" value="Submit" onSubmit={this.handleSubmit.bind(this)}/>
      </form>
    );
  }
}

export default FormReasons;