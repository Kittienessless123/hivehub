import { css } from "styled-components";

type ShadowSize = "soft" | "medium" | "none";

export const shadows: Record<ShadowSize, ReturnType<typeof css>> = {
  soft: css`
    box-shadow: 0px 0px 18px 0px rgba(34, 60, 80, 0.1);
  `,
  medium: css`
    box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  `,
  none: css`
    box-shadow: none;
  `,
};
