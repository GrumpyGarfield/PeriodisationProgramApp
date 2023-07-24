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
import { ExercisePage } from "../components/exercises/exercisePage/ExercisePage";
import { ExerciseEditPage } from "../components/exercises/exercisePage/edit/ExerciseEditPage";
import { TrainingProgramsProvider } from "../context/entityContext/entities/trainingProgram/TrainingProgramsContextProvider";
import { ExercisesProvider } from "../context/entityContext/entities/exercise/ExercisesContextProvider";
import { MuscleGroupsProvider } from "../context/entityContext/entities/muscleGroup/MuscleGroupsContextProvider";
import { ExerciseCreatePage } from "../components/exercises/exercisePage/create/ExerciseCreatePage";
import { TrainingProgramPage } from "../components/trainingPrograms/trainingProgramPage/TrainingProgramPage";
import { TrainingProgramCreatePage } from "../components/trainingPrograms/trainingProgramPage/create/TrainingProgramCreatePage";
import { TrainingProgramEditPage } from "../components/trainingPrograms/trainingProgramPage/edit/TrainingProgramEditPage";
import { ErrorPage } from "../pages/ErrorPage";
import { HomePage } from "../pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "training-programs",
        element: (
          <TrainingProgramsProvider initialSorting={{ sortBy: "rating" }}>
            <TrainingProgramsPage />
          </TrainingProgramsProvider>
        ),
      },
      {
        path: "training-programs/create",
        element: <TrainingProgramCreatePage />,
      },
      {
        path: "training-programs/:id",
        element: <TrainingProgramPage />,
      },
      {
        path: "training-programs/:id/edit",
        element: <TrainingProgramEditPage />,
      },
      {
        path: "exercises",
        element: (
          <ExercisesProvider initialSorting={{ sortBy: "rating" }}>
            <ExercisesPage />
          </ExercisesProvider>
        ),
      },
      {
        path: "exercises/create",
        element: <ExerciseCreatePage />,
      },
      {
        path: "exercises/:id",
        element: <ExercisePage />,
      },
      {
        path: "exercises/:id/edit",
        element: <ExerciseEditPage />,
      },
      {
        path: "muscle-groups",
        element: (
          <MuscleGroupsProvider>
            <MuscleGroupsPage />
          </MuscleGroupsProvider>
        ),
      },
      {
        path: "muscle-groups/:id",
        element: <MuscleGroupPage />,
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
