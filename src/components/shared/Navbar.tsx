import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useContext } from "react";
import { PodcasterContext } from "../../layouts/AppLayout";
export default function Navbar() {
  const { loading } = useContext(PodcasterContext);

  const isLoading = Object.values(loading).some((value) => value);
  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.link}>
        Podcaster
      </Link>
      {isLoading && <div className={styles.loader} />}
    </nav>
  );
}
