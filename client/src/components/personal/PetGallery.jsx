import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Modal from "./modal/Modal";
import styles from "./PetGallery.module.css";


const petImages = [
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
];

const PetGallery = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/users/login" />;
  }

  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
      />
    </div>
  );
};

export default PetGallery;
