class FormReasons extends React.Component {
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
    InProgress: [
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
    WaitingApproval: [
      "None"
    ],
    Canceled: [
      "None",
      "Cancelled by Requester",
      "Cancelled by Support"
    ],
    Rejected: [
      "None"
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
    }
  
    render() {
      let { currentStatus } = this.props;
      let reasons = this.reasons[currentStatus];
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Choose the reason:
            <select value={this.state.value} onChange={this.handleChange}>
              <option> None </option>
              {reasons.map(reason => <option>{reason}</option>)}
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }