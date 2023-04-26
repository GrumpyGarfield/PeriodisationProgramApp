import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../components/app/App";
import { TrainingProgramsPage } from "../pages/TrainingProgramsPage/TrainingProgramsPage";
import { ExercisesPage } from "../pages/ExercisesPage";
import { MuscleGroupsPage } from "../pages/MuscleGroupsPage";
import { AboutPage } from "../pages/AboutPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "training-programs",
        element: <TrainingProgramsPage />,
      },
      {
        path: "exercises",
        element: <ExercisesPage />,
      },
      {
        path: "muscle-groups",
        element: <MuscleGroupsPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
