import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostService from '../../services/PostService';

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
    <div className='form'>
      <h2>{editMode ? 'Edit Post' : 'Create Post'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={formData.title} placeholder="Title" onChange={handleChange} />
        <textarea name="content" value={formData.content} placeholder="Content" onChange={handleChange}></textarea>
        <input type="file" multiple onChange={handleFileChange} />
        {fileNames.length > 0 && (
          <div>
            <p>Selected files:</p>
            <ul>
              {fileNames.map((fileName, index) => (
                <li key={index}>{fileName}</li>
              ))}
            </ul>
          </div>
        )}
        <br />
        <button className="right" type="submit">{editMode ? 'Update' : 'Submit'}</button>
      </form>
    </div>
  );
}

export default PostForm;
