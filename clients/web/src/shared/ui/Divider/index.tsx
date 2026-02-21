import styled, { css } from "styled-components";

type Direction = "vertical" | "horizontal";

type DividerProps = {
  className?: string;
  direction?: Direction;
};
const DividerLine = styled.div<DividerProps>`
  display: flex;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 20px;
  content: "";
  background-color: ${({ theme }) => theme.components.background.tertiary};

  ${(props) =>
    props.direction === "horizontal"
      ? css`
          width: 98%;
          height: 0.3px;
        `
      : css`
          width: 0.3px;
          height: 98%;
        `}
`;

export const Divider = (props: DividerProps) => {
  const { className, direction } = props;

  return (
    <DividerLine className={className} direction={direction}></DividerLine>
  );
};
