import {
  Button,
  TextField,
  Link,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase/Firebase";
import { FirebaseError } from "firebase/app";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AuthorizationForm } from "../common/authorization/AuthorizationForm";

type SignInData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [error, setError] = useState<FirebaseError | undefined>();
  const [t] = useTranslation(["firebase"]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInData>({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate(-1);
  }, [user, loading, navigate]);

  const onSubmit = async ({ email, password }: SignInData) => {
    const result = await logInWithEmailAndPassword(email, password);
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
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        {...register("password", {
          required: "Please enter your password",
        })}
        helperText={errors.password?.message}
        error={errors.password !== undefined}
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
        {isSubmitting ? "Signing in..." : "Sign In"}
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="/resetpassword" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link href="/signup" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
      <Divider sx={{ py: 2 }}>OR</Divider>
      <Button
        fullWidth
        variant="contained"
        sx={{ my: 1 }}
        startIcon={<GoogleIcon />}
        onClick={signInWithGoogle}
      >
        Sign In With Google
      </Button>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ my: 1 }}
        startIcon={<TwitterIcon />}
      >
        Sign In With Twitter
      </Button>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ my: 1 }}
        startIcon={<FacebookIcon />}
      >
        Sign In With Facebook
      </Button>
    </AuthorizationForm>
  );
}
