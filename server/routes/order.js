import express from 'express'
import{
  createOrder,
  getOneOrder,
  getLoggedInOrders,
  admingetAllOrders,
  adminUpdateOrder,
  adminDeleteOrder,
} from "../controllers/order.controller.js"
const router = express.Router();
import { isLoggedIn, customRole } from "../middlewares/auth.middleware.js"
import AuthRoles from '../utils/authRoles.js';

router.route("/order/create").post(isLoggedIn, createOrder);
router.route("/order/:id").get(isLoggedIn, getOneOrder);
router.route("/myorder").get(isLoggedIn, getLoggedInOrders);

//admin routes
router
  .route("/admin/orders")
  .get(isLoggedIn, customRole(AuthRoles.ADMIN), admingetAllOrders);
router
  .route("/admin/order/:id")
  .put(isLoggedIn, customRole(AuthRoles.ADMIN), adminUpdateOrder)
  .delete(isLoggedIn, customRole(AuthRoles.ADMIN), adminDeleteOrder);

export default router
