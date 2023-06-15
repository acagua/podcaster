import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Outlet, useLoaderData, useParams } from "react-router-dom";

import styles from "./DetailsLayout.module.css";
import { Entry, Episode } from "../utils/interfaces";
import { PodcasterContext } from "./AppLayout";

interface EpisodesContextInterface {
  episodes: Episode[];
  setEpisodes: Dispatch<SetStateAction<Episode[]>>;
}
const initialContext = {
  episodes: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setEpisodes: () => {},
};
export const EpisodesContext =
  createContext<EpisodesContextInterface>(initialContext);
export default function DetailsLayout() {
  const podcasts = useLoaderData() as Entry[];
  const { podcastId } = useParams<{ podcastId: string }>();
  const { setPodcastList } = useContext(PodcasterContext);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  useEffect(() => {
    setPodcastList(podcasts);
  }, [podcasts, setPodcastList]);

  const podcast = podcasts.find(
    (podcast) => podcast.id.attributes["im:id"] === podcastId
  );
  return (
    <EpisodesContext.Provider
      value={{
        episodes,
        setEpisodes,
      }}
    >
      <div className={styles.container}>
        <aside className={styles.summary}>
          <img
            className={styles.box}
            src={podcast?.["im:image"][2].label}
            alt="podcast"
          />
          <div className={styles.box}>
            <p className={styles.noMargin}>
              <b>{podcast?.["im:name"].label}</b>
            </p>
            <p className={styles.noMargin}>
              <i>by {podcast?.["im:artist"].label}</i>
            </p>
          </div>
          <div className={styles.box}>
            <p className={`${styles.noMargin} ${styles.description}`}>
              <b>Description:</b>
            </p>
            <p className={styles.noMargin}>
              <i>{podcast?.summary.label}</i>
            </p>
          </div>
        </aside>
        <section>
          <Outlet />
        </section>
      </div>
    </EpisodesContext.Provider>
  );
}
