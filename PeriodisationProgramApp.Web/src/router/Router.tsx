import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../components/app/App";
import { TrainingProgramsPage } from "../components/trainingPrograms/trainingProgramsPage/TrainingProgramsPage";
import { ExercisesPage } from "../components/exercises/exercisesPage/ExersicesPage";
import { AboutPage } from "../pages/AboutPage";
import SignIn from "../components/authorization/SignIn";
import SignUp from "../components/authorization/SignUp";
import ResetPassword from "../components/authorization/ResetPassword";
import ChangePassword from "../components/authorization/ChangePassword";
import { MuscleGroupsPage } from "../components/muscleGroups/muscleGroupsPage/MuscleGroupsPage";

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
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/resetPassword",
    element: <ResetPassword />,
  },
  {
    path: "/changePassword",
    element: <ChangePassword />,
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
