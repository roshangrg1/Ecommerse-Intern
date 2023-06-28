import express from 'express'

const router = express.Router();

// import AuthRoles from '../utils/authRoles.js';
import { createCollection, updateCollection, deleteCollection, getAllCollections } from '../controllers/collection.controller.js';
// import { customRole, isLoggedIn } from '../middlewares/auth.middleware.js';

router.route('/admin/collection')
    .post(createCollection)


router.route('/admin/collection/:id')
    .put(updateCollection)
    .delete(deleteCollection)

router.route('/admin/collections')
    .get(getAllCollections)

export default router