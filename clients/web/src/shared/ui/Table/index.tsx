import styled from "styled-components";
import { Empty } from "../Empty";
import { Loader } from "../Loader";
import { useState, useEffect } from "react";

type SelectedRowKeysType = "radio" | "checkbox";
type TableAlignment = "center" | "left" | "right";
type TableBorderType = "none" | "bordered";

type RowSelection = {
  selectedRowKeys: Array<string | number>;
  onChange: (selectedRowKeys: Array<string | number>) => void;
  type: SelectedRowKeysType;
};

interface ColumnType<T> {
  title: string;
  dataIndex: keyof T;
  key: string | number;
  $align?: TableAlignment;
  render?: (value: T[keyof T], record: T, index: number) => React.ReactNode;
}

interface TableStyledProps {
  $align?: TableAlignment;
  $border?: TableBorderType;
}

type TableProps<T> = {
  data: T[];
  columns: ColumnType<T>[];
  rowSelection?: RowSelection;
  onChange?: (
    pagination: { current: number; pageSize: number },
    sorter: { columnKey: string; order: "ascend" | "descend" | null },
  ) => void;
  children?: React.ReactNode;
  $loading?: boolean;
  $empty?: React.ReactNode;
  rowKey: keyof T | ((record: T) => string | number);
  htmlProps?: React.TableHTMLAttributes<HTMLTableElement>;
} & TableStyledProps;

const TableStyled = styled.table<TableStyledProps>`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: white;
  border: ${(props) =>
    props.$border === "bordered" ? "1px solid #ffd0d6" : "none"};
  border-radius: 12px;
  overflow: hidden;

  thead {
    background: rgba(250, 128, 139, 0.1);
  }

  th {
    padding: 16px 20px;
    text-align: ${(props) => props.$align || "left"};
    font-weight: 600;
    color: #343c4f;
    border-right: ${(props) =>
      props.$border === "bordered"
        ? "1px solid rgba(52, 60, 79, 0.1)"
        : "none"};
    border-bottom: ${(props) =>
      props.$border === "bordered"
        ? "1px solid rgba(52, 60, 79, 0.3)"
        : "1px solid rgba(52, 60, 79, 0.1)"};
  }

  th:last-child {
    border-right: none;
  }

  td {
    padding: 14px 20px;
    border-right: ${(props) =>
      props.$border === "bordered" ? "1px solid #eaeaea" : "none"};
    border-bottom: ${(props) =>
      props.$border === "bordered" ? "1px solid #eaeaea" : "1px solid #eaeaea"};
    color: #333;
    transition: all 0.2s ease;
    text-align: ${(props) => props.$align || "left"};
  }

  td:last-child {
    border-right: none;
  }

  /* Для borderless убираем границы */
  ${(props) =>
    props.$border === "none" &&
    `
    th, td {
      border-right: none;
    }
    
    th {
      border-bottom: 1px solid rgba(52, 60, 79, 0.1);
    }
  `}

  tbody tr:last-child td {
    border-bottom: ${(props) =>
      props.$border === "bordered" ? "none" : "1px solid #eaeaea"};
  }

  tbody tr {
    background: white;
    transition: all 0.2s ease;
  }

  tbody tr:hover {
    background-color: #eaebef;
    box-shadow: 0 8px 20px rgba(52, 60, 79, 0.15);
    position: relative;
  }

  tbody tr:hover td:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  tbody tr:hover td:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  /* Стили для колонки с выбором */
  .selection-cell {
    width: 48px;
    text-align: center;
  }

  input[type="checkbox"], 
  input[type="radio"] {
    margin: 0;
    cursor: pointer;
  }
`;

