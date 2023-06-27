import express from "express";

import { createProduct,getAllProduct,getOneProduct,adminGetAllProduct, adminUpdateOneProduct , adminDeleteOneProduct } from "../controllers/product.controller.js";

const router =express.Router();

import { customRole, isLoggedIn } from '../middlewares/auth.middleware.js';
import AuthRoles from "../utils/authRoles.js";

// user routes
router.route('/products').get(getAllProduct)
router.route("/product/:id").get(getOneProduct);

// admin
router.post('/admin/product/add',isLoggedIn,customRole(AuthRoles.ADMIN),createProduct)

router.get('/admin/products', isLoggedIn,customRole(AuthRoles.ADMIN),adminGetAllProduct)

router
  .route("/admin/product/:id")
  .put(isLoggedIn, customRole(AuthRoles.ADMIN), adminUpdateOneProduct)
  .delete(isLoggedIn, customRole(AuthRoles.ADMIN), adminDeleteOneProduct);


export default router