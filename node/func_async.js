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


  module.exports.checkLogin=(name,password)=>{
    return new Promise(function(resolve,reject){
     
    con.query(`SELECT * FROM users WHERE mail='${name}' AND password=${password}`, function(err,result,fields){
        if (err) throw err;
    
        resolve(result);
       
    });
  });
}

module.exports.checkRegName=(name)=>{
  return new Promise(function(resolve,reject){
   
  con.query(`SELECT * FROM users WHERE mail='${name}'`, function(err,result,fields){
      if (err) throw err;
  
      resolve(result);
     
  });
});
}

module.exports.registration=(firstName,lastName,name,password)=>{
  return new Promise(function(resolve,reject){
   
  con.query(`INSERT INTO users (first_name,last_name,mail,password,role) VALUES ('${firstName}','${lastName}','${name}','${password}','0')`, function(err,result,fields){
      if (err) throw err;

      resolve(result);
     
  });
});
}

module.exports.deleteFavouriteVacations=(id,user_id)=>{
  return new Promise(function(resolve,reject){
   
  con.query(`Delete FROM favorite_vacation WHERE  user_id='${user_id}' AND vacation_id='${id}'`, function(err,result,fields){
      if (err) throw err;

      resolve(result);
     
  });
});
}

module.exports.addFavouriteVacations=(id,user_id)=>{
  return new Promise(function(resolve,reject){
   
  con.query(`INSERT INTO favorite_vacation (user_id,vacation_id) VALUES ('${user_id}','${id}')`, function(err,result,fields){
      if (err) throw err;

      resolve(result);
     
  });
});
}

module.exports.getAllVac=(currentUserId)=>{
  return new Promise(function(resolve,reject){
  con.query(`SELECT vacation.id, vacation.title, vacation.location, vacation.image, vacation.start_date, vacation.end_date, vacation.price, favorite_vacation.user_id AS status FROM vacation LEFT JOIN favorite_vacation ON vacation.id=favorite_vacation.vacation_id ORDER BY vacation.id`, async function(err,result,fields){
      if (err) throw err;

      let userVacations= await sortUserVacations(result,currentUserId);
        
      resolve(userVacations);
    });
  });
}

sortUserVacations=(result,currentUserId)=> {
  
  let userVac=[];
  let userVacUnFav=[];

  for (let item of result) {
      if (item.status==currentUserId) {
        item.status=1;
        userVac.push(item);
      } else {
        item.status=0;
        userVacUnFav.push(item);   
    } 
  } 
  console.log(userVac);
  console.log(userVacUnFav);

  for (let item of userVacUnFav) {
    if ((userVac.find(x => x.id === item.id))==undefined)
    {
      userVac.push(item);
    }
  }
  
  console.log(userVac);
  
  return userVac
} 

module.exports.getAllVacAdmin=()=>{
  return new Promise(function(resolve,reject){
  con.query(`SELECT * FROM vacation`, async function(err,result,fields){
      if (err) throw err;

      resolve(result);
  });
});
}

module.exports.addVacation=(image,nameVac,location,dateFrom,dateTo,price)=>{
  return new Promise(function(resolve,reject){
   
  con.query(`INSERT INTO vacation (title,location,image,start_date,end_date,price) VALUES ('${nameVac}','${location}','${image}','${dateFrom}','${dateTo}','${price}')`, function(err,result,fields){
      if (err) throw err;

      resolve(result);
     
  });
});
}

module.exports.deleteVacation=(idVac)=>{
  return new Promise(function(resolve,reject){
   
  con.query(`DELETE FROM vacation WHERE id='${idVac}'`, function(err,result,fields){
      if (err) throw err;

      resolve(result);
     
  });
});
}

module.exports.updateVacation=(idVac,image,nameVac,location,dateFrom,dateTo,price)=>{
  return new Promise(function(resolve,reject){
   
  con.query(`UPDATE vacation SET title='${nameVac}',location='${location}',image='${image}',start_date='${dateFrom}',end_date='${dateTo}',price='${price}' WHERE id='${idVac}'`, function(err,result,fields){
      if (err) throw err;

      resolve(result);
     
  });
});
}


module.exports.getAllUsersVacations=()=>{
  return new Promise(function(resolve,reject){
  let UserVactionsSelect=`SELECT favorite_vacation.user_id, vacation.title FROM favorite_vacation LEFT JOIN vacation ON favorite_vacation.vacation_id=vacation.id`;
  con.query(UserVactionsSelect,function(err,result,fields){
      if (err) throw err;

      resolve(result);
    })
})
}



