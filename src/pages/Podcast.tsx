import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Podcast.module.css";
import { getReadableDate, msToHoursMinutes } from "../utils/date";
import { EpisodesContext } from "../layouts/DetailsLayout";
import { useLoadEpisodes } from "../hooks/useLoadEpisodes";
export default function Podcast() {
  const { podcastId } = useParams<{ podcastId: string }>();
  const { episodes } = useContext(EpisodesContext);

  useLoadEpisodes(podcastId || "");

  return (
    <>
      <div className={styles.counter}>Episodes: {episodes.length}</div>
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
          {episodes.map((episode) => (
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
