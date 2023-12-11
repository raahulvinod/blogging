import express from 'express';
import {
  addComment,
  createBlog,
  getBlog,
  getBlogComments,
  getUploadURL,
  latestBlogs,
  likeBlog,
  searchBlogCount,
  searchBlogs,
  totalBlogCount,
  trendingBlogs,
} from '../controllers/blog.controller.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express();

router.get('/get-upload-url', getUploadURL);
router.get('/trending-blogs', trendingBlogs);
router.post('/create-blog', verifyToken, createBlog);
router.post('/search-blogs', searchBlogs);
router.post('/latest-blogs', latestBlogs);
router.post('/all-latest-blog-count', totalBlogCount);
router.post('/search-blog-count', searchBlogCount);
router.post('/get-blog', getBlog);
router.post('/like-blog', verifyToken, likeBlog);
router.post('/add-comment', verifyToken, addComment);
router.post('/get-blog-comments', getBlogComments);

export default router;
