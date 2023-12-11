import { useContext, useState } from 'react';
import { UserContext } from '../App';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

import { BlogContext } from '../pages/Blog';

export const fetchComments = async ({
  skip = 0,
  blogId,
  setParentCommentCountFun,
  commentArray = null,
}) => {
  let res;

  try {
    const { data } = await axios.post(
      import.meta.env.VITE_SERVER_DOMAIN + '/get-blog-comments',
      { skip, blogId }
    );

    console.log('data', data);

    if (data) {
      data.map((comment) => {
        comment.childrenLevel = 0;
      });

      setParentCommentCountFun((preVal) => preVal + data.length);

      if (commentArray == null) {
        res = { results: data };
      } else {
        res = { results: [...commentArray, ...data] };
      }
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

const CommentField = ({ action }) => {
  const [comment, setComment] = useState('');

  const {
    userAuth: { access_token, username, fullname, profile_img },
  } = useContext(UserContext);

  const {
    blog,
    blog: {
      _id,
      author: { _id: blog_author },
      comments,
      activity,
      activity: { total_comments, total_parent_comments },
    },
    setBlog,
    setTotalParentCommentsLoaded,
  } = useContext(BlogContext);

  const handleComment = async () => {
    if (!access_token) {
      return toast.error('Login first to leave a comment');
    }

    if (!comment.length) {
      return toast.error('Write something to leave a comment');
    }

    try {
      const { data } = await axios.post(
        import.meta.env.VITE_SERVER_DOMAIN + '/add-comment',
        { _id, comment, blog_author },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      setComment('');

      data.commentedBy = { perosnal_info: { username, profile_img, fullname } };

      let newCommentArr;

      data.childrenLevel = 0;

      newCommentArr = [data];

      let parentCommentIncrementVal = 1;

      setBlog({
        ...blog,
        comments: { ...comments, results: newCommentArr },
        activity: {
          ...activity,
          total_comments: total_comments + 1,
          total_parent_comments:
            total_parent_comments + parentCommentIncrementVal,
        },
      });

      setTotalParentCommentsLoaded(
        (prevVal) => prevVal + parentCommentIncrementVal
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Toaster />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Leave a comment..."
        className="input-box pl-5 placeholder:text-dark-grey resize-none h-[150px] overflow-auto"
      ></textarea>
      <button className="btn-dark mt-5 px-10" onClick={handleComment}>
        {action}
      </button>
    </>
  );
};

export default CommentField;
