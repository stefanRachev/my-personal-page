import PropTypes from "prop-types";
import styles from "./Modal.module.css";
import CommentForm from "../commentForm/CommentForm";

const Modal = ({ isOpen, onClose, image, comments, userName, onSubmit }) => {
  console.log("Modal props:", { isOpen, onClose, image, comments, userName });

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
          {image && (
            <CommentForm
              imageId={image.id}
              userName={userName} // направих го на целия обект
              onSubmit={onSubmit}
            />
          )}
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
  userName: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Modal;


