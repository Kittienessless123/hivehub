import { Text } from "../Text";
import styled from "styled-components";
import ImgEmpty from "../../assets/ErrorImage.svg";
import { SpaceArea } from "../Space";
import { useTranslation } from "react-i18next";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.components.background.primary};
  color: ${({ theme }) => theme.components.text.primary};
`;

const EmptyImg = styled.img.attrs({
  src: ImgEmpty,
})`
  width: 20%;
`;
export const Empty = () => {
    const { t } = useTranslation();
  
  return (
    <Container>
      <EmptyImg />
      <Text weight={"bold"} height="m" size={"28px"} centerHorizontally>
        {t("rules.text1")}
      </Text>
      <SpaceArea height="s" />
      <Text weight={400} height="s" size={"18px"} centerHorizontally>
        {t("rules.text2")}
      </Text>
    </Container>
  );
};