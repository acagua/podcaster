import { Entry } from "../utils/interfaces";
import styles from "./PodcastCard.module.css";

export default function PodcastCard({ podcast }: { podcast: Entry }) {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img
            className={styles.circularCrop}
            src={podcast["im:image"][2].label}
            alt={podcast["im:name"].label}
          />
        </div>
        <h2 className={styles.title}>{podcast["im:name"].label}</h2>
        <p className={styles.author}>{podcast["im:artist"].label}</p>
      </div>
    </>
  );
}
