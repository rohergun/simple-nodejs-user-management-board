const EmployeeService = require('../services/employeeService');

const parseId = (raw) => (/^\d+$/.test(raw) ? Number(raw) : null);

const notFound = (res) =>
  res.status(404).render('no t-found', { message: 'Employee not found.' });

const redirectWithMessage = (res, msg) => res.redirect('/?msg=' + encodeURIComponent(msg));


async function list(req, res) {
  const employees = await EmployeeService.getAll();
  res.render('index', { employees, message: req.query.msg });
}

async function showAddForm(req, res) {
  res.render('add', { values: {}, titles: await EmployeeService.getTitles(), errors: [] });
}

async function add(req, res) {
  const { errors, data } = await EmployeeService.create(req.body);
  if (errors.length) {
    return res
      .status(400)
      .render('add', { values: data, titles: await EmployeeService.getTitles(), errors });
  }
  redirectWithMessage(res, 'Employee added.');
}


async function showEditForm(req, res) {
  const id = parseId(req.params.id);
  const employee = id && (await EmployeeService.getById(id));
  if (!employee) return notFound(res);
  res.render('edit', {
    id,
    values: employee,
    titles: await EmployeeService.getTitles(),
    errors: [],
  });
}

async function edit(req, res) {
  const id = parseId(req.params.id);
  const employee = id && (await EmployeeService.getById(id));
  if (!employee) return notFound(res);

  const { errors, data } = await EmployeeService.update(id, req.body);
  if (errors.length) {
    return res
      .status(400)
      .render('edit', { id, values: data, titles: await EmployeeService.getTitles(), errors });
  }
  redirectWithMessage(res, 'Employee updated.');
}


async function showDeleteConfirm(req, res) {
  const id = parseId(req.params.id);
  const employee = id && (await EmployeeService.getById(id));
  if (!employee) return notFound(res);
  res.render('delete', { employee });
}

async function remove(req, res) {
  const id = parseId(req.params.id);
  const deleted = id && (await EmployeeService.remove(id));
  if (!deleted) return notFound(res);
  redirectWithMessage(res, 'Employee deleted.');
}

module.exports = { list, showAddForm, add, showEditForm, edit, showDeleteConfirm, remove };
