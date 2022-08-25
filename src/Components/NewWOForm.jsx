import { Component } from "react";
import { useCompanies } from '../Hooks/useEntries';
import "../CSS/NewWO.css";
export class NewWOForm extends Component {

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
        "Location Company": "",
        "Status Reason": ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  cancelCourse =() => {
    let state = {...this.state};
    for( let key in state ) {
      state[key] = "";
    }
    this.setState(state);
  }
  
  handleChange(value, event) {    this.setState({...this.state, [value]: event.target.value});  }
  handleSubmit(event) {
    let data = { 
      ...this.state,
      ["Customer Company"]: this["Company"],
      ["Location Company"]: this["Company"]
    }
    event.preventDefault();
    let formData = new FormData();
    for(let [key, value] of Object.entries(data)) {
      if(value) {
        formData.append(key, value);
      }
    }
    console.log(formData);

    let res = fetch("/create", {
    headers: {
      "Content-Type": "application/json"
    },
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
    let {companies} = this.props;
    return (<>
      <form 
      ref={form =>this.form=form} 
      onSubmit={this.handleSubmit}>
        <div className="customer">
          <table>
            <tbody>
              <th>Customer Details</th>
              <tr>
                <td>
                  <label>Company:</label>
                </td>
                <td>
                  <select id="company" value={this.state["Company"]}  onChange={this.handleChange.bind(this, "Company")}>
                    <option value={null}>Select Company</option>
                    {companies.map(company => <option>{company}</option>)}
                  </select>
                  {/* <input
                    id="company" 
                    type={"text"} 
                    
                    placeholder='Company name...' 
                    onChange={this.handleChange.bind(this, "Company")} /> */}
                </td>
              </tr>
              <tr>
                <td>
                  <label>Customers First Name:</label>
                </td>
                <td>  
                    <input
                      id="customer_fn" 
                      type={"text"} 
                      value={this.state["Customer First Name"]} 
                      placeholder='First name...' 
                      onChange={this.handleChange.bind(this, "Customer First Name")}/>
                </td>
              </tr>
              <tr>
                <td>    
                  <label>Customers Last Name:</label>
                </td>
                <td>
                    <input 
                      id="customer_ln"
                      type={"text"} 
                      value={this.state["Customer Last Name"]} 
                      placeholder='Last name...' 
                      onChange={this.handleChange.bind(this, "Customer Last Name")}/>
                </td>
              </tr>
              </tbody>      
            </table>
        </div>
        <div className="notes">
          <table>
            <th>Notes</th>
            <tr>      
              <td>
                <label>Summary:</label>
              </td>
              <td>
                  <input 
                    id="summary"
                    type={"text"} 
                    value={this.state["Summary"]} 
                    placeholder='Work Order summary...' 
                    onChange={this.handleChange.bind(this, "Summary")}/>
              </td>    
            </tr>
            <tr>
              <td>
                  <label>Detailed Description:</label>
              </td>
               <td>  
                    <input 
                      id="detailed_description"
                      type={"text"} 
                      value={this.state["Detailed Description"]} 
                      placeholder='Work Order description...' 
                      onChange={this.handleChange.bind(this, "Detailed Description")}/>
                </td>      
            </tr>
          </table>        
        </div>
        <div className="assignee">
          <table>
            <th>Request Manager</th>
              <tr>
                <td>
                  <label>Assignee First Name:</label>
                </td>
                <td>
                  <input
                    id="assignee_fn" 
                    type={"text"} 
                    valuevalue={this.state["First Name"]} 
                    placeholder='First name...' 
                    onChange={this.handleChange.bind(this, "First Name")}/>
                </td>    
              </tr>    
              <tr>
                <td>
                  <label>Assignee Last Name:</label>
                </td>
                <td>
                  <input
                    id="assignee_ln" 
                    type={"text"} 
                    value={this.state["Last Name"]} 
                    placeholder='Last name...' 
                    onChange={this.handleChange.bind(this, "Last Name")}/>
                </td>
              </tr>      
          </table>        
        </div>
      </form>
      <div className="full_width">
        <button className="submit" type="submit" onClick={this.handleSubmit.bind(this)}>Submit Response</button>
        <button className="reset" onClick={this.cancelCourse}> Clear Form</button>
      </div>
      </>
    );
  }
}

export default NewWOForm;
