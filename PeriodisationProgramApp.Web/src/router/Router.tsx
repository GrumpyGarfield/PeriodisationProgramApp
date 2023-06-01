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
import { MuscleGroupPage } from "../components/muscleGroups/muscleGroupPage/MuscleGroupPage";
import { MuscleGroupProvider } from "../context/entityContext/entities/muscleGroup/MuscleGroupContextProvider";
import { EntitiesProvider } from "../context/entityContext/EntitiesContextProvider";
import { ExerciseProvider } from "../context/entityContext/entities/exercise/ExerciseContextProvider";
import { ExercisePage } from "../components/exercises/exercisePage/ExercisePage";
import { ExerciseEditPage } from "../components/exercises/exercisePage/edit/ExerciseEditPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "training-programs",
        element: (
          <EntitiesProvider>
            <TrainingProgramsPage />
          </EntitiesProvider>
        ),
      },
      {
        path: "exercises",
        element: (
          <EntitiesProvider>
            <ExercisesPage />
          </EntitiesProvider>
        ),
      },
      {
        path: "exercises/:id",
        element: (
          <ExerciseProvider>
            <ExercisePage />
          </ExerciseProvider>
        ),
      },
      {
        path: "exercises/:id/edit",
        element: (
          <ExerciseProvider>
            <ExerciseEditPage />
          </ExerciseProvider>
        ),
      },
      {
        path: "muscle-groups",
        element: (
          <EntitiesProvider>
            <MuscleGroupsPage />
          </EntitiesProvider>
        ),
      },
      {
        path: "muscle-groups/:id",
        element: (
          <MuscleGroupProvider>
            <MuscleGroupPage />
          </MuscleGroupProvider>
        ),
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
