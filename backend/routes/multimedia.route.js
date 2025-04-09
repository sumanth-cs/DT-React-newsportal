import express from 'express';
import { getMultimedia, addMultimedia, deleteMultimedia } from '../controllers/multimedia.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.get('/', getMultimedia);
router.post('/', verifyToken, addMultimedia);
router.delete('/:id', verifyToken, deleteMultimedia);


// router.put('/:id', verifyToken, updateMultimedia)

export default router;