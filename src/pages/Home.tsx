import PodcastCard from "../components/PodcastCard";
import Filter from "../components/Filter";
import styles from "./Home.module.css";
import { useContext, useEffect } from "react";
import { loadPodcasts } from "../utils/services";
import { PodcasterContext } from "../layouts/AppLayout";
import ResultsCounter from "../components/ResultsCounter";
import { getFilteredResults } from "../utils/filter";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!context) {
    return null;
  }
  return (
    <div className={styles.home}>
      <div className={styles.filterContainer}>
        <ResultsCounter />
        <Filter />
      </div>
      <ul className={styles.podcasts}>
        {getFilteredResults(context.podcastList, context.filter).map(
          (podcast) => (
            <PodcastCard key={podcast.id.label} podcast={podcast} />
          )
        )}
      </ul>
    </div>
  );
}
