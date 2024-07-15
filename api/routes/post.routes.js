import express from 'express';
import { create, deletepost, getposts, updatepost} from '../controllers/post.controller.js';
import { verifyToken } from '../utils/VerifyToken.js';

const router = express.Router();

router.post('/create', verifyToken, create)
// router.get('/getpepost/:postId/:userId', verifyToken, deletepost)
router.put('/updatepost/:postId/:userId', verifyToken,updatepost)
router.get('/getposts', getposts)
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost)



export default router; 