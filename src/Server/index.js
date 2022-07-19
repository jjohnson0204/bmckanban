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


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

