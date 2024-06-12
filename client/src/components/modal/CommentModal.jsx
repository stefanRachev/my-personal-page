import { useState } from "react";
import styles from "./CommentModal.module.css";

const CommentModal = ({ image, closeModal }) => {
    const [comment, setComment] = useState("");
  
    const handleCommentChange = (e) => {
      setComment(e.target.value);
    };
  
    const handleAddComment = () => {
      // Логика за добавяне на коментар
      console.log("Comment added:", comment);
      setComment("");
      closeModal();
    };
  
    return (
      <div className={styles.modalBackdrop} onClick={closeModal}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <img src={image.imageUrl} alt={image.description} className={styles.image} />
          <p className={styles.imageDescription}>{image.description}</p>
          <div className={styles.commentSection}>
            <textarea
              className={styles.commentInput}
              placeholder="Enter your comment..."
              value={comment}
              onChange={handleCommentChange}
              rows={4}
            />
            <button className={styles.commentButton} onClick={handleAddComment}>
              Add Comment
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default CommentModal;