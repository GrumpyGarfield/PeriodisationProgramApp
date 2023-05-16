import { Button, TextField, Typography, Link } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { passwordReset } from "../../firebase/Firebase";
import { FirebaseError } from "firebase/app";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import HomeIcon from "@mui/icons-material/Home";
import { theme } from "../../styling/Theme";
import { AuthorizationForm } from "../common/authorization/AuthorizationForm";

type ChangePasswordData = {
  password: string;
  confirmPassword: string;
};

export default function ChangePassword() {
  const [searchParams] = useSearchParams();
  const [oobCode, setOobCode] = useState<string>();
  const navigate = useNavigate();
  const [error, setError] = useState<FirebaseError | undefined>();
  const [t] = useTranslation(["firebase"]);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ChangePasswordData>({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const onSubmit = async ({ password }: ChangePasswordData) => {
    if (oobCode === undefined) {
      setError(new FirebaseError("oobCode-undefined", "Unknown reset code"));
      return;
    }

    const result = await passwordReset(oobCode, password);
    setError(result);
  };

  useEffect(() => {
    if (oobCode === undefined) {
      const code = searchParams.get("oobCode");
      code === null || code === "" ? navigate("/") : setOobCode(code);
    }
  }, [oobCode, navigate, searchParams]);

  return (
    <AuthorizationForm
      formHeader="Sign In"
      navigationButton={{ icon: <HomeIcon />, to: "/" }}
      handleSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        margin="normal"
        required
        fullWidth
        label="New password"
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
      {isSubmitSuccessful ? (
        <Typography
          variant="subtitle2"
          color={theme.palette.success.main}
          sx={{ p: 1 }}
        >
          Password changed successfully.{" "}
          <Link href="/signin" color={theme.palette.success.dark}>
            {"Sign in now"}
          </Link>
        </Typography>
      ) : null}
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        color="secondary"
        type="submit"
      >
        {isSubmitting ? "Changing password..." : "Change password"}
      </Button>
    </AuthorizationForm>
  );
}
