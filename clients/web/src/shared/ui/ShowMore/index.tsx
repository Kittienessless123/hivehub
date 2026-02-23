import React, { useState } from "react";
import { Button } from "../Button/IconButton";
import styled from "styled-components";
import { Text } from "../Text";
import { ArrowDownIcon } from "shared/assets/ArrowDownIcon.tsx";
import { borderRadius } from "shared/lib/styled/borderRadius";
import { Space } from "../Space";
import { Divider } from "../Divider";
import { ArrowUpIcon } from "shared/assets/ArrowUpIcon";
import { takeWholeSpace } from "shared/lib/styled/takeWholeSpace";

interface ShowMoreProps {
  text: string;
  FullText: string;
  src: string;
}

const ShowMoreContainer = styled.div`
  background-color: ${({ theme }) => theme.components.background.primary};
  color: ${({ theme }) => theme.components.text.primary};
  padding: 1em;
  margin-bottom: 1em;
  ${borderRadius.m};
  ${takeWholeSpace};
  margin-left: 5em;
  @media (width <= 1350px) {
    width: 100%;
    margin-left: 0;
  }
`;

const Card = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.components.background.primary};
  color: ${({ theme }) => theme.components.text.primary};
  padding: 1em;
  margin-bottom: 1em;
  ${borderRadius.m};
 
`;
const ImageCard = styled.img`
  max-width: 15%;
  @media (width <= 1350px) {
    max-width: 10%;
  }
`;
const ShowMore: React.FC<ShowMoreProps> = ({
  text,
  FullText,
  src,
}: ShowMoreProps) => {
  const [showFullText, setShowFullText] = useState(false);

  const toggleShowMore = () => {
    setShowFullText(!showFullText);
  };

  return (
    <>
      <ShowMoreContainer>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Text weight={400} size={"16pt"}>
            {text}
          </Text>
          <Button
            icon={showFullText ? <ArrowUpIcon /> : <ArrowDownIcon />}
            text="Show more"
            onClick={toggleShowMore}
          ></Button>
        </div>

        {showFullText && (
          <Card>
            <Space height="s" />
            <Divider></Divider>
            <Space height="s" />
            <div style={{ display: "flex" }}>
              <Text weight={400} size={"18px"}>
                {FullText}
              </Text>

              <ImageCard src={src} alt="" />
            </div>
              
          </Card>
        )}
      </ShowMoreContainer>
    </>
  );
};

export default ShowMore;