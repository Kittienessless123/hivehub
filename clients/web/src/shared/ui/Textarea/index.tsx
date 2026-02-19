import styled from "styled-components";


type TextAreaProps = {
  value?: string;
  onChange?: (e: never) => void;
  placeholder?: string;
  maxlength: number;
  readonly?: boolean;
};

export const TextArea = ({
  value,
  onChange,
  placeholder,
  maxlength,
  readonly,
  ...rest
}: TextAreaProps) => {

 
  const Area = styled.textarea`
    resize: none;
    font-size: 16px;
    height: auto;
    padding: 12px;
    margin: 15px;
    border-radius: 12px;
    font-family: monaco, sans-serif;
    @media (width >= 1250px) {
      width: 35em !important;
    }
     @media (width <= 1250px) {
      width: 100%;
    }
  `;
  return (
    <Area 
      rows={6}
      placeholder={placeholder}
      value={value}
      maxLength={maxlength}
      onChange={onChange}
      {...rest}
      readOnly={readonly}
    />
  );
};

export default TextArea;