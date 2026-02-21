import { UserIcon } from "shared/assets/UserIcon";
import { borderRadius } from "shared/lib/styled/borderRadius";
import styled from "styled-components";

type Size = "xs" | "s" | "m" | "l";

type Shape = "round" | "square";

const sizeMap = {
  xs: "1rem",
  s: "2rem",
  m: "3rem",
  l: "4rem",
};

const ShapeMap = {
  round: borderRadius.round,
  square: borderRadius.s,
};

interface AvatarProps {
  size: Size;
  shape: Shape;
  url?: string;
  icon?: React.ReactNode;
}

const AvatarContainer = styled.div<AvatarProps>`
height: ${({ size }) => sizeMap[size]};
width: ${({ size }) => sizeMap[size]};
display: flex;
align-items: center;
justify-content: center;
color: ${({ theme }) => theme.components.background.primary}
border-radius:  ${({ shape }) => ShapeMap[shape]};
  ${({ url }) =>
    url &&
    `
    background-image: url(${url});
    background-size: cover;
    background-position: center;
  `}

  svg {
    width: 60%; 
    height: 60%;
  }
`;
export const Avatar = (props: AvatarProps) => {
  const {
    size = "m",
    shape = "round",
    url,
    icon = <UserIcon />,
    ...rest
  } = props;

  return (
    <AvatarContainer url={url} size={size} shape={shape} {...rest}>
      {!url && icon}
    </AvatarContainer>
  );
};
