import Router from '@koa/router';
import userController from './controllers/userController'
const router: Router = new Router();

//User
router.get('/username/login',userController.login);
router.get('/username/logout',userController.logout);
router.post('/username',userController.create);
router.put('/:username',userController.update);
router.delete('/:username',userController.delete)

//Requests
router.get('/requests',reqController.getAll);
router.post('/help_request',reqController.create);
router.put('/help_request',reqController.update);
router.delete('/help_request',reqController.delete);


export default router;
