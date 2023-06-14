import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PodcasterContext } from "../layouts/AppLayout";
import { PodcastDetails } from "../utils/interfaces";
import { fetchPodcastDetails } from "../utils/services";

export default function Podcast() {
  const { podcastId } = useParams<{ podcastId: string }>();
  const { setLoading } = useContext(PodcasterContext);
  const [details, setDetails] = useState<PodcastDetails | null>(null);

  const fetchDetails = async () => {
    setLoading(true);
    const data = await fetchPodcastDetails(podcastId || "");
    setDetails(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(details);
  return (
    <>
      <h1>Podcast</h1>
      <div>Podcast details page</div>
    </>
  );
}
