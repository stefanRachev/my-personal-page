import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Modal from "./modal/Modal";
import styles from "./PetGallery.module.css";
import CommentForm from "./commentForm/CommentForm";

const PetGallery = () => {
  const { user, loading } = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [petImages, setPetImages] = useState([
    {
      id: 1,
      imageUrl: "https://i.imgur.com/ruLoxNV.jpg",
      description: "Sarah enjoys the day at our home.",
      comments: ["Lovely day!", "Sarah looks happy."],
    },
    {
      id: 2,
      imageUrl: "https://i.imgur.com/Or5SwCq.jpg",
      description: "Sarah taking a nap.",
      comments: ["So cute!", "Sweet dreams, Sarah."],
    },
    {
      id: 3,
      imageUrl: "https://i.imgur.com/bIi0ShD.jpg",
      description: "Sarah playing with my sister.",
      comments: ["Playful Sarah!", "Having fun with family."],
    },
    {
      id: 4,
      imageUrl: "https://i.imgur.com/WGeSBXl.jpg",
      description: "Sarah is curious.",
      comments: ["What a curious dog!", "Exploring new things."],
    },
    {
      id: 5,
      imageUrl: "https://i.imgur.com/9RYlr0D.jpg",
      description: "Sarah is walking.",
      comments: ["Walking with Sarah.", "Beautiful day for a walk."],
    },
  ]);


  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/users/login" />;
  }

  if (!user) {
    return <Navigate to="/users/login" />;
  }

  const openModal = (image) => {
    console.log("Opening modal for image:", image); // Log the image being opened
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("Closing modal"); // Log closing modal
    setIsModalOpen(false);
  };

  const handleSubmitComment = async ({ imageId, text }) => {
    console.log("Submitting comment:", { imageId, text }); // Log the comment being submitted
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user._id,
          text,
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
        </div>
      ))}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        image={selectedImage}
        comments={selectedImage ? selectedImage.comments : []}
        userName={user.nickName} // Pass the userName to the modal
      >
        {selectedImage && (
          <CommentForm
            imageId={selectedImage.id}
            onSubmit={handleSubmitComment}
          />
        )}
      </Modal>
    </div>
  );
};

export default PetGallery;
