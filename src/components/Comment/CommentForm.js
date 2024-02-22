import React, { useState } from 'react';
import CommentService from '../../services/CommentService';

function CommentForm({ postId, onCommentAdded }) {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 댓글 추가 API 호출
      const newComment = await CommentService.createComment(postId, content);
      onCommentAdded(newComment); // 상위 컴포넌트의 콜백 함수 호출
      setContent(''); // 입력 필드 초기화
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your comment here"></textarea>
      <button type="submit">Submit</button>
    </form>
  );
}

export default CommentForm;
