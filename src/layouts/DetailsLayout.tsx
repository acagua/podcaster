import { useContext, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { PodcasterContext } from "./AppLayout";

import styles from "./DetailsLayout.module.css";
import { loadPodcasts } from "../utils/services";
export default function DetailsLayout() {
  const { podcastId } = useParams<{ podcastId: string }>();
  const { podcastList, setLoading, setPodcastList } =
    useContext(PodcasterContext);

  const fetchPodcasts = async () => {
    if (podcastList.length > 0) {
      return;
    }
    setLoading(true);
    const data = await loadPodcasts();
    setPodcastList(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPodcasts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const podcast = podcastList.find(
    (podcast) => podcast.id.attributes["im:id"] === podcastId
  );
  return (
    <div className={styles.container}>
      <aside className={styles.summary}>
        <img
          className={styles.box}
          src={podcast?.["im:image"][2].label}
          alt="podcast"
        />
        <div className={styles.box}>
          <p className={styles.text}>
            <b>{podcast?.["im:name"].label}</b>
          </p>
          <p className={styles.text}>By {podcast?.["im:artist"].label}</p>
        </div>
        <div className={styles.box}>
          <p className={styles.text}>
            <b>Description:</b>
          </p>
          <p className={styles.text}>
            <i>{podcast?.summary.label}</i>
          </p>
        </div>
      </aside>
      <section>
        <Outlet />
      </section>
    </div>
  );
}
