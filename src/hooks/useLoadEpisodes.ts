import { useContext, useEffect } from "react";
import { EpisodesContext } from "../layouts/DetailsLayout";
import { PodcasterContext } from "../layouts/AppLayout";
import { loadPodcastDetails } from "../utils/services";

export const useLoadEpisodes = (podcastId: string) => {
  const { setEpisodes } = useContext(EpisodesContext);

  const { setLoading } = useContext(PodcasterContext);

  const fetchDetails = async () => {
    setLoading(true);
    const data = await loadPodcastDetails(podcastId || "");
    setEpisodes(data.results);
    setLoading(false);
  };

  useEffect(() => {
    fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
