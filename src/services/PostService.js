// PostService.js

import axios from 'axios';

class PostService {
  async getTotalPosts() {
    try {
      const response = await axios.get('/api/posts/total');
      return response.data;
    } catch (error) {
      console.error('Error fetching total posts:', error);
      throw error;
    }
  }
  
  async getPosts(page, size, sortBy, isAsc) {
    try {
      const response = await axios.get(`/api/posts?page=${page}&size=${size}&sortBy=${sortBy}&isAsc=${isAsc}`);
      // console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }

  async getPostById(postId) {
    try {
      const response = await axios.get(`/api/posts/${postId}`);
      return response.data; // 데이터 반환
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error; // 에러 처리
    }
  }

  async createPost(postData) {
    try {
      const response = await axios.post('/api/posts', postData);
      return response.data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }

  async updatePost(postId, postData) {
    try {
      const response = await axios.put(`/api/posts/${postId}`, postData);
      return response.data;
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  }

  async deletePost(postId) {
    try {
      const response = await axios.delete(`/api/posts/${postId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  }
}

const postService = new PostService();
export default postService;
