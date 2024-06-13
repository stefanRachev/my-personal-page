import PropTypes from "prop-types";
import styles from "./CommentModal.module.css";

const CommentModal = ({
  image,
  comments,
  closeModal,
  handleCommentChange,
  handleAddComment,
  comment,
  error,
}) => {
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
          {error && <p className={styles.error}>{error}</p>}
        </div>
        <div className={styles.commentsList}>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id} className={styles.comment}>
                <p>{comment.text}</p>
                <span>by {comment.author}</span>
              </div>
            ))
          ) : (
            <p>No comments yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

CommentModal.propTypes = {
  image: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  closeModal: PropTypes.func.isRequired,
  handleCommentChange: PropTypes.func.isRequired,
  handleAddComment: PropTypes.func.isRequired,
  comment: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default CommentModal;
