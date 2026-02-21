import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import styled from "styled-components";
import { SkeletonTheme } from "react-loading-skeleton";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
 
`;

const MainContent = styled.div`
  flex: 1 0 auto;
  width: 100%;
`;

export const Layout: React.FC = () => {
  return (
    <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
      <LayoutContainer>
        <MainContent>
          <Outlet />
        </MainContent>
        <ScrollRestoration />
      </LayoutContainer>
    </SkeletonTheme>
  );
};