import express from 'express'
const router =express.Router();

import {signUp,login, logout, getProfile}from '../controllers/auth.controller.js'

import { isLoggedIn } from '../middlewares/auth.middleware.js';

router.post('/signup',signUp)
router.post('/login',login)
router.get('/logout',logout)
router.get('/profile',isLoggedIn, getProfile)

export default router