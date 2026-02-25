import styled from "styled-components";

type Size = "medium" | "large" | "small";

interface RateProps {
  size?: Size;
  disabled?: boolean;
  onChange?: (value: number) => void;
  defaultValue: number;
}

export const Rate = styled(
  ({
    size = "medium",
    defaultValue,
    disabled = false,
    onChange,
    className,
  }: RateProps & { className?: string }) => {
    const handleClick = (index: number) => {
      if (!disabled && onChange) {
        onChange(index + 1);
      }
    };

    return (
      <div className={className}>
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            viewBox="0 0 24 24"
            onClick={() => handleClick(index)}
            data-active={index < defaultValue}
          >
            <path d="M15.791,19.5,10.262,16.6,4.732,19.5a.75.75,0,0,1-1.088-.79L4.7,12.557.228,8.2a.75.75,0,0,1,.415-1.28l6.182-.9L9.589.419a.75.75,0,0,1,1.345,0l2.764,5.6,6.182.9A.751.751,0,0,1,20.3,8.2l-4.473,4.36,1.056,6.157a.748.748,0,0,1-1.088.79Z" />
          </svg>
        ))}
      </div>
    );
  },
)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${({ size }) => {
    switch (size) {
      case "small":
        return "4px";
      case "large":
        return "12px";
      default:
        return "8px";
    }
  }};

  svg {
    height: ${({ size }) => {
      switch (size) {
        case "small":
          return "24px";
        case "large":
          return "40px";
        default:
          return "32px";
      }
    }};
    width: ${({ size }) => {
      switch (size) {
        case "small":
          return "24px";
        case "large":
          return "40px";
        default:
          return "32px";
      }
    }};
    cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));

    path {
      fill: ${({ disabled }) => (disabled ? "#e0e0e0" : "#d1d5db")};
      transition: fill 0.2s ease;
    }

    &[data-active="true"] path {
      fill: #fbbf24; 
    }

    &:hover {
      transform: ${({ disabled }) => (disabled ? "none" : "scale(1.15)")};
      filter: drop-shadow(0 4px 8px rgba(251, 191, 36, 0.3));
    }

    &:hover path {
      fill: ${({ disabled }) => (disabled ? "#e0e0e0" : "#f59e0b")};
    }

    &:hover ~ svg path {
      fill: #d1d5db; 
    }

    &:hover ~ svg[data-active="true"] path {
      fill: #d1d5db; 
    }
  }
`;

export const RateWithValue = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

// Пример использования:
export const RateExample = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Rate defaultValue={3} onChange={(v) => console.log(v)} />
      <Rate defaultValue={4} size="small" />
      <Rate defaultValue={2} size="large" />
      <Rate defaultValue={5} disabled />
    </div>
  );
};
