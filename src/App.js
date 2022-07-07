import logo from './logo.svg';
import './App.css';
import { Card } from "./Components/Card";
import { Column } from './Components/Column';
import { Board } from './Components/Board';
const data = [
  {
    assignee: 'Jaye Johnson',
    workorderID: 'WO0000000123',
    woGroup: ['Analyst'],
    summary: 'First card',
    status: 'Assigned'
  },
  {
    assignee: 'Jaye2 Johnson',
    workorderID: 'WO0000000123',
    woGroup: ['Analyst'],
    summary: 'Second card',
    status: 'Pending'
  }
]

var workflow = 
[
  {status : 'Assigned',allowedTransition: ['Pending']},
  {status : 'Pending',allowedTransition: ['In Process','Planning']},
  {status : 'In Process',allowedTransition: ['Pending' ,'Completed','Canceled']},
  {status : 'Planning',allowedTransition: ['Pending' ,'Completed','Canceled']}
];

function App() {
  return (
    <div className="App">
      <Column cards= {data} status="Assigned" />
      <Column cards= {data} status="Pending" />
      <Column cards= {data} status="In Process" />
      <Column cards= {data} status="Planning" />
      <Column cards= {data} status="Completed" />
      <Column cards= {data} status="Canceled" />
    </div>
  );
}

export default App;
