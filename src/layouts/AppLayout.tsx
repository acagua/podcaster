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
export const PodcasterContext = createContext<PodcasterContextInterface | null>(
  null
);

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
