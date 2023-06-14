import { useContext, useEffect } from "react";
import { PodcasterContext } from "../layouts/AppLayout";
import { loadPodcasts } from "../utils/services";

export const useLoadPodcasts = () => {
  const { setLoading, setPodcastList } = useContext(PodcasterContext);
  const fetchPodcasts = async () => {
    setLoading(true);
    const data = await loadPodcasts();
    setPodcastList(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPodcasts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
