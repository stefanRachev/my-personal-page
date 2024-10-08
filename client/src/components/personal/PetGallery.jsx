import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Modal from "./modal/Modal";
import styles from "./PetGallery.module.css";

const PetGallery = () => {
  const { user, loading } = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [petImages, setPetImages] = useState([
    {
      id: 1,
      imageUrl: "https://i.imgur.com/ruLoxNV.jpg",
      description: "Sarah enjoys the day at our home.",
      comments: [],
    },
    {
      id: 2,
      imageUrl: "https://i.imgur.com/Or5SwCq.jpg",
      description: "Sarah taking a nap.",
      comments: [],
    },
    {
      id: 3,
      imageUrl: "https://i.imgur.com/bIi0ShD.jpg",
      description: "Sarah playing with my sister.",
      comments: [],
    },
    {
      id: 4,
      imageUrl: "https://i.imgur.com/WGeSBXl.jpg",
      description: "Sarah is curious.",
      comments: [],
    },
    {
      id: 5,
      imageUrl: "https://i.imgur.com/9RYlr0D.jpg",
      description: "Sarah is walking.",
      comments: [],
    },
  ]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/users/login" />;
  }


  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitComment = async ({ imageId, text }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/comments/comment`, {
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

      const updatedImages = petImages.map((img) =>
        img.id === imageId ? { ...img, comments: [...img.comments, text] } : img
      );
      setPetImages(updatedImages);
      closeModal();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className={styles.imageGallery}>
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
          <p className={styles.description}>{image.description}</p>{" "}
        </div>
      ))}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        image={selectedImage}
        comments={selectedImage ? selectedImage.comments : []}
        userName={user} 
        onSubmit={handleSubmitComment}
      />
    </div>
  );
};

export default PetGallery;
