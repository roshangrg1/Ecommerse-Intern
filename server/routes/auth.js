import express from 'express'
const router = express.Router();

import { signUp, login, logout, getProfile, adminAllUser} from '../controllers/auth.controller.js'

import { isLoggedIn, customRole } from '../middlewares/auth.middleware.js';
import AuthRoles from '../utils/authRoles.js';

router.post('/signup', signUp)
router.post('/login', login)
router.get('/logout', logout)
router.get('/profile', isLoggedIn, getProfile)



//admin only routes
router.route("/admin/users").get(isLoggedIn, customRole(AuthRoles.ADMIN), adminAllUser);






export default router