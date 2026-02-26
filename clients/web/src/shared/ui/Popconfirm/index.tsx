import styled from "styled-components";
import { Button } from "../Button";
import { useState } from "react";
import { PopupContainer } from "../DatePicker/Popup/PopupContainer";
import { HStack, VStack } from "shared/lib/styled/stack";
import { borderRadius } from "shared/lib/styled/borderRadius";

type ConfirmType = "Delete" | "Confirm";

interface PopconfirmProps {
  title: string;
  description: string;
  text: ConfirmType;
  icon?: React.ReactNode;
  $isOpen: boolean;
  onDeny? :()=>void;
  onConfirm? :()=>void;
}

const PopupConfirmContainer = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid black;
  ${borderRadius.m};
  color: black;
  background-color: white;
  
`;

export const Popconfirm = (props: PopconfirmProps) => {
  const { title, description, text, icon,  $isOpen = false, onDeny, onConfirm } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  
  const handleOnOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Button
        icon={icon}
        text={text}
        $isOpen={isOpen}
        onClick={handleOnOpen}
      ></Button>
      {isOpen && anchorEl && (
        <PopupContainer anchor={anchorEl} onClose={handleClose}>
          <PopupConfirmContainer>
            <VStack>
              {title}
              {description}
              <HStack>
                <Button onClick={onDeny} text={"no"}></Button>
                <Button onClick={onConfirm} text={"yes"}></Button>
              </HStack>
            </VStack>
          </PopupConfirmContainer>
        </PopupContainer>
      )}
    </>
  );
};
