Var mysql = require('mysql');
var connection = mysql.createConnection({
    host :'localhost',
    user:'root',
    password:'root',
    database:'ams',
});

connection .query('SELECT * FROM complaint',function(err,rows,field){
    if(!err){console.log(rows);
    }
    else{console.log(err);
    
    }
});
connection.end();