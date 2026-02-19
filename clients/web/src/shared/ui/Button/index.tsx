import React, { Ref } from "react";
import styled, { css } from "styled-components";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
  isDisabled?: boolean;
};

type ButtonColorType = 'primary' | 'link' | 'secondary' | 'disabled' 

interface ContainerProps {
  isDisabled?: boolean;
  isLoading?: boolean;
  isRounded?: boolean;
}

export const Button = styled.button<Props>`
  background-color: ${({ theme }) => theme.components.background.primary};
  color: ${({ theme }) => theme.components.text.primary};
  padding: ${({ theme }) => theme.spacing.m};
  
`;

