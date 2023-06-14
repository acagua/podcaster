import { useParams } from "react-router-dom";
import styles from "./Episode.module.css";
import { useContext } from "react";
import { EpisodesContext } from "../layouts/DetailsLayout";
import { useLoadEpisodes } from "../hooks/useLoadEpisodes";
export function Episode() {
  const params = useParams();
  const episodeId = params.episodeId;
  const { podcastId } = useParams<{ podcastId: string }>();
  const { episodes } = useContext(EpisodesContext);

  useLoadEpisodes(podcastId || "");

  const currentEpisode = episodes.find(
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
