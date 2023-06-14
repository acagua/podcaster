import PodcastCard from "../components/PodcastCard";
import Filter from "../components/Filter";
import styles from "./Home.module.css";
import { useContext } from "react";
import { PodcasterContext } from "../layouts/AppLayout";
import ResultsCounter from "../components/ResultsCounter";
import { getFilteredResults } from "../utils/filter";
import { useLoadPodcasts } from "../hooks/useLoadPodcasts";

export default function Home() {
  const { podcastList, filter } = useContext(PodcasterContext);

  useLoadPodcasts();

  return (
    <>
      <div className={styles.filterContainer}>
        <ResultsCounter />
        <Filter />
      </div>
      <ul className={styles.podcasts}>
        {getFilteredResults(podcastList, filter).map((podcast) => (
          <PodcastCard key={podcast.id.attributes["im:id"]} podcast={podcast} />
        ))}
      </ul>
    </>
  );
}
