import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../../services/PostService';
import CommentService from '../../services/CommentService';
import CommentList from '../Comment/CommentList';
import CommentForm from '../Comment/CommentForm';
import { Card, CardContent, Typography, CardMedia, Button, TextField, Box } from '@mui/material';


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
    <Card>
      <CardContent>
        <Typography variant="h5">{post.title}</Typography>
        <Typography variant="body1">{post.contents}</Typography>
        {post.fileUrls && post.fileUrls.map((fileUrl, index) => (
          <CardMedia
            key={index}
            component="img"
            image={fileUrl}
            alt="Uploaded"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        ))}
      </CardContent>
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
        <Box>
          <TextField
            fullWidth
            variant="outlined"
            value={editingContent}
            onChange={(e) => setEditingContent(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleUpdateComment}>
            Update Comment
          </Button>
        </Box>
      )}
    </Card>
  );
}

export default PostDetail;