export const Table = <T,>(props: TableProps<T>) => {
  const {
    data,
    columns,
    rowSelection,
    onChange,
    children,
    $loading,
    $empty = <Empty></Empty>,
    rowKey,
    $align = "center",
    $border = "bordered",
    htmlProps,
  } = props;

  // Состояние для сортировки (заглушка для onChange)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sorter, setSorter] = useState<{ columnKey: string; order: "ascend" | "descend" | null }>({
    columnKey: "",
    order: null,
  });

  // Функция для получения ключа строки
  const getRowKey = (record: T, index: number): string | number => {
    try {
      if (typeof rowKey === "function") {
        return rowKey(record);
      } else {
        return record[rowKey] as string | number;
      }
    } catch (e) {
      console.warn("Не удалось получить rowKey, используется индекс", e);
      return `row-${index}`;
    }
  };

  // Обработчик выбора строки
  const handleRowSelect = (rowKeyValue: string | number, isSelected: boolean) => {
    if (!rowSelection) return;

    let newSelectedKeys: Array<string | number>;

    if (rowSelection.type === "radio") {
      // Для радио можно выбрать только одну строку
      newSelectedKeys = [rowKeyValue];
    } else {
      // Для чекбокса
      if (isSelected) {
        // Убираем из выбранных
        newSelectedKeys = rowSelection.selectedRowKeys.filter(key => key !== rowKeyValue);
      } else {
        // Добавляем к выбранным
        newSelectedKeys = [...rowSelection.selectedRowKeys, rowKeyValue];
      }
    }

    rowSelection.onChange(newSelectedKeys);
  };

  // Обработчик выбора всех строк (только для чекбокса)
  const handleSelectAll = () => {
    if (!rowSelection || rowSelection.type !== "checkbox") return;

    const allRowKeys = data.map((record, index) => getRowKey(record, index));
    
    if (rowSelection.selectedRowKeys.length === allRowKeys.length) {
      // Если все выбраны - снимаем все
      rowSelection.onChange([]);
    } else {
      // Иначе выбираем все
      rowSelection.onChange(allRowKeys);
    }
  };

  // Проверка, выбрана ли строка
  const isRowSelected = (rowKeyValue: string | number): boolean => {
    return rowSelection?.selectedRowKeys.includes(rowKeyValue) || false;
  };

  // Проверка, все ли строки выбраны
  const isAllSelected = (): boolean => {
    if (!rowSelection || rowSelection.type !== "checkbox" || data.length === 0) return false;
    
    const allRowKeys = data.map((record, index) => getRowKey(record, index));
    return allRowKeys.every(key => rowSelection.selectedRowKeys.includes(key));
  };

  // Симуляция пагинации и сортировки для onChange
  useEffect(() => {
    if (onChange) {
      onChange(
        { current: 1, pageSize: data.length }, // Заглушка для пагинации
        sorter
      );
    }
  }, [sorter, data.length]);

  if ($loading) {
    return <Loader />;
  }
  
  if (data.length === 0) {
    return <>{$empty}</>;
  }

  // Создаем массив колонок с учетом rowSelection
  const allColumns = [...columns];
  if (rowSelection) {
    allColumns.unshift({
      title: rowSelection.type === "checkbox" ? (
        <input
          type="checkbox"
          checked={isAllSelected()}
          onChange={handleSelectAll}
        />
      ) : (
        "Выбор"
      ),
      dataIndex: "" as keyof T,
      key: "_selection",
      $align: "center",
      render: (_: unknown, record: T, index: number) => {
        const rowKeyValue = getRowKey(record, index);
        const selected = isRowSelected(rowKeyValue);
        
        return (
          <div className="selection-cell">
            <input
              type={rowSelection.type === "radio" ? "radio" : "checkbox"}
              name={rowSelection.type === "radio" ? "table-radio" : undefined}
              checked={selected}
              onChange={() => handleRowSelect(rowKeyValue, selected)}
            />
          </div>
        );
      },
    } as ColumnType<T>);
  }

  return (
    <TableStyled {...htmlProps} $align={$align} $border={$border}>
      {children}
      <thead>
        <tr>
          {allColumns.map((column) => {
            const align = column.$align ?? $align;
            return (
              <th key={column.key} style={{ textAlign: align }}>
                {column.title}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((record, rowIndex) => {
          const rowKeyValue = getRowKey(record, rowIndex);

          return (
            <tr key={rowKeyValue}>
              {allColumns.map((column) => {
                // Пропускаем рендер для колонки с выбором
                if (column.key === "_selection") {
                  const selected = isRowSelected(rowKeyValue);
                  return (
                    <td key={column.key} className="selection-cell">
                      <input
                        type={rowSelection?.type === "radio" ? "radio" : "checkbox"}
                        name={rowSelection?.type === "radio" ? "table-radio" : undefined}
                        checked={selected}
                        onChange={() => rowSelection && handleRowSelect(rowKeyValue, selected)}
                      />
                    </td>
                  );
                }

                const value = record[column.dataIndex];
                const align = column.$align ?? $align;

                let cellContent: React.ReactNode;
                if (column.render) {
                  cellContent = column.render(value, record, rowIndex);
                } else {
                  cellContent = value?.toString() ?? "";
                }

                return (
                  <td key={column.key} style={{ textAlign: align }}>
                    {cellContent}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </TableStyled>
  );
};