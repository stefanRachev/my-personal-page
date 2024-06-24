import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./CommentForm.module.css";

const CommentForm = ({ imageId, onSubmit, userName }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ imageId, text: `${userName}: ${text}` });
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.commentForm}>
      <div className={styles.commentUserInfo}>
        <span className={styles.commentUserName}>{userName}</span>
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
  userName: PropTypes.string.isRequired,
};

export default CommentForm;
