import Navbar from "../components/shared/Navbar";
import styles from "./AppLayout.module.css";
import { Outlet } from "react-router-dom";
import { useState, createContext, Dispatch, SetStateAction } from "react";

interface PodcasterContextInterface {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  podcastList: string[];
  setPodcastList: Dispatch<SetStateAction<string[]>>;
}
export const PodcasterContext = createContext<PodcasterContextInterface | null>(
  null
);

export default function App() {
  const [loading, setLoading] = useState(false);
  const [podcastList, setPodcastList] = useState<string[]>([]);

  return (
    <PodcasterContext.Provider
      value={{ loading, setLoading, podcastList, setPodcastList }}
    >
      <Navbar />
      <h1 className={styles.title}>Podcaster App</h1>
      <div>Content</div>
      <main>
        <Outlet />
      </main>
    </PodcasterContext.Provider>
  );
}
