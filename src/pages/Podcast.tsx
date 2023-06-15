import { useContext, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import styles from "./Podcast.module.css";
import { getReadableDate, msToHoursMinutes } from "../utils/date";
import { EpisodesContext } from "../layouts/DetailsLayout";
import { PodcastDetails } from "../utils/interfaces";
export default function Podcast() {
  const podcastDetails = useLoaderData() as PodcastDetails;

  const { setEpisodes } = useContext(EpisodesContext);

  useEffect(() => {
    setEpisodes(podcastDetails?.results);
  }, [podcastDetails, setEpisodes]);

  if (!podcastDetails) {
    return <div>Error fetching podcast details. Check console for details</div>;
  }
  return (
    <>
      <div className={styles.counter}>
        Episodes: {podcastDetails.results.length}
      </div>
      <div className={styles.listContainer}>
        <div className={styles.titles}>
          <span className={styles.cell}>
            <b>Title</b>
          </span>
          <span className={styles.cell}>
            <b>Date</b>
          </span>
          <span className={styles.cell}>
            <b>Duration</b>
          </span>
        </div>
        <ul className={styles.episodes}>
          {podcastDetails.results.map((episode) => (
            <li key={episode.episodeGuid} className={styles.listItem}>
              <Link
                className={styles.cell}
                to={`episode/${episode.episodeGuid}`}
              >
                {episode.trackName}
              </Link>
              <span className={styles.cell}>
                {getReadableDate(episode.releaseDate)}
              </span>
              <span className={styles.cell}>
                {msToHoursMinutes(episode.trackTimeMillis)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
