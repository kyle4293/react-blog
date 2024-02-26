import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostService from '../../services/PostService';
import { TextField, Button, Typography, Box } from '@mui/material';

function PostForm({ editMode, existingPost }) {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [files, setFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    if (editMode && existingPost) {
      setFormData({ title: existingPost.title, content: existingPost.content });
    }
  }, [editMode, existingPost]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
    const fileNamesArray = Array.from(e.target.files).map(file => file.name);
    setFileNames(fileNamesArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionFormData = new FormData();
    const postRequestDto = {
      title: formData.title,
      content: formData.content,
      // Add other necessary fields here
    };
    submissionFormData.append('post', new Blob([JSON.stringify(postRequestDto)], { type: 'application/json' }));
    Array.from(files).forEach(file => {
      submissionFormData.append('files', file);
    });

    try {
      if (editMode) {
        await PostService.updatePost(postId, submissionFormData);
      } else {
        await PostService.createPost(submissionFormData);
      }
      navigate('/');
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Typography variant="h6">{editMode ? 'Edit Post' : 'Create Post'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Content"
          name="content"
          multiline
          rows={4}
          value={formData.content}
          onChange={handleChange}
          variant="outlined"
        />
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="raised-button-file"
        />
        <label htmlFor="raised-button-file">
          <Button variant="contained" component="span">
            Upload Files
          </Button>
        </label>
        {fileNames.length > 0 && (
          <Box>
            <Typography>Selected files:</Typography>
            {fileNames.map((fileName, index) => (
              <Typography key={index}>{fileName}</Typography>
            ))}
          </Box>
        )}
        <Button variant="contained" color="primary" type="submit">
          {editMode ? 'Update' : 'Submit'}
        </Button>
      </form>
    </Box>
  );
}

export default PostForm;
