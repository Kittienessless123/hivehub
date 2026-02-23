import { useStepper } from "shared/lib/hooks/useStepper.ts";
import { StepperWrapper } from "./StepperWrapper.tsx";

export const Stepper = <T, S extends string>() => {
  const { activeStep, steps } = useStepper<T, S>();

  return (
    <div>
      <StepperWrapper
        numberOfSteps={steps.length - 1}
        currentStep={activeStep}
      />

      <div>{steps[activeStep]?.content}</div>
    </div>
  );
};
