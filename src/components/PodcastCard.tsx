import styles from "./PodcastCard.module.css";
export default function PodcastCard() {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img
            className={styles.circularCrop}
            src="https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/170x170bb.png"
            alt="PODCAST TITLE"
          />
        </div>
        <h2 className={styles.title}>All Songs CONSIDERED</h2>
        <p className={styles.author}>Author: NPR</p>
      </div>
    </>
  );
}
