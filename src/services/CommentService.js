import instance from '../axios';

class CommentService {

  async createComment(postId, commentData) {
    try {
      const response = await instance.post(`/api/comments`, {
        postId: postId,
        content: commentData
      });
      return response.data;
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  }
  

  async updateComment(commentId, commentData) {
    try {
      const response = await instance.put(`/api/comments/${commentId}`, commentData);
      return response.data;
    } catch (error) {
      console.error('Error updating comment:', error);
      throw error;
    }
  }

  async deleteComment(commentId) {
    try {
      const response = await instance.delete(`/api/comments/${commentId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  }
}

const commentService = new CommentService();
export default commentService;
