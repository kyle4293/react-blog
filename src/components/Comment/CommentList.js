import React from 'react';

function CommentList({ comments, onEditComment, onDeleteComment }) {
  return (
    <div>
      <h4>Comments</h4>
      <ul>
        {Array.isArray(comments) && comments.map((comment) => (
          <div className="comment" key={comment.id}>
            <li>
              <p>{comment.contents}</p>
              <button onClick={() => onEditComment(comment)}>Edit</button>
              <button onClick={() => onDeleteComment(comment.id)}>Delete</button>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}


export default CommentList;
