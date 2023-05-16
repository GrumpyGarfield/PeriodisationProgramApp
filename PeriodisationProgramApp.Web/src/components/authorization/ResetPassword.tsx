import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { sendPasswordReset } from "../../firebase/Firebase";
import { FirebaseError } from "firebase/app";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { theme } from "../../styling/Theme";
import { AuthorizationForm } from "../common/authorization/AuthorizationForm";

type ResetPasswordData = {
  email: string;
};

export default function ResetPassword() {
  const [error, setError] = useState<FirebaseError | undefined>();
  const [t] = useTranslation(["firebase"]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ResetPasswordData>({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const onSubmit = async ({ email }: ResetPasswordData) => {
    const result = await sendPasswordReset(email);

    setError(result);
  };

  return (
    <AuthorizationForm
      formHeader="Sign In"
      navigationButton={{ icon: <ArrowBackIcon /> }}
      handleSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="body1" sx={{ mt: 3 }}>
        Enter your email and we will send you a link to reset your password.
      </Typography>
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
          Email has been sent
        </Typography>
      ) : null}
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        color="secondary"
        type="submit"
      >
        {isSubmitting ? "Sending email..." : "Send email"}
      </Button>
    </AuthorizationForm>
  );
}
