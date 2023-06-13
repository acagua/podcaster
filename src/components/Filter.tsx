import styles from "./Filter.module.css";

export default function Filter() {
  return (
    <input
      className={styles.filter}
      name="filter"
      type="text"
      placeholder="Filter podcasts..."
    />
  );
}
