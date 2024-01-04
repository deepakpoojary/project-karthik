const express = require('express');
const app = express();
const port = 4000;
const bodyParser= require('body-parser')
const path= require('path')
const cors = require('cors');
const pool = require('./database')
// Define a route

app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle POST requests
app.post('/submit', (req, res) => { //we are catching the data from this 
    const username= req.body["username"];
    const choice= req.body["choice"];
    const date= req.body["birthdate"];
    const insertSTMT = `INSERT INTO accounts2 (username,choice,birthdate) VALUES ('${username}','${choice}','${date}');`;
    pool
      .query(insertSTMT)
      .then((response) => {
        console.log("data saved ");
        console.log(response);  
      })
      .catch((err) =>{
        console.log(err)
      })
      console.log(req.body);
      res.send("response received "+req.body);

    // Do something with the input data
    /*console.log('Received data:', inputData);

    // Send a response back
    res.send('Data received successfully!'); */

});



// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
