const con = require('../database');

const getPlaces = (request, response) => {
  let stmt = `SELECT * FROM places`;
  con.query(stmt, (err, result) => {
     if (err) {
        throw err;
     } else {
        response.send(result)
     }
  })
}

module.exports = getPlaces;