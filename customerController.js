const { append } = require('express/lib/response');
const{Customer, validate} = require ('../models/customer');
var mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'









const getAllCustomers = async (req,res,next) => {
   
    
  
  //begin
    MongoClient.connect(url, function async (err, db) {
    if (err) throw err;
    var dbo = db.db("customersDB");
    
    dbo.collection("customers").find({}).toArray( function async (err, rows) {
      if (err) throw err;
      
      db.close();
      res.render('customerlist', {"customers" : rows});
    });
  })
}




const addCustomer = (req, res, next) => {
    
    let Customer = new Customer ({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phonenumber: req.body.phonenumber,
        cnic: req.body.cnic,
        address: req.body.address,
    })
    Customer.save()
    .then(response => {
        res.json({
            message : 'Customer added'
        })
    })
    .catch (error => {
        res.json ({
            message: 'error'
        })
    })
}
 

const getAddCustomerView = (req,res,next) => {
    res.render('addCustomer');
}



const customerAction = (req,res,next) => {
    // begin traitement
    console.log(req.body)
  
  //begin
    MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("customersDB");
    var myObj = { firstname: req.body.firstname , lastname: req.body.lastname, phonenumber: req.body.phonenumber, cnic: req.body.cnic, address: req.body.address };
  
    dbo.collection("customers").insertOne(myObj, function (err, result) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  })
  //end
    //end traitement
    res.render('customerAction', {firstname: req.body.firstname ,lastname: req.body.lastname, phonenumber: req.body.phonenumber, cnic: req.body.cnic, address: req.body.address });
}


/*const getUpdateCustomer = async (req,res,next) => {
   
    
  
    //begin
      MongoClient.connect(url, function async (err, db) {
      if (err) throw err;
console.log('test')
      var dbo = db.db("customersDB");
      var myquery =req.params.id; 
      dbo.collection("customers").update(myquery, function async (err, rows) {
        if (err) throw err;
        
        db.close();
        res.render('updateCustomer', {"customers" : rows});
      });
    })
  }*/

const getUpdateCustomerView= async (req,res, next)=> {
    
         MongoClient.connect(url, function async (err, db) {
            if (err) throw err;
            var dbo = db.db("customersDB");
            //const id=req.params.id
            //console.log(id)
            dbo.collection("customers").find('62024fccd26c0b3b807fa968').toArray( function async (err, rows) {
              if (err) throw err;
              console.log(rows)
              db.close();
              res.render('updateCustomer', {"customer" : rows});
            });
          
    }); 
    }


const updateCustomer = async(req,res,next) => {
    const {error}= validate(req.body);
    if (error) return res.status(422).send(error.details[0].message);
    const id =req.params.id;
    const data = req.body;
    let customer = await Customer.findByIdAndUpdate(id , {
        firstname : data.firstname,
        lastname:data.lastname,
        phonenumber:data.phonenumber,
        cnic:data.cnic,
        address:data.address
    }, {new:true});
    if(!customer) return res.status(404).send('Customer with given id not found'); 
res.redirect('/');

}


/*const getDeleteCustomer = async (req,res,next) => {
   
    
  
    //begin
      MongoClient.connect(url, function async (err, db) {
      if (err) throw err;
      var dbo = db.db("customersDB");
      var myquery= req.params
      
      dbo.collection("customers").find({}).toArray( function async (err, rows) {
        if (err) throw err;
        
        db.close();
        res.render('customerlist', {"customers" : rows});
      });
    })
  }*/


module.exports= {
    getAllCustomers,
    getAddCustomerView,
    customerAction,
    addCustomer,
    getUpdateCustomerView,
    updateCustomer

}