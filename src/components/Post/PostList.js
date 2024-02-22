import React, { useState, useEffect, useCallback } from 'react';
import PostService from '../../services/PostService';
import Pagination from './Pagination';
import { useNavigate, Link } from 'react-router-dom';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [postsPerPage] = useState(5);
  const navigate = useNavigate();

  const fetchPosts = useCallback(async () => {
    try {
      const response = await PostService.getPosts(currentPage, postsPerPage, 'createdAt', true);
      setPosts(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }, [currentPage, postsPerPage]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts, currentPage]); // currentPage를 의존성 배열에 추가

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCreatePost = () => {
    navigate('/create-post');
  };

  return (
    <div className='posts'>
      <h2>Posts</h2>
      <button className="right" onClick={handleCreatePost}>Create Post</button>
      <div className="spacer"></div>

      {Array.isArray(posts) && posts.map((post, index) => (
        <div className='post' key={post.id}>
          <Link to={`/posts/${post.id}`}>
            <h3>{(currentPage - 1) * postsPerPage + index + 1}. {post.title}</h3>
          </Link>
        </div>
      ))}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
    </div>
  );
}

export default PostList;
