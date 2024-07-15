import express from 'express';
import {
  createComment,
  deleteComment,
  editComment,
  getPostComments,
  likeComment,
  getcomments,
//   likeComment,
} from '../controllers/comment.controller.js';
import { verifyToken } from '../utils/VerifyToken.js';
// import { verifyToken } from '../utils/VerifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getPostComments/:postId', getPostComments);
router.put('/likeComment/:commentId', verifyToken, likeComment);
router.put('/editComment/:commentId', verifyToken, editComment);
router.delete('/deleteComment/:commentId', verifyToken, deleteComment);
router.get('/getcomments', verifyToken, getcomments);

export default router;