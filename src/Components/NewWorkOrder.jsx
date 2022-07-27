import { Component } from "react";

export class NewWorkOrder extends Component {

  constructor(props) {
    super(props);
    this.state = {
        "Detailed Description": "",
        "First Name": "",
        "Last Name": "",
        "Customer First Name": "",
        "Customer Last Name": "",
        "Summary": "",
        "Status": "Assigned",
        "Company": "",
        "Customer Company": "",
        "Location Company": ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, value) {    this.setState({...this.state, [value]: event.target.value});  }
  handleSubmit(event) {
    alert('Status reason needed: ' + this.state.value);
    event.preventDefault();
    
    let res = fetch("/create", {
    method: "POST",
    body: JSON.stringify(this.state),
    }).then((res)=>{
        let resJson = res.json();
        return resJson
    }).then((res)=>{
        if (res.status === 200) {
            console.log("Status reason updated successfully");
        } else {
            console.log("Some error occured, status reason unchanged");
        }
    }).catch((err) => {
        console.error(err);
    })
      
  }

  render() {

    return (
      <form onSubmit={this.handleSubmit}>
        <label>Detailed Description:</label>
        <input 
            type={"text"} 
            defaultValue={this.state["Detailed Description"]} 
            placeholder='Provide a description of work order...' 
            onChange={this.handleChange.bind(this, "Detailed Description")}>
        </input>
        <br />
        <label>Assignee First Name:</label>
          <input 
            type={"text"} 
            defaultValuevalue={this.state["First Name"]} 
            placeholder='Enter first name...' 
            onChange={this.handleChange.bind(this)}>
          </input>
          <br />
        <label>Assignee Last Name:</label>
          <input 
            type={"text"} 
            defaultValue={this.state["Last Name"]} 
            placeholder='Enter last name...' 
            onChange={this.handleChange.bind(this)}>
          </input>
          <br />
        <label>Customers First Name:</label>
          <input 
            type={"text"} 
            defaultValue={this.state["Customer First Name"]} 
            placeholder='Enter customers first name...' 
            onChange={this.handleChange.bind(this)}>
          </input>
          <br />
        <label>Customers Last Name:</label>
          <input 
            type={"text"} 
            defaultValue={this.state["Customer Last Name"]} 
            placeholder='Enter customers last name...' 
            onChange={this.handleChange.bind(this)}>
          </input>
          <br />
        <label>Summary:</label>
          <input 
            type={"text"} 
            defaultValue={this.state["Summary"]} 
            placeholder='Enter a summary for work order...' 
            onChange={this.handleChange.bind(this)}>
          </input>
          <br />
        <label>Status: </label> Assigned(Default)
        <br />
        <label>Company:</label>
          <input 
            type={"text"} 
            defaultValue={this.state["Company"]} 
            placeholder='Enter the company name...' 
            onChange={this.handleChange.bind(this)}>
          </input>
          <br />
        <label>Customers Company:</label>
          <input 
            type={"text"} 
            defaultValue={this.state["Customer Company"]} 
            placeholder='Enter the customer comany name...' 
            onChange={this.handleChange.bind(this)}>
          </input>
          <br />
        <label>Location Company:</label>
          <input 
            type={"text"} 
            defaultValue={this.state["Location Company"]} 
            placeholder='Provide a description of work order...' 
            onChange={this.handleChange.bind(this)}>
          </input>
          <br />
 
        <button type="submit" onSubmit={this.handleSubmit.bind(this)}>Submit</button>
      </form>
    );
  }
}

export default NewWorkOrder;
