import PodcastCard from "../components/PodcastCard";
import Filter from "../components/Filter";
import styles from "./Home.module.css";
import { useContext, useEffect } from "react";
import { PodcasterContext } from "../layouts/AppLayout";
import ResultsCounter from "../components/ResultsCounter";
import { getFilteredResults } from "../utils/filter";
import { useLoaderData } from "react-router-dom";
import { Entry } from "../utils/interfaces";

export default function Home() {
  const podcasts = useLoaderData() as Entry[];
  const { filter, setPodcastList } = useContext(PodcasterContext);
  useEffect(() => {
    setPodcastList(podcasts);
  }, [podcasts, setPodcastList]);
  return (
    <>
      <div className={styles.filterContainer}>
        <ResultsCounter />
        <Filter />
      </div>
      <ul className={styles.podcasts}>
        {getFilteredResults(podcasts, filter).map((podcast) => (
          <PodcastCard key={podcast.id.attributes["im:id"]} podcast={podcast} />
        ))}
      </ul>
    </>
  );
}
