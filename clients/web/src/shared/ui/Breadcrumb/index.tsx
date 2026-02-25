import React from "react";
import styled from "styled-components";

interface BreadcrumbProps {
  key: string | number;
  title: string;
  onClick?: () => void;
  icon?: React.ReactNode; 
}

interface BCListProps {
  routes: BreadcrumbProps[];
  maxItems?: number; 
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;
const BreadcrumbItem = styled.button<{ $isLast?: boolean }>`
  background: none;
  border-radius: 6px;
  border: none;
  font-size: 14px;
  padding: 6px 8px;
  cursor: ${({ $isLast }) => ($isLast ? 'default' : 'pointer')};
  display: flex;
  align-items: center;
  gap: 6px;
  color: #0066cc;
  transition: all 0.2s ease;
  font-weight: ${({ $isLast }) => ($isLast ? '600' : '400')};

  &:hover {
    background: ${({ $isLast }) => ($isLast ? 'none' : '#f0f0f0')};
  }

  &:active {
    transform: ${({ $isLast }) => ($isLast ? 'none' : 'scale(0.98)')};
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;

  & svg {
    height: 16px;
    width: 16px;
    display: block;
    flex-shrink: 0;
  }

  & svg path {
    stroke: currentColor;
    fill: currentColor;
  }

  &:not(:last-child)::after {
    content: "/" ;
    margin-left: 8px;
    margin-right: 4px;
    color: #999;
    font-size: 14px;
    font-weight: 300;
    display: inline-block;
    pointer-events: none;
  }

  &:last-child {
    pointer-events: none; 
    
    ${BreadcrumbItem} {
      color: #666;
      font-weight: 600;
      cursor: default;
      
      &:hover {
        background: none;
      }
    }
  }
`;


export const Breadcrumb = (props: BCListProps) => {
  const { 
    routes, 
    maxItems 
  } = props;

  const getDisplayRoutes = () => {
    if (!maxItems || routes.length <= maxItems) {
      return routes;
    }

    const first = routes[0];
    const last = routes[routes.length - 1];
    const rest = routes.slice(1, -1);

    return [
      first,
      { key: 'ellipsis', title: '...', onClick: undefined }, 
      ...(rest.length > 1 ? [last] : rest)
    ];
  };

  const displayRoutes = getDisplayRoutes();

  return (
    <Wrapper>
      {displayRoutes.map((route, index) => {
        const isLast = index === displayRoutes.length - 1;
        return (
          <Container key={route.key}>
            <BreadcrumbItem
              $isLast={isLast}
              onClick={!isLast && route.onClick ? route.onClick : undefined}
              disabled={isLast}
            >
              {route.icon && <span className="icon">{route.icon}</span>}
              <span>{route.title}</span>
            </BreadcrumbItem>
          </Container>
        );
      })}
    </Wrapper>
  );
};




/*
export const BreadcrumbExample = () => {
  const routes: BreadcrumbProps[] = [
    {
      key: 'home',
      title: 'Главная',
      onClick: () => console.log('На главную'),
      icon: '🏠'
    },
    {
      key: 'catalog',
      title: 'Каталог',
      onClick: () => console.log('В каталог'),
    },
    {
      key: 'category',
      title: 'Электроника',
      onClick: () => console.log('В категорию'),
    },
    {
      key: 'product',
      title: 'iPhone 14 Pro',
    },
  ];

  return (
    <>
      <Breadcrumb routes={routes} />
      <Breadcrumb routes={routes} maxItems={3} />
      <CompactBreadcrumb routes={routes} />
    </>
  );
};  */