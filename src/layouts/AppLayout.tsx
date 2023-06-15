import Navbar from "../components/shared/Navbar";
import { Outlet } from "react-router-dom";
import { useState, createContext, Dispatch, SetStateAction } from "react";
import { Entry } from "../utils/interfaces";

interface Loader {
  podcasts: boolean;
  episodes: boolean;
}
interface PodcasterContextInterface {
  loading: Loader;
  setLoading: Dispatch<SetStateAction<Loader>>;
  podcastList: Entry[];
  setPodcastList: Dispatch<SetStateAction<Entry[]>>;
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

const initialContext: PodcasterContextInterface = {
  loading: { podcasts: false, episodes: false },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLoading: () => {},
  podcastList: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setPodcastList: () => {},
  filter: "",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setFilter: () => {},
};

export const PodcasterContext =
  createContext<PodcasterContextInterface>(initialContext);

export default function App() {
  const [loading, setLoading] = useState<Loader>({
    podcasts: false,
    episodes: false,
  });
  const [podcastList, setPodcastList] = useState<Entry[]>([]);
  const [filter, setFilter] = useState("");

  return (
    <PodcasterContext.Provider
      value={{
        loading,
        setLoading,
        podcastList,
        setPodcastList,
        filter,
        setFilter,
      }}
    >
      <Navbar />
      <main>
        <Outlet />
      </main>
    </PodcasterContext.Provider>
  );
}
