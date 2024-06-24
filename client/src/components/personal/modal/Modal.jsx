import styles from "./Modal.module.css";
import PropTypes from "prop-types";

const Modal = ({ isOpen, onClose, image, comments }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>
          x
        </button>
        {image && (
          <div className={styles.imageContainer}>
            <img
              src={image.imageUrl}
              alt={image.description}
              className={styles.image}
            />
          </div>
        )}
        <div className={styles.commentsContainer}>
          <h2>Comments</h2>
          <ul className={styles.commentsList}>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <li key={index} className={styles.commentItem}>
                  {comment}
                </li>
              ))
            ) : (
              <p>No comments available</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  image: PropTypes.object,
  comments: PropTypes.arrayOf(PropTypes.string),
};

export default Modal;
