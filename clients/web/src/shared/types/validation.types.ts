
export type ValidationRule = {
  pattern?: RegExp;
  message: string;
  validate?: (value: string) => boolean;
};

export type ValidationRules = {
  required?: ValidationRule;
  email?: ValidationRule;
  password?: ValidationRule;
  minLength?: ValidationRule & { min: number };
  maxLength?: ValidationRule & { max: number };
  custom?: ValidationRule;
};