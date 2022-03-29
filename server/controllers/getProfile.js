const con = require('../database');

const getProfile = (request, response) => {
  let stmt = `SELECT FullName FROM users WHERE id = '${request.query.id}'`;
  con.query(stmt, (err, result) => {
     if (err) {
        throw err
     } else {
        response.send(result)
     }
  })
}

module.exports = getProfile;