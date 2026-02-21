import styled, { css } from "styled-components";
import {
  type BreakpointSize as Breakpoint,
  media,
} from "shared/lib/styled/breakpoints";
import {
  type BorderRadiusSize,
  borderRadius,
} from "shared/lib/styled/borderRadius";

type ContainerSize = "xs" | "s" | "m" | "l" | "xl" | "full";
type PaddingSize = "xs" | "s" | "m" | "l" | "xl" | "none";
type ResponsiveValue<T> = T | { [K in Breakpoint]?: T };
type BgColor = "regular" | "ghost" | "blurred" | "inverted";
type BorderColor = "regular" | "ghost" | "none" | "dashed";

interface ContainerProps {
  $maxSize?: ResponsiveValue<ContainerSize>;
  $rounded?: ResponsiveValue<BorderRadiusSize>;
  $padding?: ResponsiveValue<PaddingSize>;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  $bgColor?: BgColor;
  $borderColor?: BorderColor;
}

const maxSizeMap = {
  xs: "20rem",
  s: "30rem",
  m: "40rem",
  l: "50rem",
  xl: "60rem",
  full: "100%",
};

const paddingMap = {
  xs: "0.5rem",
  s: "1rem",
  m: "1.5rem",
  l: "2rem",
  xl: "3rem",
  none: "0",
};

const ContainerBox = styled.div<ContainerProps>`
  margin-left: auto;
  margin-right: auto;

  background-color: ${({ theme, $bgColor }) => {
    switch ($bgColor) {
      case "regular":
        return theme.components.background.primary;
      case "ghost":
        return theme.components.background.secondary;
      case "blurred":
        return theme.components.background.blur;
      case "inverted":
        return theme.components.background.inverted;
      default:
        return theme.components.background.primary;
    }
  }};

  /* Border */
  border: 1px solid
    ${({ theme, $borderColor }) => {
      switch ($borderColor) {
        case "regular":
          return theme.components.border.default;
        case "ghost":
          return theme.components.border.ghost;
        case "none":
          return "transparent";
        case "dashed":
          return theme.components.border.dashed;
        default:
          return "transparent";
      }
    }};

  /* Border style for dashed */
  ${({ $borderColor }) =>
    $borderColor === "dashed" &&
    css`
      border-style: dashed;
    `}

  ${({ $borderColor }) =>
    $borderColor === "dashed" &&
    css`
      border-style: dashed;
    `}

  ${({ $maxSize }) =>
    $maxSize &&
    typeof $maxSize === "string" &&
    css`
      max-width: ${maxSizeMap[$maxSize]};
    `}
  
  ${({ $padding }) =>
    $padding &&
    typeof $padding === "string" &&
    css`
      padding: ${paddingMap[$padding]};
    `}
  
  ${({ $maxSize }) =>
    $maxSize &&
    typeof $maxSize === "object" &&
    css`
      ${Object.entries($maxSize).map(([breakpoint, size]) => {
        if (!size) return "";
        return media.min[breakpoint as Breakpoint]`
        max-width: ${maxSizeMap[size as ContainerSize]};
      `;
      })}
    `}
  
  ${({ $padding }) =>
    $padding &&
    typeof $padding === "object" &&
    css`
      ${Object.entries($padding).map(([breakpoint, size]) => {
        if (!size) return "";
        return media.min[breakpoint as Breakpoint]`
        padding: ${paddingMap[size as PaddingSize]};
      `;
      })}
    `}
  
  ${({ $rounded }) =>
    $rounded &&
    (typeof $rounded === "string"
      ? borderRadius[$rounded]
      : css`
          ${Object.entries($rounded).map(([breakpoint, $size]) => {
            if (!$size) return "";
            return media.min[breakpoint as Breakpoint]`
          ${borderRadius[$size]}
        `;
          })}
        `)}
`;

export const Container = (props: ContainerProps) => {
  const {
    $maxSize,
    children,
    $padding,
    $rounded,
    as,
    className,
    $bgColor,
    $borderColor,
    ...rest
  } = props;

  return (
    <ContainerBox
      maxSize={$maxSize}
      padding={$padding}
      rounded={$rounded}
      className={className}
      bgColor={$bgColor}
      as={as}
      borderColor={$borderColor}
      {...rest}
    >
      {children}
    </ContainerBox>
  );
};

// Примеры использования:
// <Container maxSize="m" padding="l">Простой контейнер</Container>
//
// <Container
//   maxSize={{ xs: 'full', m: 'l', xl: 'xl' }}
//   padding={{ xs: 's', m: 'm', l: 'l' }}
//   rounded={{ xs: 's', m: 'm', l: 'round' }}
// >
//   Responsive контейнер
// </Container>
