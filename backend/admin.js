import express from 'express';
import { handleAllComplaints, handleStatus,roleMiddleware } from '../controllers/admin.js';
const router = express.Router();


router.get('/AllComplaints',handleAllComplaints);
router.put('/updateStatusComplaints/:id',handleStatus);

export default router;