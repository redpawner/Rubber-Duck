import Router from '@koa/router';
import userController from './controllers/userController';
import reqController from './controllers/reqController';
const router: Router = new Router();

//User
router.post('/login', userController.login); //logs user into system and returns user details
router.post('/logout', userController.logout); //logs user out of the system and suspends active HR
router.post('/username', userController.create); // creates new user and returns id?
router.put('/:username', userController.update); // updates user info
// router.delete('/:username', userController.delete); // deletes user extra feature

//Requests
router.get('/requests', reqController.getAll); // returns all help requests that match user languages
router.post('/help_request', reqController.create); // creates new HR for logged in user
router.put('/help_request', reqController.update); // updates HR info using HR id (used for de-activating HR as well as updating info)
router.delete('/help_request', reqController.delete); // deletes HR using user_id

export default router;
