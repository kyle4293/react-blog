import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostService from '../../services/PostService';

function PostForm({ editMode, existingPost }) {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const navigate = useNavigate();
  const { postId } = useParams(); // URL에서 postId를 가져옴

  useEffect(() => {
    if (editMode && existingPost) {
      setFormData({ title: existingPost.title, content: existingPost.content });
    }
  }, [editMode, existingPost]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await PostService.updatePost(postId, formData);
      } else {
        await PostService.createPost(formData);
      }
      navigate('/');
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <div className='form'>
      <h2>{editMode ? 'Edit Post' : 'Create Post'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={formData.title} placeholder="Title" onChange={handleChange} />
        <textarea name="content" value={formData.content} placeholder="Content" onChange={handleChange}></textarea>
        <button type="submit">{editMode ? 'Update' : 'Submit'}</button>
      </form>
    </div>
  );
}

export default PostForm;
