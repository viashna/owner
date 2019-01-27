var mysql = require('mysql');
var express = require('express');
var app = express();
var bcrypt = require('bcrypt-nodejs');
var bodyParser = require('body-parser');
var createHtml = require('create-html');
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});
var msg = "";


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ams2"
});



module.exports = function (app) {


  app.post('/addFloor', urlencodedParser, (function (req, res) {
    var FloorName = req.body.Floorname;
    var houses = req.body.houses;


    var sql = "INSERT INTO floor (Name, Houses) VALUES (?,?)";
    con.query(sql, [FloorName, houses], function (err, result) {
      if (err) throw err;

      console.log("Number of records inserted: " + result.affectedRows);
      if (result.affectedRows == 1) {
        res.redirect('/FloorList');


      }

    });

  }));




  
  app.get('EditOwner', isLoggedIn, function (req, res) {
    res.render('EditOwner.ejs', {
      user: req.user
    });
  });












  app.get('/in', isLoggedIn, function (req, res) {
    res.render('index.ejs', {
      user: req.user
    });
  });

  app.get('/delComplain/:id', isLoggedIn, function (req, res) {

    var sql = "DELETE FROM owner_utility WHERE Cost_Id =?";
    con.query(sql, [req.params.id], function (err, result) {
      if (err) throw err;

      console.log(result.affectedRows);

      res.redirect('/OwnerUtilityList');

    })
  })

  app.get('/FloorList', isLoggedIn, function (req, res) {


    con.query("SELECT * FROM floor", function (err, result, fields) {
      if (err) throw err;
      Object.size = function (obj) {
        var size = 0,
          key;
        for (key in obj) {
          if (obj.hasOwnProperty(key)) size++;
        }
        return size;
      };
      var size = Object.size(result);

      res.render('FloorList.ejs', {
        floor: result,
        size: size,
        user: req.user
      });




      console.log(size);

    });

  });


  app.get('/FloorList2', isLoggedIn, function (req, res) {


    con.query("SELECT * FROM floor", function (err, result, fields) {
      if (err) throw err;
      Object.size = function (obj) {
        var size = 0,
          key;
        for (key in obj) {
          if (obj.hasOwnProperty(key)) size++;
        }
        return size;
      };
      var size = Object.size(result);

      res.render('FloorList2.ejs', {
        floor: result,
        size: size,
        user: req.user
      });




      console.log(size);

    });

  });

  



  



  

 
 
  
  


  app.get('/OwnerUtilityList', isLoggedIn, function (req, res) {
    con.query("SELECT * FROM user u,owner_utility o,house h where u.Type_Id='TY002' and u.User_Id=o.Owner_Id and u.User_Id=h.Owner_Id", function (err, result, fields) {

      if (err) throw err;
      Object.size = function (obj) {
        var size = 0,
          key;
        for (key in obj) {
          if (obj.hasOwnProperty(key)) size++;
        }
        return size;
      };
      var size = Object.size(result);

      res.render('OwnerUtilityList.ejs', {
        cost: result,
        size: size,
        user: req.user
      });




      console.log(size);

    });
  });

  app.get('/OwnerUtilityList2', isLoggedIn, function (req, res) {
    con.query("SELECT * FROM user u,owner_utility o,house h where u.Type_Id='TY002' and u.User_Id=o.Owner_Id and u.User_Id=h.Owner_Id", function (err, result, fields) {

      if (err) throw err;
      Object.size = function (obj) {
        var size = 0,
          key;
        for (key in obj) {
          if (obj.hasOwnProperty(key)) size++;
        }
        return size;
      };
      var size = Object.size(result);

      res.render('OwnerUtilityList2.ejs', {
        cost: result,
        size: size,
        user: req.user
      });




      console.log(size);

    });
  });


 
  app.get('employeeList', isLoggedIn, function (req, res) {
    res.render('employeeList.ejs', {
      user: req.user
    });
  });











 

 



  app.get('/maintainCostList', isLoggedIn, function (req, res) {
    res.render('maintainCostList.ejs', {
      user: req.user
    });

  });

  
  
 




  app.get('/committeList', isLoggedIn, function (req, res) {
    con.query("SELECT * FROM user u, committee c,committee_type t where u.User_Id=c.Member_Id and c.CType_Id=t.CType_ID order by u.User_Id DESC", function (err, result, fields) {

      if (err) throw err;
      Object.size = function (obj) {
        var size = 0,
          key;
        for (key in obj) {
          if (obj.hasOwnProperty(key)) size++;
        }
        return size;
      };
      var size = Object.size(result);

      res.render('committeList.ejs', {
        com: result,
        size: size,
        user: req.user
      });




      console.log(size);

    });
  });
  
  app.get('/complainList', isLoggedIn, function (req, res) {
    res.render('complainList.ejs');
  });
  
 
  
  app.get('/ownerNotice', isLoggedIn, function (req, res) {
    res.render('ownerNotice.ejs');
  });
  
  app.get('/CommonNotice', isLoggedIn, function (req, res) {
    res.render('CommonNotice.ejs');
  });

  app.get('/Ownerprofile', isLoggedIn, function (req, res) {
    msg = "";
    res.render('Ownerprofile.ejs', {
      user: req.user,
      msg: msg
    })
  });

  app.get('/OwnerProView', isLoggedIn, function (req, res) {
    msg = "";
    res.render('OwnerProView.ejs', {
      user: req.user,
      msg: msg
    })
  });


  app.get('/ChangeAdPass', isLoggedIn, function (req, res) {

    res.render('ChangeAdPass.ejs', {
      user: req.user
    })
  });


  app.get('/ownerList', isLoggedIn, function (req, res) {
    res.render('ownerList.ejs');
  });







  




  app.get('/ComReply', isLoggedIn, function (req, res) {
    res.render('ComReply.ejs');
  });



  

 



  



 

 
 
 


  app.get('/feature', function (req, res) {
    res.render('feature.ejs');
  });
  app.get('/about', function (req, res) {
    res.render('about.ejs');
  });

  app.get('/page', function (req, res) {
    res.render('page.ejs');
  });
  app.get('/blog', function (req, res) {
    res.render('blog.ejs');
  });
  app.get('/contact', function (req, res) {
    res.render('contact.ejs');
  });






  app.get('', function (req, res) {
    res.render('.ejs');
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();

    res.redirect('/');
  }
}