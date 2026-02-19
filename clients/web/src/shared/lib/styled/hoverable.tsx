import styled, { css } from "styled-components";
import { borderRadius } from "./borderRadius";

const Highlight = styled.div`
  position: absolute;
  ${borderRadius.s};
`;

export const hoverable = css`
  position: relative;
  outline: none;
  
  &:hover ${Highlight} {
    background: "#f5f5f5";
  }
`;
