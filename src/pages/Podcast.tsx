import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PodcasterContext } from "../layouts/AppLayout";
import { PodcastDetails } from "../utils/interfaces";
import { loadPodcastDetails } from "../utils/services";
import styles from "./Podcast.module.css";
import { getReadableDate, getReadableTime } from "../utils/date";
export default function Podcast() {
  const { podcastId } = useParams<{ podcastId: string }>();
  const { setLoading } = useContext(PodcasterContext);
  const [details, setDetails] = useState<PodcastDetails | null>(null);

  const fetchDetails = async () => {
    setLoading(true);
    const data = await loadPodcastDetails(podcastId || "");
    setDetails(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={styles.counter}>Episodes: {details?.resultCount}</div>
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
          {details?.results.map((episode) => (
            <li key={episode.episodeGuid} className={styles.listItem}>
              <span className={styles.cell}>{episode.trackName}</span>
              <span className={styles.cell}>
                {getReadableDate(episode.releaseDate)}
              </span>
              <span className={styles.cell}>
                {getReadableTime(episode.trackTimeMillis)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
