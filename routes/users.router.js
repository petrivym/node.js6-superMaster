const router = require('express').Router();

const { controllers } = require('../controllers');
const { userMiddleware, authMiddleware } = require('../middleware');

router.get('/', userMiddleware.checkIsNotEmpty, controllers.getAllUsers);
router.post('/', userMiddleware.checkValidCreateOrUpdate, controllers.createUser);

router.use('/:id', authMiddleware.checkToken(), userMiddleware.checkIsPresent);

router.get('/:id', controllers.getUserById);
router.delete('/:id', controllers.deleteUserByLogin);
router.put('/:id', userMiddleware.checkValidCreateOrUpdate, controllers.updateUserByLogin);

module.exports = router;
