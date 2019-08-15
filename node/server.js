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


app.get('/registration',async (req,res)=>{
  firstName=req.query.firstName;  
  lastName=req.query.lastName;
  name=req.query.name;  
  password=req.query.password;
  console.log(name,password,firstName,lastName); 
  let ans1=await funAsync.checkRegName(name); 
  console.log('ans1',ans1); 
  if (ans1=="") {
       
       let ans2=await funAsync.registration(firstName,lastName,name,password);
       console.log('ans2',ans2);         
       if (ans2!=="") {
          let ans=await funAsync.checkLogin(name,password);
          res.cookie('currentUser', '1', { maxAge: 11900000000 });
          console.log('ans',ans); 
          res.send(ans);
          console.log('ans for React registration',ans);  
       }
 }

 else {
   let ans=""; 
   res.send(ans); 
   console.log('ans for React registration',ans);  
 } 
  
  
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
  updateFav=req.query.updateFav;
  console.log(id,user_id,updateFav);
    if (updateFav==0) {
      let ans=await funAsync.deleteFavouriteVacations(id,user_id);
       res.send(ans);
    } else {
  let ans=await funAsync.addFavouriteVacations(id,user_id);
  res.send(ans);
    }
})

app.get('/getVacationsForChart', async (req,res)=>{
  
  let ans = await funAsync.getAllUsersVacations();    
  res.send(ans);
});  

app.get('/addVacation',async (req,res)=>{
  image=req.query.image;  
  nameVac=req.query.nameVac;
  location=req.query.location;
  dateFrom=req.query.dateFrom;
  dateTo=req.query.dateTo;
  price=req.query.price;
  
  let ans=await funAsync.addVacation(image,nameVac,location,dateFrom,dateTo,price);
  
  res.send(ans);
  console.log('ans for React addVacation',ans);  
})

app.get('/deleteVacation',async (req,res)=>{
  idVac=req.query.idVac;  
  
  let ans=await funAsync.deleteVacation(idVac);
  
  res.send(ans);
  console.log('ans for React deleteVacation',ans);  
})

app.get('/updateVacation',async (req,res)=>{
  image=req.query.image;  
  nameVac=req.query.nameVac;
  location=req.query.location;
  dateFrom=req.query.dateFrom;
  dateTo=req.query.dateTo;
  price=req.query.price;
  idVac=req.query.idVac; 
  
  let ans=await funAsync.updateVacation(idVac,image,nameVac,location,dateFrom,dateTo,price);
  
  res.send(ans);
 
})
app.listen(5000);











