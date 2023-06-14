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
        <ul>
          <li className={styles.listItem}>
            <span>Title</span> <span>Date</span> <span>Duration</span>
          </li>
          {details?.results.map((episode) => (
            <li key={episode.episodeGuid} className={styles.listItem}>
              <span>{episode.trackName}</span>
              <span>{getReadableDate(episode.releaseDate)}</span>
              <span>{getReadableTime(episode.trackTimeMillis)}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
