import { useState, useEffect } from "react";
import styles from "./PetGallery.module.css";
import CommentModal from "../modal/CommentModal";
import { fetchComments, addComment } from "./services/apiService";

function PetGallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  const petImages = [
    {
      id: 1,
      imageUrl: "https://i.imgur.com/ruLoxNV.jpg",
      description: "Sarah enjoys the day at our home.",
    },
    {
      id: 2,
      imageUrl: "https://i.imgur.com/Or5SwCq.jpg",
      description: "Sarah taking a nap.",
    },
    {
      id: 3,
      imageUrl: "https://i.imgur.com/bIi0ShD.jpg",
      description: "Sarah playing with my sister.",
    },
    {
      id: 4,
      imageUrl: "https://i.imgur.com/WGeSBXl.jpg",
      description: "Sarah is curious.",
    },
    {
      id: 5,
      imageUrl: "https://i.imgur.com/9RYlr0D.jpg",
      description: "Sarah is walking.",
    },
  ];

  useEffect(() => {
    if (selectedImage) {
      loadComments(selectedImage.id);
    }
  }, [selectedImage]);

  const loadComments = async (imageId) => {
    try {
      const data = await fetchComments(imageId);
      setComments(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAddComment = async () => {
    try {
      const newComment = { imageId: selectedImage.id, text: comment };
      const addedComment = await addComment(newComment);
      setComments([...comments, addedComment]);
      setComment("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.petGallery}>
      <h2>Pet Gallery</h2>

      <div className={styles.gallery}>
        {petImages.map((image) => (
          <div
            key={image.id}
            className={styles.imageContainer}
            onClick={() => openModal(image)}
          >
            <img
              src={image.imageUrl}
              alt={image.description}
              className={styles.image}
            />
            <p className={styles.imageDescription}>{image.description}</p>
          </div>
        ))}
      </div>

      {selectedImage && (
        <CommentModal
        image={selectedImage}
        comments={comments}
        closeModal={closeModal}
        handleCommentChange={handleCommentChange}
        handleAddComment={handleAddComment}
        comment={comment}
        error={error}
      />
      )}
    </div>
  );
}

export default PetGallery;
