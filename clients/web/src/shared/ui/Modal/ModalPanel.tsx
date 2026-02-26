//modal panel with floating ui

import { borderRadius } from "shared/lib/styled/borderRadius";
import styled from "styled-components";

interface ModalPanelProps {
  isOpen? : boolean;
  children? : React.ReactNode;

}


const ModalContainer = styled.div`
  width: 40vh;
  max-height: 90vh;
  height: 50vh;
  background-color: ${({theme}) => theme.components.background.primary};
  color: ${({theme}) => theme.components.text.primary};
  overflow-y: auto; 
  ${borderRadius.m};
    border: 1px solid rgb(146, 146, 146);

`

