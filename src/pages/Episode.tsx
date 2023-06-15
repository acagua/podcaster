import { useLoaderData, useParams } from "react-router-dom";
import styles from "./Episode.module.css";
import { useContext, useEffect } from "react";
import { EpisodesContext } from "../layouts/DetailsLayout";
import { PodcastDetails } from "../utils/interfaces";
export default function Episode() {
  const podcastDetails = useLoaderData() as PodcastDetails;
  const params = useParams();
  const episodeId = params.episodeId;
  const { setEpisodes } = useContext(EpisodesContext);

  useEffect(() => {
    setEpisodes(podcastDetails.results);
  }, [podcastDetails, setEpisodes]);

  const currentEpisode = podcastDetails.results.find(
    (episode) => episode.episodeGuid === episodeId
  );

  return (
    <div className={styles.container}>
      <p className={styles.title}>{currentEpisode?.trackName}</p>
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: currentEpisode?.description || "" }}
      />
      <div className={styles.playerContainer}>
        <audio className={styles.player} controls>
          <source src={currentEpisode?.episodeUrl} type="audio/mpeg" />
        </audio>
      </div>
    </div>
  );
}
