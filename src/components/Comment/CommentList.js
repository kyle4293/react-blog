import React from 'react';
import { List, ListItem, ListItemText, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function CommentList({ comments, onEditComment, onDeleteComment }) {
  return (
    <div>
      <Typography variant="h6" gutterBottom>Comments</Typography>
      <List>
        {Array.isArray(comments) && comments.map((comment) => (
          <ListItem key={comment.id} divider>
            <ListItemText primary={comment.contents} />
            <IconButton onClick={() => onEditComment(comment)} color="primary">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDeleteComment(comment.id)} color="secondary">
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default CommentList;
