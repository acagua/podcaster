import { Entry, Episode, PodcastDetails } from "./interfaces";
import { getLocalStorage, setLocalStorage } from "./storage";

const baseUrl = "https://itunes.apple.com";

export const podcastsEndpoint = `${baseUrl}/us/rss/toppodcasts/limit=100/genre=1310/json`;

export const podcastDetailsEndpoint = `${baseUrl}/lookup?entity=podcastEpisode&limit=1000&id=`;

const FETCH_RETRIES = 3;

const KIND_EPISODE = "podcast-episode";

const fetchPodcasts = async (
  endpoint: string,
  retries: number
): Promise<Entry[]> => {
  try {
    const response = await fetch(endpoint);

    const data = await response.json();

    const podcastList: Entry[] = data.feed.entry;

    return podcastList;
  } catch (error) {
    console.error("Error fetching potcasts", error);
    if (retries > 0) {
      console.log("retrying...", "retries left:" + (retries - 1));
      return fetchPodcasts(endpoint, retries - 1);
    }
    return [];
  }
};

const fetchPodcastDetails = async (
  endpoint: string,
  retries: number
): Promise<PodcastDetails | null> => {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return {
      ...data,
      results: data.results.filter(
        (result: Episode) => result.kind === KIND_EPISODE
      ),
    };
  } catch (error) {
    console.error("Error fetching podcast details", error);
    if (retries > 0) {
      console.log("retrying...", "retries left:" + (retries - 1));
      return fetchPodcastDetails(endpoint, retries - 1);
    }
    return null;
  }
};

export async function loadPodcasts() {
  const storedProducts = getLocalStorage(podcastsEndpoint);
  if (storedProducts) {
    console.log("no fetch needed data in store is valid");
    return storedProducts;
  }
  const podcasts = await fetchPodcasts(podcastsEndpoint, FETCH_RETRIES);
  console.log("new fetch needed", podcasts);
  setLocalStorage(podcastsEndpoint, podcasts);
  return podcasts;
}

export async function loadPodcastDetails(id: string) {
  if (!id) {
    return null;
  }
  const endpoint = `${podcastDetailsEndpoint}${id}`;
  const storedProducts = getLocalStorage(endpoint);
  if (storedProducts) {
    console.log("no fetch needed data in store is valid");
    return storedProducts;
  }
  const podcastDetails = await fetchPodcastDetails(endpoint, FETCH_RETRIES);
  console.log("new fetch needed", podcastDetails);
  setLocalStorage(endpoint, podcastDetails);
  return podcastDetails;
}
