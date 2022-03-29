const con = require('../database');

const searchPlaces = (request, response) => {
  var keyword = request.query.keyword;

  let stmt = `SELECT * FROM places WHERE Address LIKE '%${keyword}%'`;
  con.query(stmt, (err, result) => {
     if (err) {
        throw err
     } else {
        response.send(result)
     }
  })
}

module.exports = searchPlaces;