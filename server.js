const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
})


// Read all employees listed
app.get('/api/employee', (req, res) => {

})

// Delete an employee
app.delete('/api/employee/:id', (req, res) => {

})

// Read list of all employees and roles
app.get('/api/all... employees', (req, res) => {

})

// Updtae an employee
app.put('/api/employeee../:id', (req, res) => {

})

// Default response for any other request not found 
app.use((req, res) => {

})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  })