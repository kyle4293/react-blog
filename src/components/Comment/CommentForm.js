import React, { useState } from 'react';
import CommentService from '../../services/CommentService';
import { TextField, Button, Box } from '@mui/material';

function CommentForm({ postId, onCommentAdded }) {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newComment = await CommentService.createComment(postId, content);
      onCommentAdded(newComment);
      setContent('');
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="content"
        label="Write your comment here"
        name="content"
        autoComplete="content"
        autoFocus
        value={content}
        onChange={(e) => setContent(e.target.value)}
        multiline
        rows={4}
        variant="outlined"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Submit
      </Button>
    </Box>
  );
}

export default CommentForm;
