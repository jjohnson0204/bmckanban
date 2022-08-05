const express = require('express');
const app = express();
const port = 9000;
const {getToken} = require("./getToken");
const {getEntries} = require("./getEntries")
const {getSearches} = require("./getSearches")
const fetch = require("node-fetch");
var bodyParser = require('body-parser')


const host = "https://helixtrialsjc333-dev-restapi.onbmc.com";
const url = host + "/api"; 

app.use(express.json());
app.use(express.urlencoded());

let token;
app.get('/login', async (req, res) => {
    token = await getToken();
    console.log(token)
    res.send(true);
//   res.send('Hello World!')
})
app.get('/entries', async (req, res) => {
  let entries = await getEntries(token);
  res.json(entries);
//   res.send('Hello World!')
})


app.post('/search', async (req, res) => {
  let entries = await getSearches(token);
  res.json(entries);
//   res.send('Hello World!')
})

app.post('/create', async (req, res) => {
  console.log("Request")
  console.log(req.body);
  console.log(req["status"])
  console.log("_________________________________________________________")
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Authorization': 'AR-JWT ' + token 
  }
  let workOrder = await fetch(url + '/arsys/v1/entry/WOI:WorkOrderInterface_Create/', {
    headers,
    method: "POST",
    body: JSON.stringify({
        "values": {
            "z1D_Action": "CREATE",
            "Status": "Assigned",
            // "Status_Reason": "Initial Status",
            ...req.body,
            
        }
    }),
    }).then((res)=>{
        try{
          let resJson = res.json();
          return resJson
        }catch(e) {
          return res.text()
        }
        

        
    }).catch(e => {
      console.log(e)
    })
    if(typeof workOrder == "string") {
      
    }
    console.log(workOrder);
  res.json(workOrder);
//   res.send('Hello World!')
})

app.post('/modify', async (req, res) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Authorization': 'AR-JWT ' + token 
  }
  let workOrder = await fetch(url + '/arsys/v1/entry/WOI:WorkOrderInterface/', {
    headers,
    method: "POST",
    body: JSON.stringify({
        "values": {
            "z1D_Action": "MODIFY",
            ...req.body
        }
    }),
    }).then((res)=>{
        let resJson = res.json();
        return resJson
    })
  res.json(workOrder);
//   res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

