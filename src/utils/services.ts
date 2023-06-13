import { Entry } from "./interfaces";
import { getLocalStorage, setLocalStorage } from "./storage";

const baseUrl = "https://itunes.apple.com";

export const podcastsEndpoint = `${baseUrl}/us/rss/toppodcasts/limit=100/genre=1310/json`;

export const podcastDetailsEndpoint = `${baseUrl}/lookup?id=`;

const FETCH_RETRIES = 3;

export const fetchPodcasts = async (
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

export const fetchPodcastDetails = async (id: string) => {
  const response = await fetch(`${podcastDetailsEndpoint}${id}`);
  const data = await response.json();
  return data;
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
