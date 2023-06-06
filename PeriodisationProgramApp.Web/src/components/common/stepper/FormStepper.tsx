import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React, { ReactNode, useState } from "react";
import { FieldErrors } from "react-hook-form";

export type StepProps<T> = {
  label: string;
  content: ReactNode;
  requiredFields?: (keyof T)[];
  isOptional?: boolean;
};

type Props<T> = {
  steps: StepProps<T>[];
  handleFinish: () => void;
  validate: (fields: (keyof T)[]) => Promise<boolean>;
  errors: FieldErrors;
};

export function FormStepper<T>({
  steps,
  handleFinish,
  validate,
  errors,
}: Props<T>) {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const isStepOptional = (index: number): boolean => {
    const step = steps[index];

    if (step.isOptional === undefined) {
      return false;
    }

    return step.isOptional;
  };

  const isStepSkipped = (index: number) => {
    return skipped.has(index);
  };

  const handleNext = async () => {
    const step = steps[activeStep];

    if (step.requiredFields !== undefined) {
      const validationResult = await validate(step.requiredFields);

      if (!validationResult) {
        return;
      }
    }

    let newSkipped = skipped;

    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">(Optional)</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={step.label} {...stepProps}>
              <StepLabel {...labelProps}>{step.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <React.Fragment>
        <Box sx={{ mt: 2, mb: 1 }}>{steps[activeStep].content}</Box>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          {activeStep === steps.length - 1 ? (
            <Button onClick={handleFinish}>Finish</Button>
          ) : (
            <Button onClick={handleNext}>Next</Button>
          )}
        </Box>
      </React.Fragment>
    </>
  );
}
