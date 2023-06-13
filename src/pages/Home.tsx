import PodcastCard from "../components/PodcastCard";
import Filter from "../components/Filter";
import styles from "./Home.module.css";
import { useContext, useEffect } from "react";
import { loadPodcasts } from "../utils/services";
import { PodcasterContext } from "../layouts/AppLayout";
export default function Home() {
  const context = useContext(PodcasterContext);

  const fetchPodcasts = async () => {
    context?.setLoading(true);
    const data = await loadPodcasts();
    context?.setPodcastList(data);
    context?.setLoading(false);
  };
  useEffect(() => {
    fetchPodcasts();
  }, []);

  return (
    <div className={styles.home}>
      <Filter />
      <ul className={styles.podcasts}>
        {context?.podcastList.map((podcast) => (
          <PodcastCard key={podcast.id.label} podcast={podcast} />
        ))}
      </ul>
    </div>
  );
}
