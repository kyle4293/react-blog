import React, { useState, useEffect } from 'react';
import PostService from '../../services/PostService';
import CommentService from '../../services/CommentService';
import CommentList from '../Comment/CommentList';
import CommentForm from '../Comment/CommentForm';
import { useParams } from 'react-router-dom';

function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await PostService.getPostById(postId);
        setPost(response);
        console.log(response);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleAddComment = (newComment) => {
    setPost(prevPost => ({
      ...prevPost,
      comments: [...prevPost.comments, newComment]
    }));
  };
  

  const handleUpdateComment = async () => {
    try {
      await CommentService.updateComment(editingCommentId, { content: editingContent });
      const updatedComments = post.comments.map(comment =>
        comment.id === editingCommentId ? { ...comment, contents: editingContent } : comment
      );
      setPost({ ...post, comments: updatedComments });
      setEditingCommentId(null);
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await CommentService.deleteComment(commentId);
      const filteredComments = post.comments.filter(comment => comment.id !== commentId);
      setPost({ ...post, comments: filteredComments });
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className='post-detail'>
      <h2>{post.title}</h2>
      <p>{post.contents}</p>
      {/* 이미지 파일 표시 */}
      {post.fileUrls && post.fileUrls.map((fileUrl, index) => (
        <img key={index} src={fileUrl} alt="Uploaded" style={{ maxWidth: "100%" }} />
      ))}
      <CommentForm postId={postId} onCommentAdded={(newComment) => handleAddComment(newComment)} />
      <CommentList
        comments={post.comments}
        onEditComment={comment => {
          setEditingCommentId(comment.id);
          setEditingContent(comment.contents);
        }}
        onDeleteComment={handleDeleteComment}
      />
      {editingCommentId && (
        <div>
          <textarea
            value={editingContent}
            onChange={(e) => setEditingContent(e.target.value)}
          />
          <button onClick={handleUpdateComment}>Update Comment</button>
        </div>
      )}
    </div>
  );
}

export default PostDetail;
