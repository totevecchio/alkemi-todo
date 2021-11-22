
exports.user_get_user_data = (req, res) => {
  const sql = `SELECT * FROM users`;
  req.getConnection((err, connection) => {
    connection.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        res.json(result);
      } else {
        res.send("Not result");
      }
    });
  });
};

exports.new_user = (req, res) => {
  const sql = "INSERT INTO users SET ?";
  req.getConnection((err, connection) => {
    const user = {
      username: req.body.username,
      password: req.body.password,
    };
    connection.query(sql, user, (err) => {
      if (err) throw err;
      res.send("Usuario agregado");
    });
  });
};

exports.user_delete = (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM users WHERE user_id = '${id}'`;
  req.getConnection((err, connection) => {
    connection.query(sql, (err) => {
      if (err) throw err;
      res.send("Usuario Deleted");
    });
  });
};

exports.user_delete_all = (req, res) => {
  const sql = `DELETE FROM users`;
  req.getConnection((err, connection) => {
    connection.query(sql, (err) => {
      if (err) throw err;
      res.send("Users Deleted");
    });
  });
};
