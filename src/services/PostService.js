// PostService.js

import instance from '../axios';

class PostService {
  async getTotalPosts() {
    try {
      const response = await instance.get('/api/posts/total');
      return response.data;
    } catch (error) {
      console.error('Error fetching total posts:', error);
      throw error;
    }
  }
  
  async getPosts(page, size, sortBy, isAsc, searchTerm = '') {
    try {
      // 검색어가 있는 경우 검색 파라미터를 추가
      const searchParam = searchTerm ? `&keyword=${searchTerm}` : ''; // 'search'를 'keyword'로 수정
      // API 요청 URL에 검색 및 정렬 파라미터 포함
      const response = await instance.get(`/api/posts?page=${page}&size=${size}&sortBy=${sortBy}&isAsc=${isAsc}${searchParam}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }
  
  

  async getPostById(postId) {
    try {
      const response = await instance.get(`/api/posts/${postId}`);
      return response.data; // 데이터 반환
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error; // 에러 처리
    }
  }

async createPost(formData) {
  try {
    const response = await instance.post('/api/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

async updatePost(postId, formData) {
  try {
    const response = await instance.put(`/api/posts/${postId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
}

  

  async deletePost(postId) {
    try {
      const response = await instance.delete(`/api/posts/${postId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  }
}

const postService = new PostService();
export default postService;
