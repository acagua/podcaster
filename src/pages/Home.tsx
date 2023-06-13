import PodcastCard from "../components/PodcastCard";
import Filter from "../components/Filter";
import styles from "./Home.module.css";
export default function Home() {
  return (
    <div className={styles.home}>
      <Filter />
      <ul className={styles.podcasts}>
        <PodcastCard />
        <PodcastCard />
        <PodcastCard />
        <PodcastCard />
        <PodcastCard />
      </ul>
    </div>
  );
}
