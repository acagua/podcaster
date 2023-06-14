import { useContext } from "react";
import styles from "./ResultsCounter.module.css";
import { PodcasterContext } from "../layouts/AppLayout";
import { getFilteredResults } from "../utils/filter";
export default function ResultsCounter() {
  const context = useContext(PodcasterContext);
  if (!context) {
    return null;
  }
  const filteredPodcasts = getFilteredResults(
    context.podcastList,
    context?.filter
  );

  return <div className={styles.counter}>{filteredPodcasts.length}</div>;
}
