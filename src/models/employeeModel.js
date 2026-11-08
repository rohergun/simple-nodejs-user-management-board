const db = require('../config/database');

const toRecord = (data) => ({
  username: data.username,
  age: Number(data.age),
  skills: data.skills,
  title_id: Number(data.title_id),
});


const findAll = () =>
  db.all(
    `select e.id, e.username, e.age, e.skills, e.title_id, t.name as title
     from employees e join titles t on t.id = e.title_id
     order by e.id desc`
  );

const findById = (id) =>
  db.get(
    `select e.id, e.username, e.age, e.skills, e.title_id, t.name as title
    from employees e join titles t on t.id = e.title_id
    where e.id = ?`,
    [id]
  );

const findByUsername = (username) =>
  db.get('select id, username from employees where username = ?', [username]);
  
const create = ({ username, age, skills, title_id }) =>
  db.run(
  'insert into employees (username, age, skills, title_id) values (?, ?, ?, ?)',
   [username, age, skills, title_id]
  );

const update = (id, { username, age, skills, title_id }) =>
  db.run(
    'update employees set username = ?, age = ?, skills = ?, title_id = ? where id = ?',
    [username, age, skills, title_id, id]
  );

const remove = (id) => db.run('delete from employees where id = ?', [id]);


module.exports = { toRecord, findAll, findById, findByUsername, create, update, remove };
