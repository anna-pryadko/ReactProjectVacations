const express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
const cors = require('cors');
//var mysql=require('mysql');

const funAsync = require('./func_async.js');

app.use(cookieParser())

var corsOptions = {
  optionsSuccessStatus: 200,
  allowedHeaders:['sessionId','Content-Type'],
  exposedHeaders:['sessionId'],
  credentials:true,
  origin:['http://localhost:3000'],
}

app.use(cors(corsOptions))

// var corsOptions = {
//   origin: '*'
// }

app.use(cors(corsOptions))

app.get('/checkCookie', function (req, res) {
  let checkCookie = req.cookies["currentUser"];
  console.log("req.cookies", req.cookies);
  if (checkCookie) {
      console.log("cookie")
      
      res.send(JSON.stringify("1")); 
      
  } else {
      console.log("no cookie")
      res.send(JSON.stringify("0")); 
      
  }
res.end()
})

app.get('/checkLogin',async (req,res)=>{
  name=req.query.name;  
  password=req.query.password;
  console.log(name,password); 
  let ans=await funAsync.checkLogin(name,password);
  if (ans!==[]) {
    res.cookie('currentUser', '1', { maxAge: 11900000000 });
  //console.log(name,password)
  }
  res.send(ans);
  console.log('ans for React checkLogin',ans);  
})

app.get('/Logout', function (req, res) {
  
  res.clearCookie("currentUser", "1");

let ans = "Log out";
console.log("Log out");
res.send(ans);
})

app.get('/getAllVacation',async (req,res)=>{
  currentUserId=req.query.currentUserId;
  let ans=await funAsync.getAllVac(currentUserId);
  res.send(ans);
  
})

app.get('/getAllVacationAdmin',async (req,res)=>{
  
  let ans=await funAsync.getAllVacAdmin();
  res.send(ans);
  
})

app.get('/updateFavouriteVacations',async (req,res)=>{
  id=req.query.id;  
  user_id=req.query.user_id;
  status=req.query.status;
  console.log(id,user_id,status);
    if (status==0) {
      let ans=await funAsync.deleteFavouriteVacations(id,user_id);
       res.send(ans);
    } else {
  let ans=await funAsync.addFavouriteVacations(id,user_id);
  res.send(ans);
    }
})










// app.get('/getAllUsers', async (req,res)=>{
//   userName = req.query.userName;
//   password = req.query.password;
//   let DBVUsers = await funAsync.getAllUsers();  
//   //console.log(' DB Users = ' ,DBVUsers)
//    res.send(DBVUsers);
  
// }); 

// app.get('/checkLogOn',async (req,res)=>{
//   name=req.query.name;  
//   password=req.query.password;
//   let ans=await funAsync.checkLogOn(name,password);
//   res.send(ans);
//   console.log(ans);  
// })

app.get('/saveChooseVacation',async (req,res)=>{
  id=req.query.id;  
  let ans=await funAsync.saveChooseVac(id);
  res.send(ans);
  console.log(ans);  
})

  app.get('/searchProductsByMin',async (req,res)=>{
    let ans=await funAsync.searchProd2();
    res.send(ans);
    
  })

  app.get('/searchProductsById',async (req,res)=>{
    let searchId=req.query.id  
    let ans=await funAsync.searchProd3(searchId);
    res.send(ans);
    
  })

  app.get('/searchProductsByCustomer',async (req,res)=>{
    //let searchId=req.query.id  
    let ans=await funAsync.searchProd4();
    res.send(ans);
    
  }) 

app.get('/insertProduct',async (req,res)=>{
    let ans=await funAsync.insProd();
    res.send(ans);
    
}) 

app.get('/deleteProduct',async (req,res)=>{
    let ans=await funAsync.delProd();
    res.send(ans);
    
}) 

app.get('/updateProduct',async (req,res)=>{
    let ans=await funAsync.updProd();
    res.send(ans);
    
}) 

// app.get('/getSubCategories',(req,res)=>{
//   id=req.query.id;
//   console.log("idCat: ",id);
//   con.query(`SELECT * FROM Sub_Category WHERE CategoryId=${id}`, function(err,result,fields){
//     if (err) throw err;
  
//     res.send(result);
//     console.log(result);
// });

// })

// app.get('/getProducts',(req,res)=>{
//   id=req.query.id;
//   console.log("idSubCat: ",id);
//   con.query(`SELECT * FROM Products WHERE SubCategoryId=${id}`, function(err,result,fields){
//     if (err) throw err;
  
//     res.send(result);
//     console.log(result);
// });

// })

app.listen(5000);