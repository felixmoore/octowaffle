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
    var department = ['HR', 'Sales', 'Finance', 'Technical']
    let insertedKey = await empData.addEmployee(req.body);
    if((req.body.first_name).length > 30){
        return res.render('newEmployeeForm', {error: 'Maximum characters for first name is 30!'})
    }
    if((req.body.last_name).length > 40){
        return res.render('newEmployeeForm', {error: 'Maximum characters for last name is 40!'})
    }
    if(!(/^(?!BG)(?!GB)(?!NK)(?!KN)(?!TN)(?!NT)(?!ZZ)(?:[A-CEGHJ-PR-TW-Z][A-CEGHJ-NPR-TW-Z])(?:\\s*\\d\\s*){6}([A-D]|\\s)$/.test((req.body.nin).toUpperCase()))){
        return res.render('newEmployeeForm', {error: 'Invalid National Insurance Number'})
    }  
    if(!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test((req.body.email).toLowerCase()))){
        return res.render('newEmployeeForm', {error: 'Invalid email'})
    }
    if(!department.includes(req.body.department)){
        return res.render('newEmployeeForm', {error: 'This department is not allowed'})
    }
    if((req.body.address).length > 300){
        return res.render('newEmployeeForm', {error: 'Maximum characters for address is 300!'})
    }
    if((req.body.phone_number).length > 15){
        res.render('newEmployeeForm', {error: 'Maximum characters for phone number is 15!'})
    }








    // validate here
    res.render('newEmployeeForm', req.body) 
})

//Apply middleware function to express
app.use(middle);


app.listen(7999, function() { 
    console.log('Started') 
});
