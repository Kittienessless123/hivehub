import React from "react";
import { VStack, type StackProps } from "shared/lib/styled/stack";
import styled from "styled-components";
import { Empty } from "../Empty";
import { Loader } from "../Loader";

export interface ListItemData {
  id?: string | number;
  children?: React.ReactNode;
  clickable?: boolean;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export interface ListItemProps {
  clickable?: boolean;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

interface ListProps extends Omit<StackProps, "direction"> {
  items?: ListItemData[];
  renderItem?: (item: ListItemData, index: number) => React.ReactNode;
  divider?: React.ReactNode;
  loading?: boolean;
  empty?: React.ReactNode;
  keyExtractor?: (item: ListItemData, index: number) => string;
  children?: React.ReactNode;
}

interface ListComponent extends React.FC<ListProps> {
  Item: React.FC<ListItemProps>;
}

const ListItemStyled = styled(VStack)<ListItemProps>`
  padding: 12px 16px;
  cursor: ${({ clickable, onClick, disabled }) =>
    (clickable || onClick) && !disabled ? "pointer" : "default"};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  background-color: ${({ selected, theme }) =>
    selected ? theme.components.background.primary : "transparent"};

  &:hover {
    background-color: ${({ clickable, onClick, disabled, theme }) =>
      (clickable || onClick) && !disabled
        ? theme.components.state.hover
        : "transparent"};
  }
`;

export const ListItem: React.FC<ListItemProps> = ({
  clickable = false,
  selected = false,
  onClick,
  children,
  disabled = false,
  ...rest
}) => {
  return (
    <ListItemStyled
      onClick={disabled ? undefined : onClick}
      selected={selected}
      clickable={clickable && !disabled}
      disabled={disabled}
      {...rest}
    >
      {children}
    </ListItemStyled>
  );
};

const defaultRenderItem = (item: ListItemData, index: number) => {
  const { id, ...itemProps } = item;
  return <ListItem key={id?.toString() || index.toString()} {...itemProps} />;
};

export const List: ListComponent = ({
  items = [],
  renderItem = defaultRenderItem,
  divider,
  loading = false,
  keyExtractor = (item, index) => item.id?.toString() || index.toString(),
  empty = <Empty />,
  children,
  ...rest
}) => {
  if (children) {
    return <VStack {...rest}>{children}</VStack>;
  }

  if (loading) {
    return (
      <VStack {...rest}>
        <ListItem key="loading"><Loader></Loader></ListItem>
      </VStack>
    );
  }

  if (items.length === 0) {
    return <VStack {...rest}>{empty}</VStack>;
  }

  return (
    <VStack {...rest}>
      {items.map((item, index) => {
        const element = renderItem(item, index);
        
        return (
          <React.Fragment key={keyExtractor(item, index)}>
            {element}
            {divider && index < items.length - 1 && divider}
          </React.Fragment>
        );
      })}
    </VStack>
  );
};

// Правильно добавляем Item как свойство компонента
List.Item = ListItem;

// Примеры использования:
/*
// 1. Составной компонент
<List>
  <List.Item key="1" onClick={() => {}}>Пункт 1</List.Item>
  <List.Item key="2" selected>Пункт 2</List.Item>
  <List.Item key="3" disabled>Пункт 3</List.Item>
</List>

// 2. С массивом данных
<List
  items={[
    { id: '1', children: 'Пункт 1', onClick: () => {} },
    { id: '2', children: 'Пункт 2', selected: true },
    { id: '3', children: 'Пункт 3', disabled: true },
  ]}
/>

// 3. С кастомным renderItem
<List
  items={newsData}
  renderItem={(item) => (
    <List.Item key={item.id} onClick={() => {}}>
      <strong>{item.title}</strong>
      <span>{item.date}</span>
    </List.Item>
  )}
  divider={<hr />}
/>
*/