import express from "express";

import { createProduct,getAllProduct,getOneProduct,adminGetAllProduct  } from "../controllers/product.controller.js";

const router =express.Router();

import { isLoggedIn } from '../middlewares/auth.middleware.js';
import AuthRoles from "../utils/authRoles.js";

// user routes
router.get('/products',getAllProduct)

// admin
router.post('/admin/product/add',isLoggedIn,()=>{AuthRoles.ADMIN},createProduct)

router.get('/admin/products', isLoggedIn,()=>{AuthRoles.ADMIN},adminGetAllProduct)

export default router