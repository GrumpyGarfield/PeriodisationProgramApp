import {
  Container,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Divider,
  Avatar,
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
} from "../common/authorization/Firebase";
import { FirebaseError } from "firebase/app";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

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
    if (user) navigate("/");
  }, [user, loading, navigate]);

  const onSubmit = async (signInData: SignInData) => {
    const result = await logInWithEmailAndPassword(
      signInData.email,
      signInData.password
    );
    setError(result);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          onSubmit={handleSubmit(onSubmit)}
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
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
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
        </Box>
      </Box>
    </Container>
  );
}
