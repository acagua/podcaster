import styles from "./AppLayout.module.css";
import { Outlet } from "react-router-dom";
export default function App() {
  return (
    <>
      <h1 className={styles.title}>Podcaster App</h1>
      <div>Content</div>
      <main>
        <Outlet />
      </main>
    </>
  );
}
