import {type ChangeEventHandler } from "react";
//import { useTranslation } from "react-i18next";
import { SearchIcon } from "shared/assets/SearchIcon";
import { Button } from "shared/ui/Button";
import styled from "styled-components";

const SearchBlock = styled.div`
  display: flex;
  width: 100%;
  font-weight: 600;
  border-radius: 13px;
  border: 1px solid rgb(184, 184, 241);
  margin: 5px;
  padding: 3px;
`;
const SearchInput = styled.input`
  background-color: transparent;
  height: 2.3rem;
  padding: 5px;
  width: 100%;
  border-color: transparent;
  color: ${({ theme }) => theme.components.text.primary};
`;
export type SearchProps = {
  searchHandler: ChangeEventHandler;
};

export const Search = (props: SearchProps) => {
  const { searchHandler } = props;
  //const { t } = useTranslation();

   
 
  return (
    <SearchBlock>
      <SearchInput
        type="search"
        name="search"
        placeholder={'Search'}
        onChange={(event) => searchHandler(event)}
         
      />
      <Button text={"search"} icon={<SearchIcon />}></Button>
    </SearchBlock>
  );
};

export default Search; 