import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import styles from "./Modal.module.css";
import CommentForm from "../commentForm/CommentForm";

const Modal = ({ isOpen, onClose, image, userName, onSubmit }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      if (image) {
        try {
          const response = await fetch(
            `${
              import.meta.env.VITE_API_URL
            }/comments?imageUrl=${encodeURIComponent(image.imageUrl)}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch comments");
          }
          const commentsData = await response.json();
          setComments(commentsData); //new
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      }
    };

    fetchComments();
  }, [image]);

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
              comments.map((comment) => (
                <li key={comment._id} className={styles.commentItem}>
                  <div>{comment.text}</div>
                  <div className={styles.commentTimestamp}>
                    {new Date(comment.createdAt).toLocaleString()}
                  </div>{" "}
                </li>
              ))
            ) : (
              <p>No comments available</p>
            )}
          </ul>
          {image && (
            <CommentForm
              imageId={image.id}
              userName={userName}
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
  userName: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Modal;
