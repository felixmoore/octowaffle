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
    let errors = await validateForm(req, res)


    if (errors.length === 0) {
        req.body.nin = (req.body.nin).replace(/ /g, '')
        let insertedKey = await empData.addEmployee(req.body);
        console.log(req.body.department)
        return res.render('newEmployeeForm', req.body)
    }
    
    return res.render('newEmployeeForm', { errors: errors })
})

app.get('/addSalesEmployee', (req, res) => {
    return res.render('newSalesForm')
})

app.post('/addSalesEmployee', async (req, res) => {
    // console.log(req.body.employee_id)
    let errors = await validateForm(req, res)
    if(!req.body.commision instanceof Number || req.body.commision < 1){
        errors.push('Commission needs to be a positive number')
    }
    if(!req.body.total_sales_monthly instanceof Number || req.body.total_sales_monthly < 1){
        errors.push('Sales needs to be a positive number')
    }

    console.log(req.body.total_sales_monthly)
    console.log(req.body)

    if (errors.length === 0 ){
        req.body.nin = (req.body.nin).replace(/ /g, '')
        let employee = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            nin: req.body.nin,
            department: "Sales Team",
            email: req.body.email,
            address: req.body.address,
            phone_number: req.body.phone_number,
            sortcode: req.body.sortcode,
            account_number: req.body.account_number,
            salary: req.body.salary,
            isManager: req.body.isManager
        }
        let insertedKey = await empData.addEmployee(employee);
        
        let empId = await empData.getEmployeeIDByNiN(req.body.nin)
        
        let salesEmployee = {
            total_sales_monthly: req.body.total_sales_monthly,
            employee_id: empId[0].employee_id,
            commission: req.body.commission
        }
        //validate 
        await empData.addSalesEmployee(salesEmployee)
    }


    return res.render('newSalesForm', {errors: errors})
})

//render the generate report page 
// app.get('/generateReport', function (req, res) {
//     res.render('generateReport');
// });

app.get('/generateDepartmentReport', async (req, res) => {
    res.render('generateDepartmentReport', { employees: await empData.getEmployees() })
});

app.get('/generateSalesReport', async (req, res) => {
    res.render('generateSalesReport', { salesEmployees: await empData.getSalesEmployees() })
});

//Apply middleware function to express
app.use(middle);

app.listen(7999, function () {
    console.log('Started')
});

async function validateForm(req, res) {
    let errors = []
    for (key in req.body) {
        if ((req.body[key]).length < 1) {
            errors.push('Fields cannot be empty!');
            return errors;
        }
    }

    var department = ['HR', 'Sales Team', 'Finance', 'Technical', 'Talent Manager']

    if ((req.body.first_name).length > 30) {
        errors.push('Maximum characters for first name is 30!')
    }
    if ((req.body.last_name).length > 40) {
        errors.push('Maximum characters for last name is 40!')
    }

    // https://stackoverflow.com/questions/10204378/regular-expression-to-validate-uk-national-insurance-number
    if (!(/^(?!BG)(?!GB)(?!NK)(?!KN)(?!TN)(?!NT)(?!ZZ)(?:[A-CEGHJ-PR-TW-Z][A-CEGHJ-NPR-TW-Z])(?:\s*\d\s*){6}([A-D]|\s)$/i.test((req.body.nin)))) {
        errors.push('Invalid NiN')
    }
    if ((req.body.nin).length > 13) {
        errors.push('Invalid National Insurance Number')
    }
    if (await empData.checkIfNationalInsuranceNumberIsInDatabase(req.body.nin)) {
        errors.push('Someone has already registered with this insurance number')
    }
    // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test((req.body.email).toLowerCase()))) {
        errors.push('Invalid email')
    }
    if (!department.includes(req.body.department)) {
        errors.push('This department is not allowed')
    }
    if ((req.body.address).length > 300) {
        errors.push('Maximum characters for address is 300!')
    }
    if ((req.body.phone_number).length > 15) {
        errors.push('Maximum characters for phone number is 15!')
    }
    if ((req.body.sortcode).length > 8) {
        errors.push('Maximum characters for sort code is 8!')
    }
    if ((req.body.account_number).length > 8) {
        errors.push('Maximum characters for account number is 26!')
    }
    if ((req.body.salary).length > 9) {
        errors.push('You are too rich!')
    }
    return errors;
}
