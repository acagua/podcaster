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

    if (!data.results) {
      return {
        ...data,
        results: data.contents.results.filter(
          (result: Episode) => result.kind === KIND_EPISODE
        ),
      };
    }
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
    if (retries === 0) {
      console.log("Retrying with cors bypass service");
      return fetchPodcastDetails(
        `https://api.allorigins.win/raw?url=${encodeURIComponent(endpoint)}`,
        -1
      );
    }
    return null;
  }
};

export async function loadPodcasts() {
  const storedData = getLocalStorage(podcastsEndpoint);
  if (storedData) {
    return storedData;
  }
  const podcasts = await fetchPodcasts(podcastsEndpoint, FETCH_RETRIES);
  setLocalStorage(podcastsEndpoint, podcasts);
  return podcasts;
}

export async function loadPodcastDetails(id: string) {
  if (!id) {
    return null;
  }
  const endpoint = `${podcastDetailsEndpoint}${id}`;
  const storedData = getLocalStorage(endpoint);
  if (storedData) {
    return storedData;
  }
  const podcastDetails = await fetchPodcastDetails(endpoint, FETCH_RETRIES);
  setLocalStorage(endpoint, podcastDetails);
  return podcastDetails;
}
