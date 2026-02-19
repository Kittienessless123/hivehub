import { css } from "styled-components";

type PositionFlexbox = "relative" | "absolute" | "fixed" | "sticky" | "static";

export const positionFlex: Record<PositionFlexbox, ReturnType<typeof css>> = {
  relative: css`
    position: relative;
  `,
  absolute: css`
    position: absolute;
  `,
  fixed: css`
    position: fixed;
  `,
  sticky: css`
    position: sticky;
  `,
  static: css`
    position: static;
  `,
};

type PositionDirection = "top0" | "right0" | "bottom0" | "left0" | "allSides0";

export const positionDirection: Record<
  PositionDirection,
  ReturnType<typeof css>
> = {
  top0: css`
    top: 0;
  `,
  right0: css`
    right: 0;
  `,
  bottom0: css`
    bottom: 0;
  `,
  left0: css`
    left: 0;
  `,
  allSides0: css`
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  `,
};

export const centerAbsoluteX = css`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

export const centerAbsoluteY = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

export const centerTransform = css`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const centerFlex = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const centerMargin = css`
  margin-left: auto;
  margin-right: auto;
`;

// ============= COVER =============
export const cover = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const coverFixed = css`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;
