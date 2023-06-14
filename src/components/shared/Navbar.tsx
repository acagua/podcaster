import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useContext } from "react";
import { PodcasterContext } from "../../layouts/AppLayout";
export default function Navbar() {
  const { loading } = useContext(PodcasterContext);
  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.link}>
        Podcaster
      </Link>
      {loading && <div className={styles.loader} />}
    </nav>
  );
}
