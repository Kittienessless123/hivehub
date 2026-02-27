import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type Rule = (value: unknown) => string | null;
// eslint-disable-next-line react-refresh/only-export-components
export const rules = {
  required:
    (message = "Это поле обязательно"): Rule =>
    (value) =>
      !value && value !== 0 ? message : null,

  minLength:
    (length: number, message?: string): Rule =>
    (value) => {
      if (!value) return null;
      return String(value).length < length
        ? message || `Минимальная длина ${length} символов`
        : null;
    },

  maxLength:
    (length: number, message?: string): Rule =>
    (value) => {
      if (!value) return null;
      return String(value).length > length
        ? message || `Максимальная длина ${length} символов`
        : null;
    },

  email:
    (message = "Некорректный email"): Rule =>
    (value) => {
      if (!value) return null;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(String(value)) ? null : message;
    },

  pattern:
    (regex: RegExp, message: string): Rule =>
    (value) => {
      if (!value) return null;
      return regex.test(String(value)) ? null : message;
    },
};

interface FormContextValue<T> {
  values: T;
  errors: Partial<Record<keyof T, string | null>>;
  setFieldValue: (name: keyof T, value: unknown) => void;
  validateField: (name: keyof T) => void;
  registerField: (name: keyof T, rules: Rule[]) => void;
  unregisterField: (name: keyof T) => void;
}


interface FormProps<T> {
  initialValues: T;
  onFinish?: (values: T) => void;
  onFinishFailed?: (errors: Partial<Record<keyof T, string | null>>) => void;
  children: React.ReactNode;
  name?: string;
}

interface InputProps {
  type?: string;
  value?: unknown;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  [key: string]: unknown;
}


interface FormItemProps<T> {
  label: string;
  name: keyof T; 
  rules?: Rule[];
  children: React.ReactElement;
}


const FormContext = React.createContext<FormContextValue<unknown> | null>(null);


const useFormContext = <T,>() => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("FormItem must be used within a Form");
  }
  return context as FormContextValue<T>;
};

export function Form<T extends Record<string, unknown>>(props: FormProps<T>) {
  const { initialValues, onFinish, onFinishFailed, children, name } = props;

  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string | null>>>(
    {},
  );
  const rulesMap = useRef<Map<keyof T, Rule[]>>(new Map());

  const registerField = useCallback((name: keyof T, rules: Rule[]) => {
    rulesMap.current.set(name, rules);
  }, []);

  const unregisterField = useCallback((name: keyof T) => {
    rulesMap.current.delete(name);
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  }, []);

  const validateField = useCallback(
    (name: keyof T) => {
      const rules = rulesMap.current.get(name) || [];
      const value = values[name];
      let error: string | null = null;

      for (const rule of rules) {
        error = rule(value);
        if (error) break;
      }

      setErrors((prev) => ({ ...prev, [name]: error }));
      return error;
    },
    [values],
  );

  const validateAllFields = useCallback(() => {
    const newErrors: Partial<Record<keyof T, string | null>> = {};
    let hasError = false;

    for (const [name, rules] of rulesMap.current.entries()) {
      const value = values[name];
      let error: string | null = null;

      for (const rule of rules) {
        error = rule(value);
        if (error) break;
      }

      newErrors[name] = error;
      if (error) hasError = true;
    }

    setErrors(newErrors);
    return { errors: newErrors, hasError };
  }, [values]);

  const setFieldValue = useCallback(
    (name: keyof T, value: unknown) => {
      setValues((prev) => ({ ...prev, [name]: value }));
      validateField(name);
    },
    [validateField],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const { errors, hasError } = validateAllFields();

      if (hasError) {
        onFinishFailed?.(errors);
      } else {
        onFinish?.(values);
      }
    },
    [values, onFinish, onFinishFailed, validateAllFields],
  );

  const contextValue: FormContextValue<T> = {
    values,
    errors,
    setFieldValue,
    validateField,
    registerField,
    unregisterField,
  };

  return (
    <FormContext.Provider value={contextValue}>
      <form name={name} onSubmit={handleSubmit} noValidate>
        {children}
      </form>
    </FormContext.Provider>
  );
}


export function FormItem<T>(props: FormItemProps<T>) {
  const { label, name, rules = [], children } = props;

  const formContext = useFormContext<T>();

  useEffect(() => {
    formContext.registerField(name, rules);

    return () => {
      formContext.unregisterField(name);
    };
  }, [formContext, name, rules]); 

  const value = formContext.values[name];
  const error = formContext.errors[name];


  const childWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement<InputProps>(child)) {
      const childProps: InputProps = {
        value: value ?? "",
        onBlur: () => {
          formContext.validateField(name);
        },
      };

      if (child.props.type === "checkbox") {
        childProps.checked = !!value;
        childProps.onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          if (child.props.onChange) {
            child.props.onChange(e);
          }
          formContext.setFieldValue(name, e.target.checked);
        };
      } else {
        childProps.onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          if (child.props.onChange) {
            child.props.onChange(e);
          }
          formContext.setFieldValue(name, e.target.value);
        };
      }

      return React.cloneElement(child, childProps);
    }
    return child;
  });
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ display: "block", marginBottom: "0.5rem" }}>
        {label}
      </label>
      {childWithProps}
      {error && (
        <span
          style={{
            color: "red",
            fontSize: "0.875rem",
            marginTop: "0.25rem",
            display: "block",
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
}

// Пример использования:
/*
interface FormData {
  name: string;
  email: string;
  age: number;
  agree: boolean;
}

function MyForm() {
  const handleFinish = (values: FormData) => {
    console.log('Success:', values);
  };

  return (
    <Form<FormData>
      initialValues={{ name: '', email: '', age: 0, agree: false }}
      onFinish={handleFinish}
    >
      <FormItem<FormData>
        label="Имя"
        name="name"
        rules={[rules.required(), rules.minLength(2)]}
      >
        <input type="text" placeholder="Введите имя" />
      </FormItem>

      <FormItem<FormData>
        label="Email"
        name="email"
        rules={[rules.required(), rules.email()]}
      >
        <input type="email" placeholder="Введите email" />
      </FormItem>

      <FormItem<FormData>
        label="Возраст"
        name="age"
        rules={[rules.required('Возраст обязателен')]}
      >
        <input type="number" />
      </FormItem>

      <FormItem<FormData>
        label="Согласен с условиями"
        name="agree"
        rules={[(value) => value ? null : 'Необходимо согласие']}
      >
        <input type="checkbox" />
      </FormItem>

      <button type="submit">Отправить</button>
    </Form>
  );
}
*/
