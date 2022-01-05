const express = require('express');
const app = express();
const con = require('./database');
const cors = require('cors');
const bcrypt = require('bcrypt')

app.use(express.json());
app.use(cors())

app.post('/regester', async (request, response) => {
   async function cryptPass(value) {
      const salt = await bcrypt.genSalt();
      var hashed = await bcrypt.hash(value, salt);
      return hashed;
   }

   let password = await cryptPass(request.body.Password);
   let stmt = `INSERT INTO users (FullName, Email, Password) VALUE('${request.body.FullName}', '${request.body.Email}', '${password}')`
   con.query(stmt, (err, result) => {
      if (err) {
         throw err
      } else {
         response.send({
            isRegister: true,
            user_id: result.insertId
         });
      }
   })
})

app.post('/login', (request, response) => {
   let stmt = `SELECT * FROM users WHERE Email='${request.body.Email}'`;
   con.query(stmt, (err, result) => {
      if (err) {
         throw err
      } else {
         if (result.length === 1) {
            bcrypt.compare(request.body.Password, result[0].Password, function (err, isMatch) {
               if (err) {
                  throw err
               } else if (!isMatch) {
                  response.send({
                     isEmailExist: true,
                     isPasswordExist: false,
                  })
               } else {
                  response.send({
                     isEmailExist: true,
                     isPasswordExist: true,
                     user_id: result[0].UserID
                  })
               }
            })
         } else {
            response.send({
               isEmailExist: false,
            })
         }
      }
   })
})

app.get('/search', (request, response) => {
   var keyword = request.query.keyword;


   let stmt = `SELECT * FROM places WHERE Address LIKE '%${keyword}%'`;
   con.query(stmt, (err, result) => {
      if (err) {
         throw err
      } else {
         response.send(result)
      }
   })
})

app.get('/places', (request, response) => {
   let stmt = `SELECT * FROM places`;
   con.query(stmt, (err, result) => {
      if (err) {
         throw err
      } else {
         response.send(result)
      }
   })
})

app.get('/profile?:id', (request, response) => {
   let stmt = `SELECT FullName FROM users WHERE UserID = '${request.query.id}'`;
   con.query(stmt, (err, result) => {
      if (err) {
         throw err
      } else {
         response.send(result)
      }
   })
})

app.listen(3001)