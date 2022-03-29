const bcrypt = require('bcrypt');
const con = require('../database');

const login = (request, response) => {
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
              user_id: result[0].id
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
}

module.exports = login;