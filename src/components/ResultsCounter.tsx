import { useContext } from "react";
import styles from "./ResultsCounter.module.css";
import { PodcasterContext } from "../layouts/AppLayout";
import { getFilteredResults } from "../utils/filter";
export default function ResultsCounter() {
  const { podcastList, filter } = useContext(PodcasterContext);

  const filteredPodcasts = getFilteredResults(podcastList, filter);

  return <div className={styles.counter}>{filteredPodcasts.length}</div>;
}
