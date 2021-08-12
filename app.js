const express = require('express');
const app = express();
const nunjucks = require('nunjucks'); 
const empData = require('./empData.js');
const bodyParser = require('body-parser')

//'viewdir' tells nunjucks where to look for file templates
nunjucks.configure('views', { 
         express: app 
}); 

//sets the view engine to look for .html file extensions within the viewdir
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: true }));
 
var middle = function (req, res, next) { 
    console.log('middleware 1');
    //calls next function which may be another middleware, if not it calls original callback on url requested
    next();
}; 

 //render the newcityform page if the addcity url is accessed
app.get('/addEmployee', function(req, res){ 
    console.log('here');
    res.render('newEmployeeForm'); 
});

app.post('/addEmployee', async (req, res) => { 
    //collect the information entered as a JSON object into the city var to pass to citydata.js
    var emp = req.body 
    console.log(req.body)
    let insertedKey = await empData.addEmployee(req.body);
    // validate here
    res.render('newEmployeeForm', req.body) 
})

//Apply middleware function to express
app.use(middle);


app.listen(7999, function() { 
    console.log('Started') 
});