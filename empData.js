const mysql = require('mysql'); 
const dbconfig = require('./dbconfig.json'); 
const util = require ('util');
const db = wrapDB(dbconfig);


//uses connection pool instead of creating new connection every single time
function wrapDB (dbconfig) { 
    const pool = mysql.createPool(dbconfig) 
    return { 
        query(sql, args) { 
            console.log("in query in wrapper"); 
            //returns functions that returns a promise,so in this case pool.query is returned as a function that returns a promise
            return util.promisify(pool.query).call(pool, sql, args);
            //pool in the call method is its 'this' scope, then sql and args are the arguments to be passed to pool.query
        }, 
        release () { 
            return util.promisify( pool.releaseConnection ).call( pool ) 
        } 
    } 
}

exports.addEmployee= async (newEmployee) => { 
    let results = await db.query('INSERT INTO Employee SET ?', newEmployee) 
    return results.insertId; 
}
