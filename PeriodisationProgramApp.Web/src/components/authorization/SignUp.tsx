import { Button, TextField, Link, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "../../firebase/Firebase";
import { FirebaseError } from "firebase/app";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AuthorizationForm } from "../common/authorization/AuthorizationForm";

type SignUpData = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export default function SignUp() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [error, setError] = useState<FirebaseError | undefined>();
  const [t] = useTranslation(["firebase"]);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpData>({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/");
  }, [user, loading, navigate]);

  const onSubmit = async ({ username, email, password }: SignUpData) => {
    const result = await registerWithEmailAndPassword(
      username,
      email,
      password
    );

    setError(result);
  };

  return (
    <AuthorizationForm
      formHeader="Sign In"
      navigationButton={{ icon: <ArrowBackIcon /> }}
      handleSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        autoComplete="email"
        {...register("email", {
          required: "Please enter your email",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Invalid email",
          },
        })}
        helperText={errors.email?.message}
        error={errors.email !== undefined}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        autoComplete="username"
        {...register("username", {
          required: "Please enter your username",
          minLength: {
            value: 6,
            message: "Username length must be more than 6 symbols",
          },
          maxLength: {
            value: 50,
            message: "Username length must be less than 50 symbols",
          },
          pattern: {
            value: /^[a-zA-Z0-9_ ]*$/,
            message: "Invalid username",
          },
        })}
        helperText={errors.username?.message}
        error={errors.username !== undefined}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        {...register("password", {
          required: "Please enter your password",
          minLength: {
            value: 8,
            message: "Password length must be more than 8 symbols",
          },
          maxLength: {
            value: 50,
            message: "Password length must be less than 50 symbols",
          },
          pattern: {
            value: /^(?!.* )(?=.*\d)(?=.*[a-z])/,
            message:
              "Password must contain minimum eight characters, at least one letter and one number and no whitespace",
          },
        })}
        helperText={errors.password?.message}
        error={errors.password !== undefined}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Confirm password"
        type="password"
        id="confirmPassword"
        {...register("confirmPassword", {
          required: "Please confirm your password",
          validate: (val: string) => {
            if (watch("password") !== val) {
              return "Passwords do not match";
            }
          },
        })}
        helperText={errors.confirmPassword?.message}
        error={errors.confirmPassword !== undefined}
      />
      {error === undefined ? null : (
        <Typography variant="subtitle2" color="error" sx={{ p: 1 }}>
          {t(error.code)}
        </Typography>
      )}
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        color="secondary"
        type="submit"
      >
        {isSubmitting ? "Signing up..." : "Sign Up"}
      </Button>
      <Grid container>
        <Grid item xs></Grid>
        <Grid item>
          <Link href="/signin" variant="body2">
            {"Already have an account? Sign in"}
          </Link>
        </Grid>
      </Grid>
    </AuthorizationForm>
  );
}
