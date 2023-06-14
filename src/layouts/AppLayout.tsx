import Navbar from "../components/shared/Navbar";
import { Outlet } from "react-router-dom";
import { useState, createContext, Dispatch, SetStateAction } from "react";
import { Entry } from "../utils/interfaces";

interface PodcasterContextInterface {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  podcastList: Entry[];
  setPodcastList: Dispatch<SetStateAction<Entry[]>>;
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

const initialContext: PodcasterContextInterface = {
  loading: false,
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
  const [loading, setLoading] = useState(false);
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
