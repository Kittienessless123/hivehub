import { css } from "styled-components";

type zIndex = "hidden" | "zero" | "one" | "ten" | "thousand";

export const borderRadius: Record<zIndex, ReturnType<typeof css>> = {
  hidden: css`
    z-index: -10000;
  `,
  zero: css`
    z-index: 0;
  `,
  one: css`
    z-index: 1;
  `,
  ten: css`
    z-index: 10;
  `,
  thousand: css`
    z-index: 1000;
  `,
};
