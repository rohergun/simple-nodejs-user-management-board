const express = require('express');
const controller = require('../controllers/employeeController');
const router = express.Router();

router.get('/', controller.list);

router.get('/employees/add', controller.showAddForm);      

router.post('/employees/add', controller.add);

router.get('/employees/:id/edit', controller.showEditForm);

router.post('/employees/:id/edit', controller.edit);

router.get('/employees/:id/delete', controller.showDeleteConfirm);

router.post('/employees/:id/delete', controller.remove);

module.exports = router;
