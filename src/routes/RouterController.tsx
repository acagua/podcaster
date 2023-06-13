import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Home from "../pages/Home";
import AppLayout from "../layouts/AppLayout";
import Podcast from "../pages/Podcast";
import { Episode } from "../pages/Episode";
import DetailsLayout from "../layouts/DetailsLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "podcast/:podcastId",
        element: <DetailsLayout />,
        children: [
          {
            path: "",
            element: <Podcast />,
          },
          {
            path: "episode/:episodeId",
            element: <Episode />,
          },
          {
            path: "*",
            element: <Navigate to="/" />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

export const RouterController = () => {
  return <RouterProvider router={router} />;
};
