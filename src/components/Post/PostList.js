import React, { useState, useEffect, useCallback } from 'react';
import PostService from '../../services/PostService';
import Pagination from './Pagination';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Button, Card, CardContent, CardMedia, Typography, Grid, TextField, MenuItem, FormControl, Select, InputLabel } from '@mui/material';
import defaultImage from '../../images/logo192.png';



function PostList() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [postsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [isAsc, setIsAsc] = useState(true);
  const navigate = useNavigate();


  // 포스트 데이터 가져오기
  const fetchPosts = useCallback(async () => {
    try {
      const response = await PostService.getPosts(currentPage, postsPerPage, sortBy, isAsc, searchTerm);
      setPosts(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }, [currentPage, postsPerPage, sortBy, isAsc, searchTerm]);
  
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts, currentPage, sortBy, isAsc]); 

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleOrderChange = (event) => {
    setIsAsc(event.target.value === 'asc');
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCreatePost = () => {
    navigate('/create-post');
  };

  return (
    <div style={{ marginTop: 20 }}>
      <form onSubmit={handleSearchSubmit} style={{ marginBottom: 20 }}>
        <TextField
          label="Search Posts"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ marginRight: 10 }}
        />
        <FormControl variant="outlined" style={{ marginRight: 10 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            onChange={handleSortChange}
            label="Sort By"
          >
            <MenuItem value="createdAt">Date</MenuItem>
            <MenuItem value="title">Title</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" style={{ marginRight: 10 }}>
          <InputLabel>Order</InputLabel>
          <Select
            value={isAsc ? 'asc' : 'desc'}
            onChange={handleOrderChange}
            label="Order"
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" type="submit">Search</Button>
      </form>


      <Typography variant="h4" gutterBottom>
        Posts
      </Typography>
      <Button variant="contained" onClick={handleCreatePost} style={{ marginBottom: 20 }}>
        Create Post
      </Button>

      <Grid container spacing={2}>
        {Array.isArray(posts) && posts.map((post, index) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <RouterLink to={`/posts/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Card variant="outlined">

                <Typography gutterBottom variant="h5" component="div">

                  <CardMedia
                    component="img"
                    height="140"
                    image={post.fileUrls && post.fileUrls[0] ? post.fileUrls[0] : defaultImage}
                    alt="Post image"
                    style={{
                      objectFit: 'cover', // 이미지 비율을 유지하면서 컨테이너를 꽉 채웁니다.
                    }}
                  />
                  <CardContent>
                    {(currentPage - 1) * postsPerPage + index + 1}. {post.title}
                  </CardContent>

                </Typography>

              </Card>
            </RouterLink>
          </Grid>
        ))}
      </Grid>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
    </div>
  );
}

export default PostList;
