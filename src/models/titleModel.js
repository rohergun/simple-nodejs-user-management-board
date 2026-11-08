const db = require('../config/database');

const findAll = () => db.all("select id, name from titles order by id");

const findById = (id) => db.get("select id, name from titles where id=?", [id]);


module.exports = { findAll, findById };
