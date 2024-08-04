import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Modal from "./modal/Modal";
import styles from "TripsGallery.module.css";
import CommentForm from "./commentForm/CommentForm";

const host = "http://localhost:3001";

const TripsGallery = () => {
  const { user, loading } = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tripsImages, setTripsImages] = useState([
    {
      id: 1,
      imageUrl: "https://i.imgur.com/Kybqf54.jpg",
      description: "A walk around Copenhagen, Denmark.",
      comments: [],
    },
    {
      id: 2,
      imageUrl: "https://i.imgur.com/MJobXo2.jpg",
      description: "Old town.",
      comments: [],
    },
    {
      id: 3,
      imageUrl: "https://i.imgur.com/U1GhvpH.jpg",
      description: "Everyone is on wheels here.",
      comments: [],
    },
    {
      id: 4,
      imageUrl: "https://i.imgur.com/ypOEp6x.jpg",
      description: "In the Copenhagen Mall.",
      comments: [],
    },
    {
      id: 5,
      imageUrl: "https://i.imgur.com/TuoVAIw.jpg",
      description: "In the middle Balkans, Bulgaria.",
      comments: [],
    },
    {
      id: 6,
      imageUrl: "https://i.imgur.com/n5PPgG6.jpg",
      description: "A bit of peace around the town of Melnik.",
      comments: [],
    },
    {
      id: 7,
      imageUrl: "https://i.imgur.com/HQeZTtK.jpg",
      description: "Little laugh.",
      comments: [],
    },
  ]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/users/login" />;
  }

  console.log("User object:", user);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitComment = async ({ imageId, text }) => {
    try {
      const response = await fetch(host + "/comments/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user._id,
          text: `${user.nickName}: ${text}`,
          imageUrl: selectedImage.imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add comment");
      }

      const updatedImages = tripsImages.map((img) =>
        img.id === imageId ? { ...img, comments: [...img.comments, text] } : img
      );
      setTripsImages(updatedImages);
      closeModal();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className={styles.imageGallery}>
      {tripsImages.map((image) => (
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
        </div>
      ))}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        image={selectedImage}
        comments={selectedImage ? selectedImage.comments : []}
        userName={user} // Подаваме целия обект на потребителя
        onSubmit={handleSubmitComment}
      />
      {selectedImage && (
        <CommentForm
          imageId={selectedImage.id}
          onSubmit={handleSubmitComment}
          userName={user} // Подаване на user обекта като userName
        />
      )}
    </div>
  );
};

export default TripsGallery;
