import { useState } from "react";
import styles from "./PetGallery.module.css";

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

const PetGallery = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? petImages.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === petImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={styles.petGallery}>
      <h2>Pet Gallery</h2>

      <div className={styles.imageContainer}>
        <img
          src={petImages[currentImageIndex].imageUrl}
          alt={petImages[currentImageIndex].description}
          className={styles.image}
        />
        <p className={styles.imageDescription}>
          {petImages[currentImageIndex].description}
        </p>
      </div>

      <div className={styles.controls}>
        <button className={styles.controlButton} onClick={prevImage}>
          Previous
        </button>
        <button className={styles.controlButton} onClick={nextImage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PetGallery;


