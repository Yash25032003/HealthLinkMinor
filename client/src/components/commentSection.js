// src/components/CommentSection.js
import React, { useState } from 'react';
import Comment from './comment';

const CommentSection = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState({ author: '', text: '' });

  const addComment = () => {
    if (newComment.author.trim() === '' || newComment.text.trim() === '') return;

    onAddComment(newComment);
    setNewComment({ author: '', text: '' });
  };

  return (
    <div className="comment-section">
      <h2>Comments</h2>
      {comments.map((comment, index) => (
        <Comment key={index} {...comment} />
      ))}
      <div className="new-comment">
        <input
          type="text"
          placeholder="Your name"
          value={newComment.author}
          onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
        />
        <textarea
          placeholder="Add your comment..."
          value={newComment.text}
          onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
        />
        <button onClick={addComment}>Add Comment</button>
      </div>
    </div>
  );
};

export default CommentSection;
