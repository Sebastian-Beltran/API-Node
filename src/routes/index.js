const { Router } = require('express');
const router = Router();

const { getUsers, createUser, showUser, deleteUser, updateUser } = require('../controllers/index.controller')

//Rutas
router.get('/users', getUsers );
router.post('/users', createUser);
router.get('/users/:id', showUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;