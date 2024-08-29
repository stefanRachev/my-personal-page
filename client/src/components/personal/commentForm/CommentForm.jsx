import { useState } from "react";
import PropTypes from "prop-types";

import styles from "./CommentForm.module.css";

const CommentForm = ({ imageId, onSubmit, userName }) => {

  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const comment = {
      imageId,
      text,
      timestamp: new Date().toISOString(),
    };

    onSubmit(comment);
    setText("");
  };


  return (
    <form onSubmit={handleSubmit} className={styles.commentForm}>
      <div className={styles.commentUserInfo}>
        <span className={styles.commentUserName}>{userName.nickName}</span>{" "}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
          required
          className={styles.commentTextarea}
        />
      </div>
      <button type="submit" className={styles.commentButton}>
        Submit
      </button>
    </form>
  );
};

CommentForm.propTypes = {
  imageId: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  userName: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    nickName: PropTypes.string.isRequired,
    iat: PropTypes.number.isRequired,
    exp: PropTypes.number.isRequired,
  }).isRequired,
};

export default CommentForm;
