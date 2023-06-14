import { useContext } from "react";
import styles from "./Filter.module.css";
import { PodcasterContext } from "../layouts/AppLayout";

export default function Filter() {
  const context = useContext(PodcasterContext);

  const handleFilterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    context?.setFilter(e.target.value);
  };

  return (
    <input
      className={styles.filter}
      name="filter"
      type="text"
      placeholder="Filter podcasts..."
      onChange={handleFilterInputChange}
      value={context?.filter}
    />
  );
}
