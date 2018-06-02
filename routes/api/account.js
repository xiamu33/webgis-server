var mysql = require('../../misc/mysql')

module.exports = function(req, res, next) {
  let data = {
    user_id: '',
    user_name: ''
  }
  let userId
  let _query = req.query
  let index = 0

  if (_query.user_id) {
    userId = _query.user_id
  } else if (_query.token) {
    global.token.forEach(item => {
      if (item.token === _query.token) {
        index ++
        userId = item.id
      }
    })
    if (!index) {
      res.send(401, global.unauthError)
    }
  } else {
    res.send(401, global.unauthError)
  }
  mysql.select([], `SELECT * FROM users WHERE user_id = ${userId}`).then(item => {
    data.user_id = item[0].user_id
    data.user_name = item[0].user_name
    res.send({data})
  })
}