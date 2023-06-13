import Navbar from "../components/shared/Navbar";
import { Outlet } from "react-router-dom";
import { useState, createContext, Dispatch, SetStateAction } from "react";
import { Entry } from "../utils/interfaces";

interface PodcasterContextInterface {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  podcastList: Entry[];
  setPodcastList: Dispatch<SetStateAction<Entry[]>>;
}
export const PodcasterContext = createContext<PodcasterContextInterface | null>(
  null
);

export default function App() {
  const [loading, setLoading] = useState(false);
  const [podcastList, setPodcastList] = useState<Entry[]>([]);

  return (
    <PodcasterContext.Provider
      value={{ loading, setLoading, podcastList, setPodcastList }}
    >
      <Navbar />
      <main>
        <Outlet />
      </main>
    </PodcasterContext.Provider>
  );
}
