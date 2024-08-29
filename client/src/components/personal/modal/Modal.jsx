import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import styles from "./Modal.module.css";
import CommentForm from "../commentForm/CommentForm";

const Modal = ({ isOpen, onClose, image, userName, onSubmit }) => {
  const [comments, setComments] = useState([]);
  const { user, loading } = useAuth();
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");

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
          setComments(commentsData);
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      }
    };

    fetchComments();
  }, [image]);

  const handleDelete = async (commentId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/comments/comment/${commentId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        setComments(comments.filter((comment) => comment._id !== commentId));
      } else {
        console.error("Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleEdit = (commentId, currentText) => {
    setEditCommentId(commentId);
    setEditCommentText(currentText);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/comments/comment/${editCommentId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: editCommentText }),
        }
      );

      if (response.ok) {
        const updatedComment = await response.json();
        setComments(
          comments.map((comment) =>
            comment._id === updatedComment._id ? updatedComment : comment
          )
        );
        setEditCommentId(null);
        setEditCommentText("");
      } else {
        console.error("Failed to update comment");
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditCommentId(null);
    setEditCommentText("");
  };

  if (!isOpen || loading) return null;

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
              comments.map((comment) => {
                return (
                  <li key={comment._id} className={styles.commentItem}>
                    {editCommentId === comment._id ? (
                      <>
                        <textarea
                          value={editCommentText}
                          onChange={(e) => setEditCommentText(e.target.value)}
                          className={styles.editCommentTextArea}
                        />
                        <button
                          onClick={handleSaveEdit}
                          className={styles.saveButton}
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className={styles.cancelButton}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <div>{comment.text}</div>
                        <div className={styles.commentTimestamp}>
                          {new Date(comment.createdAt).toLocaleString()}
                        </div>
                        {user && user._id === comment.user._id && (
                          <div className={styles.commentActions}>
                            <button
                              className={styles.editButton}
                              onClick={() =>
                                handleEdit(comment._id, comment.text)
                              }
                            >
                              Edit
                            </button>
                            <button
                              className={styles.deleteButton}
                              onClick={() => handleDelete(comment._id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </li>
                );
              })
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
  userName: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Modal;
