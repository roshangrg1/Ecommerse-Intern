import express from 'express'

const router = express.Router();

import { home, homedummy} from '../controllers/home.controller.js';

router.get('/',home);
router.get('/home', homedummy)

export default router