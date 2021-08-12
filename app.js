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

//render the homepage when site accessed
app.get('/', function (req, res) {
    res.render('index');
});

//render the HR team homepage when link clicked on index
app.get('/hr', function (req, res) {
    res.render('hrHomepage');
});

//render the Finance team homepage when link clicked on index
app.get('/finance', function (req, res) {
    res.render('financeHomepage');
});

//render the Sales team homepage when link clicked on index
app.get('/sales', function (req, res) {
    res.render('salesHomepage');
});

//render the Talent team homepage when link clicked on index
app.get('/talent', function (req, res) {
    res.render('talentHomepage');
});

//render the newcityform page if the addcity url is accessed
app.get('/addEmployee', function (req, res) {
    console.log('here');
    res.render('newEmployeeForm');
});

app.post('/addEmployee', async (req, res) => {
    //collect the information entered as a JSON object into the city var to pass to citydata.js
    for (key in req.body) {
        if ((req.body[key]).length < 1) {
            return res.render('newEmployeeForm', { error: 'Fields cannot be empty!' })
        }
    }

    var department = ['HR', 'Sales Team', 'Finance', 'Technical', 'Talent Manager']

    if ((req.body.first_name).length > 30) {
        return res.render('newEmployeeForm', { error: 'Maximum characters for first name is 30!' })
    }
    if ((req.body.last_name).length > 40) {
        return res.render('newEmployeeForm', { error: 'Maximum characters for last name is 40!' })
    }
    if(!(/^(?!BG)(?!GB)(?!NK)(?!KN)(?!TN)(?!NT)(?!ZZ)(?:[A-CEGHJ-PR-TW-Z][A-CEGHJ-NPR-TW-Z])(?:\s*\d\s*){6}([A-D]|\s)$/.test(req.body.nin))){
        return res.render('newEmployeeForm', {error: 'Invalid NiN'})
    }
    if ((req.body.nin).length > 13) {
        return res.render('newEmployeeForm', {error: 'Invalid National Insurance Number'})
    }
    if(await empData.checkIfNationalInsuranceNumberIsInDatabase(req.body.nin)){
        return res.render('newEmployeeForm', {error: 'Someone has already registered with this insurance number'})
    }

    if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test((req.body.email).toLowerCase()))) {
        return res.render('newEmployeeForm', { error: 'Invalid email' })
    }
    if (!department.includes(req.body.department)) {
        return res.render('newEmployeeForm', { error: 'This department is not allowed' })
    }
    if ((req.body.address).length > 300) {
        return res.render('newEmployeeForm', { error: 'Maximum characters for address is 300!' })
    }
    if ((req.body.phone_number).length > 15) {
        return res.render('newEmployeeForm', { error: 'Maximum characters for phone number is 15!' })
    }
    if ((req.body.sortcode).length > 8) {
        return res.render('newEmployeeForm', { error: 'Maximum characters for sort code is 8!' })
    }
    if ((req.body.account_number).length > 26) {
        return res.render('newEmployeeForm', { error: 'Maximum characters for account number is 26!' })
    }
    if ((req.body.salary).length > 9) {
        return res.render('newEmployeeForm', { error: 'You are too rich!' })
    }

    req.body.nin = (req.body.nin).replace(/ /g,'')
    let insertedKey = await empData.addEmployee(req.body);


    // validate here
    res.render('newEmployeeForm', req.body)
})

//render the generate report page 
// app.get('/generateReport', function (req, res) {
//     res.render('generateReport');
// });

app.get('/generateReport', async (req, res) => { 
    res.render('generateReport', { employees: await empData.getEmployees() } ) 
});

//Apply middleware function to express
app.use(middle);

app.listen(7999, function () {
    console.log('Started')
});
