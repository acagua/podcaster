import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import AppLayout from "../layouts/AppLayout";
// import Home from "../pages/Home";
// import Podcast from "../pages/Podcast";
// import Episode from "../pages/Episode";
// import DetailsLayout from "../layouts/DetailsLayout";
import { lazy, Suspense } from "react";
import Loader from "../components/shared/Loader";
import { loadPodcastDetails, loadPodcasts } from "../utils/services";

const LazyHome = lazy(() => import("../pages/Home"));
const LazyPodcast = lazy(() => import("../pages/Podcast"));
const LazyEpisode = lazy(() => import("../pages/Episode"));
const LazyDetailsLayout = lazy(() => import("../layouts/DetailsLayout"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        loader: loadPodcasts,
        element: (
          <Suspense fallback={<Loader type="podcast" />}>
            <LazyHome />
          </Suspense>
        ),
      },
      {
        path: "podcast/:podcastId",
        loader: loadPodcasts,
        element: (
          <Suspense fallback={<Loader type="podcast" />}>
            <LazyDetailsLayout />
          </Suspense>
        ),
        children: [
          {
            path: "",
            loader: ({ params }) => loadPodcastDetails(params.podcastId || ""),
            element: (
              <Suspense fallback={<Loader type="episode" />}>
                <LazyPodcast />
              </Suspense>
            ),
          },
          {
            path: "episode/:episodeId",
            loader: ({ params }) => loadPodcastDetails(params.podcastId || ""),
            element: (
              <Suspense fallback={<Loader type="episode" />}>
                <LazyEpisode />
              </Suspense>
            ),
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
