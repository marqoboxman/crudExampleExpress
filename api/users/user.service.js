const pool = require("../../config/database");

module.exports = {

  //----
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO usuarios ( nombreUsuario, email, password)
       values (?,?,?)`,
         [
           data.name,
	   data.email,
	   data.password
         ],
         (error, results, fields) => {
           if (error){
             return callBack(error);
           }
           return callBack(null, results); 
         }
    ); 
  },
 
  //---- 
  createTaxpayer: (data, callBack) => {
    console.log(data);
    pool.query(
      `INSERT INTO contribuyentes ( razSoc, rfcUsuario, email, idUsuario)
       values(?,?,?,?)`,
      [
        data.name,
        data.rfc,
        data.email,
        data.idUser
      ],
      (error, results, fields) =>{
        if (error){
          console.log("???????")
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  

  //----
  getTax: callBack => {
    pool.query(
      `select * from contribuyentes;`,
      [],
      (error, results, fields) =>{
        if(error){
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  

  //----
   
  updateTax: (data, callBack) => {
    pool.query(
      `UPDATE contribuyentes SET razSoc=?,  rfcUsuario=?, email=?, idUsuario=? WHERE rfcUsuario=? ;`,
      [
        data.name,
        data.email,
        data.rfc,
        data.idUsuario,
        data.rfc
      ],
      (error, results, fields) =>{
        if(error){
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
   
  //----
  deleteTax: (data, callBack) => {
    pool.query(
      `DELETE FROM contribuyentes WHERE razSoc=?;`,
      [data.name],
      (error, results, fields) => {
        if(error){
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  
  
  //----
  getUserByName:(name, callBack) =>{
    pool.query(
      `SELECT * FROM usuarios WHERE nombreUsuario = ?;`,
      [name],
      (error, results, fields) => {
        if(error){
          console.log("paso por aqui");
          callBack(error);
        }
        return callBack( null, results[0]);
      }
    );
  }
}
