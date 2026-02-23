import { createContext, useContext, useState } from "react";

// Тип для шага
export interface IStep<S extends string> {
  label: S;
  content: React.ReactNode;
}

// Тип для контекста (с generic)
interface IStepperContext<T, S extends string> {
  activeStep: number;
  setActiveStep: (newStep: number) => void;
  navigateTo: (id: S) => void;
  handleSetData: (partial: Partial<T>) => void;
  data: T;
  steps: IStep<S>[];
}

// Тип для значения контекста (без generic, для createContext)
type StepperContextValue = IStepperContext<unknown, never>;

// Создаем контекст с правильным типом
// eslint-disable-next-line react-refresh/only-export-components
export const StepperContext = createContext<StepperContextValue | undefined>(undefined);

interface IStepperProviderProps<T, S extends string> {
  children: React.ReactNode;
  initialData: T;
  steps: IStep<S>[];
}

export const StepperProvider = <T, S extends string>({
  children,
  initialData,
  steps,
}: IStepperProviderProps<T, S>) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [data, setData] = useState<T>(initialData);

  const handleSetData = (partial: Partial<T>) => {
    setData((prev) => ({ ...prev, ...partial }));
  };

  const navigateTo = (id: S) => {
    setActiveStep(steps.findIndex((step) => step.label === id));
  };

  // Создаем значение контекста
  const contextValue: StepperContextValue = {
    activeStep,
    setActiveStep,
    navigateTo: navigateTo as (id: never) => void, // Приведение для контекста
    data: data as unknown,
    handleSetData: handleSetData as (partial: Partial<unknown>) => void, // Приведение для контекста
    steps: steps as IStep<never>[], // Приведение для контекста
  };

  return (
    <StepperContext.Provider value={contextValue}>
      {children}
    </StepperContext.Provider>
  );
};

// Хук для использования контекста
// eslint-disable-next-line react-refresh/only-export-components
export const useStepper = <T, S extends string>() => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error("useStepper must be used within StepperProvider");
  }
  return context as unknown as IStepperContext<T, S>;
};