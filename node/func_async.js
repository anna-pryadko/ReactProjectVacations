const express = require('express');
var app = express();
const cors = require('cors');
var corsOptions = {
    origin: '*'
  }
  
  app.use(cors(corsOptions))
  
  var mysql=require('mysql');
  
  var con=mysql.createConnection({
      host:"localhost",
      port: 8889,
      user:"root",
      password:"root",
      database:"Project_vacation"
  });

  module.exports.checkLogOn=(name,password)=>{
    return new Promise(function(resolve,reject){
     
    con.query(`SELECT * FROM users WHERE mail='${name}' AND password=${password}`, function(err,result,fields){
        if (err) throw err;

        resolve(result);
       
    });
  });
}

module.exports.saveChooseVac=(id)=>{
  return new Promise(function(resolve,reject){
   
  con.query(`INSERT INTO favorite_vacation (user_id,vacation_id) VALUES ('2',${id})`, function(err,result,fields){
      if (err) throw err;

      resolve(result);
     
  });
});
}

module.exports.getAllVac=()=>{
    return new Promise(function(resolve,reject){
    con.query(`SELECT * FROM vacation`, function(err,result,fields){
        if (err) throw err;
        resolve(result);
    });
  });
}


module.exports.searchProd3=(id)=>{
    return new Promise(function(resolve,reject){

    con.query(`SELECT * FROM Products WHERE Id=${id}`, function(err,result,fields){
        if (err) throw err;
        resolve(result);
    });
  });
}

module.exports.searchProd4=()=>{
  return new Promise(function(resolve,reject){
  con.query(`SELECT * FROM orders`, async function(err,result,fields){
      if (err) throw err;
      for (let item of result){
        let prN= await getNameProduct(item);

        item.Name=prN[0].name;

        console.log(item);  
       
      }
    
      resolve(result);
  });
});
}

getNameProduct=(item)=>{
  return new Promise(function(resolve,reject){
  con.query(`SELECT * FROM products WHERE index=${item.Product_id}`, function(err,result1,fields){
      if (err) throw err;
      
      resolve(result1);
  });
});
}

//Вложенный селект

module.exports.getOrder=()=>
{
  return new Promise(function(resolve,reject){
    con.query(`SELECT orders.id AS OrderId, customers.Name AS CustomerName, products.name AS ProductName FROM products JOIN orders ON products.index=)`, function(err,result1,fields){
        if (err) throw err;
        
        resolve(result1);
    });
  });
}

module.exports.getShop=()=>
{
  return new Promise(function(resolve,reject){
    con.query(`SELECT orders.id AS OrderId, customers.Name AS CustomerName, products.name AS ProductName FROM products JOIN orders ON products.index=)`, function(err,result1,fields){
        if (err) throw err;
        
        resolve(result1);
    });
  });
}


module.exports.insProd=()=>{
    return new Promise(function(resolve,reject){
    con.query(`INSERT INTO Products (Name,Description,SubCategoryId,Price,CategoryId) VALUES ('Hat Hat','Hat',1,80,1)`, function(err,result,fields){
        if (err) throw err;
        resolve(result);
    });
  });
}

module.exports.delProd=()=>{
    return new Promise(function(resolve,reject){
    con.query(`DELETE FROM Products WHERE Id=8`, function(err,result,fields){
        if (err) throw err;
        resolve(result);
    });
  });
}

module.exports.updProd=()=>{
    return new Promise(function(resolve,reject){
    con.query(`UPDATE Products SET Price=600, WHERE Id=7`, function(err,result,fields){
        if (err) throw err;
        resolve(result);
    });
  });
}
