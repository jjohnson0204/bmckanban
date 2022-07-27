const express = require('express');
const app = express();
const port = 9000;
const {getToken} = require("./getToken");
const {getEntries} = require("./getEntries")
const {getSearches} = require("./getSearches")

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

app.post('/modify', async (req, res) => {
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

