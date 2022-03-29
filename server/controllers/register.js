const bcrypt = require('bcrypt');
const con = require('../database');

const register = async (request, response) => {
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
}

module.exports = register;