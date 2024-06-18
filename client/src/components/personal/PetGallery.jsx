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

function PetGallery() {
  return (
    <div className={styles.imageGallery}>
      {petImages.map((image) => (
        <div key={image.id} className={styles.imageContainer}>
          <img
            src={image.imageUrl}
            alt={image.description}
            className={styles.image}
          />
        </div>
      ))}
    </div>
  );
}

export default PetGallery;
