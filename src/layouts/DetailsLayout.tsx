import { Outlet } from "react-router-dom";

export default function DetailsLayout() {
  return (
    <>
      <h1>DetailsLayout</h1>
      <div>
        <Outlet />
      </div>
    </>
  );
}
