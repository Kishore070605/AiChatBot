const express = require('express')        //importing express module
const app = express()                     //creating an instance of express application
app.get('/', (req,res) => {               //defining a route for the root URL
    res.send('Hello World!')
})
app.listen(3000)                           //starting the server and listening on port 3000