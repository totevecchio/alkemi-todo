const moment = require('moment')

exports.abm_get_all = (req, res) => {
  const { l } = req.params;
  const sql = `SELECT * FROM usuario LIMIT ${l}`;
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

exports.abm_add = (req, res) => {
  const sql = "INSERT INTO Usuario SET ?";
  req.getConnection((err, connection) => {
    const gasto = {
      id: req.body.id,
      Concepto: req.body.Concepto,
      Monto: req.body.Monto,
      Fecha: req.body.Fecha,
      Tipo: req.body.Tipo,
    };

    connection.query(sql, gasto, (err) => {
      if (err) throw err;
      res.send("Gasto agregado");
    });
  });
};

exports.abm_update = (req, res) => {
  req.getConnection((err, connection) => {
    const { id } = req.params;
    const { Concepto, Monto, Fecha, Tipo } = req.body;
    const sql = `UPDATE Usuario SET Concepto = '${Concepto}' , Monto = '${Monto}' , Fecha = '${moment(Fecha).format("YYYY-MM-DD")}', Tipo = '${Tipo}' WHERE id = '${id}'`;

    connection.query(sql, (err) => {
      if (err) throw err;
      res.send("Usuario updated");
    });
  });
};

exports.abm_delete = (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM Usuario WHERE id = '${id}'`;
  req.getConnection((err, connection) => {
    connection.query(sql, (err) => {
      if (err) throw err;
      res.send("Gasto Deleted");
    });
  });
};

exports.abm_delete_all = (req, res) => {
    const sql = `DELETE FROM usuarios`;
    req.getConnection((err, connection) => {
      connection.query(sql, (err) => {
        if (err) throw err;
        res.send("Gasto Deleted");
      });
    });
  };
