const Employee = require('../models/employeeModel');
const Title = require('../models/titleModel');

const { validate } = require("../validation/validation");

const getAll = () => Employee.findAll();
const getById = (id) => Employee.findById(id);
const getTitles = () => Title.findAll();
const toRecord = (data) => Employee.toRecord(data);


async function create(body) {
  const result = await validate(body);
  if (!result.errors.length) await Employee.create(toRecord(result.data));
  return result;
}

async function update(id, body) {
  const result = await validate(body, id);
  if (!result.errors.length) await Employee.update(id, toRecord(result.data));
  return result;
}

async function remove(id) {
  const { changes } = await Employee.remove(id);
  return changes > 0;
}

module.exports = { getAll, getById, getTitles, create, update, remove };
