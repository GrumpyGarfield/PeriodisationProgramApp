import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../components/app/App";
import { TrainingProgramsPage } from "../components/trainingPrograms/trainingProgramsPage/TrainingProgramsPage";
import { ExercisesPage } from "../pages/ExercisesPage";
import { MuscleGroupsPage } from "../pages/MuscleGroupsPage";
import { AboutPage } from "../pages/AboutPage";
import SignIn from "../components/authorization/SignIn";

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
  {
    path: "/signin",
    element: <SignIn />,
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
