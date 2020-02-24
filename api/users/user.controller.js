const { create, getUserByName, createTaxpayer, getTax, deleteTax, updateTax } = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcryptjs");
const { sign } = require("jsonwebtoken"); 

const regExForRfc = /^([A-Z,Ñ,&]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[A-Z|\d]{3})$/

module.exports = {

  //----
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create( body, (err, results) => { 
      if(err){
        console.log(err);
        return res.status(500).json({
          succes: 0,
          message: "Database connection error"
        });  
      }
      return res.status(200).json({
        succes: 1,
        data: results
      });
    });
  },


  //----
  createTax: (req, res) => {
    body = req.body;
    if(!body.name || !body.name.length || body.name == null){
     return res.json({
        success: 0,
        message: "Missing name data."
      });
    }
    if(!body.rfc || !body.rfc.length || body.rfc.match(regExForRfc) == null ){
     return res.json({
        success: 0,
        message: "Missing rfc data or bad rfc."
      });
    }
    if(!body.email || !body.email.length || body.email == null){
     return res.json({
        success: 0,
        message: "Missing email data."
      });
    }
    if(!body.idUsuario || !body.idUsuario.length || body.idUsuario == null){
      return res.json({
        success: 0,
        message: "Missing idUsuario data."
      });
    }
    createTaxpayer( body, (err, results) => { 
      if(err){
        console.log("HOLA")
        console.log(err);
        return res.status(500).json({
          succes: 0,
          message: "Database connection error"
        });  
      }
      return res.status(200).json({
        succes: 1,
        data: results
      });
    });
  },
  
 
  //----
  getTaxpayers: (req, res) => {
    getTax((err,results) => {
      if(err){
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  

  //----
  deleteTaxpayer: (req,  res) => {
    const data = req.body;
    deleteTax( data, (err, results) => {
      if(err){
        console.log(err);
        return;
      }
      if(!results){
        return res.json({
          success: 0,
          message: "Record not found."
        });
      }
      return res.json({
        success: 1,
        message: "User deleted successfully."
      });
    });
  },

  //----
  updateTaxpayer: (req, res) => {
    const body = req.body
    if(!body.name || !body.name.length || body.name == null){
     return res.json({
        success: 0,
        message: "Missing name data."
      });
    }
    if(!body.rfc || !body.rfc.length || body.rfc.match(regExForRfc) == null ){
     return res.json({
        success: 0,
        message: "Missing rfc data or bad rfc."
      });
    }
    if(!body.email || !body.email.length || body.email == null){
     return res.json({
        success: 0,
        message: "Missing email data."
      });
    }
    if(!body.idUsuario || body.idUsuario == null){
      return res.json({
        success: 0,
        message: "Missing idUsuario data."
      });
    }
    
    
    updateTax( body, (err, results) => {
      if(err){
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "updated succesfully."
      });
    }); 
  },
  

  //----
  login: (req, res) => {
    const body = req.body;
    getUserByName(body.name, (err, results) => {
      if(err){ 
        console.log(err);
      }
      if(!results){
        return res.json({
          succees: 0,
          message: "Invalid email or password"  
        });
      }
      console.log("llego por aqui")
      console.log(results)
      console.log(results.password) 
      console.log(body.password)
      const result = compareSync(body.password, results.password);
      if(result){
        console.log("tambien por aqui")
        results.password = undefined;
        const jsontoken = sign({result: results}, process.env.SECRET_KEY, {
          expiresIn: "1h"
        });
        return res.json({
          success: 1,
          message: "login succesfully",
          token: jsontoken
        });
      }
      else{
        return res.json({
          success: 0,
          message: "Invalid email or password"
        });
      } 
    });
   
  }
}

