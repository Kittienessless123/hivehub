import { ArrowLeftIcon } from "shared/assets/ArrowLeftIcon";
import { ArrowRightIcon } from "shared/assets/ArrowRightIcon";
import { MaxArrowLeftIcon } from "shared/assets/MaxArrowLeftIcon";
import { MaxArrowRightIcon } from "shared/assets/MaxArrowRightIcon";
import { HStack } from "shared/lib/styled/stack";
import styled from "styled-components";


type Size = "small" | "medium" | "large";
type Position = "left" | "right" | "center";

type PaginationProps = {
  offset: number;
  perPage: number;
  total: number;
  $size?: Size;
  $position?: Position;
  onChange: (newOffset: number) => void;
  siblingCount?: number;
};

interface PageButtonProps {
  $active?: boolean;
  $size: Size;
  disabled?: boolean;
}
const PageButton = styled.button<PageButtonProps>`
  margin-right: 5px;
  border: 2px solid rgb(101, 162, 255);
  width: 30px;
  height: 20px;
  border-radius: 4px;
  padding: 3px 6px;
  background-color: ${({ $active }) => ($active ? "#3182ce" : "white")};
  color: ${({ $active }) => ($active ? "white" : "#4a5568")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease-in-out;
  &:hover:not(:disabled) {
    background-color: ${({ $active }) => ($active ? "#2c5282" : "#edf2f7")};
    border-color: #3182ce;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  ${({ $size }) => {
    switch ($size) {
      case "small":
        return `
          min-width: 28px;
          height: 28px;
          font-size: 12px;
          border-radius: 4px;
        `;
      case "large":
        return `
          min-width: 40px;
          height: 40px;
          font-size: 16px;
          border-radius: 8px;
        `;
      default: // medium
        return `
          min-width: 36px;
          height: 36px;
          font-size: 14px;
          border-radius: 6px;
        `;
    }
  }}
  svg {
    width: ${({ $size }) => {
      switch ($size) {
        case "small":
          return "14px";
        case "large":
          return "20px";
        default:
          return "16px";
      }
    }};
    height: auto;
    fill: currentColor;
  }

  /* Отключенное состояние */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
const PaginationWrapper = styled.div<{ $size: Size; $position: Position }>`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin: auto;
  padding: 6px 12px;
  gap: 16px;

  width: 100%;
  flex-wrap: wrap;
  border-radius: 6px;
  height: 50px;
  overflow: hidden;
  justify-content: ${({ $position }) => {
    switch ($position) {
      case "left":
        return "flex-start";
      case "right":
        return "flex-end";
      case "center":
        return "center";
      default:
        return "center";
    }
  }};
  padding: ${({ $size }) => {
    switch ($size) {
      case "small":
        return "4px 8px";
      case "large":
        return "8px 16px";
      default:
        return "6px 12px";
    }
  }};
`;

const getPageNumbers = (
  currentPage: number,
  totalPages: number,
  siblingCount: number = 1,
): (number | string)[] => {
  // Базовый случай: если страниц мало, показываем все
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Вычисляем границы
  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);

  // Нужно ли показывать многоточия
  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < totalPages - 1;

  // Формируем массив
  if (!showLeftDots && showRightDots) {
    // Показываем левую часть без многоточия
    const leftRange = Array.from(
      { length: 3 + 2 * siblingCount },
      (_, i) => i + 1,
    );
    return [...leftRange, "...", totalPages];
  }

  if (showLeftDots && !showRightDots) {
    // Показываем правую часть без многоточия
    const rightRange = Array.from(
      { length: 3 + 2 * siblingCount },
      (_, i) => totalPages - (3 + 2 * siblingCount) + i + 1,
    );
    return [1, "...", ...rightRange];
  }

  if (showLeftDots && showRightDots) {
    // Показываем середину с многоточиями с обеих сторон
    const middleRange = Array.from(
      { length: 2 * siblingCount + 1 },
      (_, i) => leftSibling + i,
    );
    return [1, "...", ...middleRange, "...", totalPages];
  }

  return [];
};
export const Pagination = (props: PaginationProps) => {
  const {
    offset,
    total,
    perPage,
    $size = "medium",
    $position = "center",
    onChange,
    siblingCount = 1,
  } = props;

  const currentPage = Math.floor(offset / perPage) + 1;
  const totalPages = Math.ceil(total / perPage);
  // Если всего одна страница или нет данных, не показываем пагинацию
  if (totalPages <= 1 || total === 0) {
    return null;
  }

  // Обработчики навигации
  const goToPage = (page: number) => {
    const newOffset = (page - 1) * perPage;
    onChange(newOffset);
  };

  const goToFirst = () => goToPage(1);
  const goToLast = () => goToPage(totalPages);
  const goToPrev = () => goToPage(currentPage - 1);
  const goToNext = () => goToPage(currentPage + 1);
  const pageNumbers = getPageNumbers(currentPage, totalPages, siblingCount);

  return (
    <PaginationWrapper $size={$size} $position={$position}>
      <HStack gap={$size === "small" ? 4 : 8}>
        <PageButton
          $size={$size}
          onClick={goToFirst}
          disabled={currentPage === 1}
          aria-label="Первая страница"
        >
          <MaxArrowLeftIcon />
        </PageButton>
        <PageButton
          $size={$size}
          onClick={goToPrev}
          disabled={currentPage === 1}
          aria-label="Предыдущая страница"
        >
          <ArrowLeftIcon />
        </PageButton>
        {pageNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <PageButton
                key={`dots-${index}`}
                $size={$size}
                disabled
                as="span" // Рендерим как span, а не кнопку
              >
                ...
              </PageButton>
            );
          }

          const pageNumber = page as number;
          return (
            <PageButton
              key={pageNumber}
              $size={$size}
              $active={pageNumber === currentPage}
              onClick={() => goToPage(pageNumber)}
              aria-label={`Страница ${pageNumber}`}
              aria-current={pageNumber === currentPage ? "page" : undefined}
            >
              {pageNumber}
            </PageButton>
          );
        })}
        <PageButton
          $size={$size}
          onClick={goToNext}
          disabled={currentPage === totalPages}
          aria-label="Следующая страница"
        >
          <ArrowRightIcon />
        </PageButton>

        {/* Последняя страница */}
        <PageButton
          $size={$size}
          onClick={goToLast}
          disabled={currentPage === totalPages}
          aria-label="Последняя страница"
        >
          <MaxArrowRightIcon />
        </PageButton>
      </HStack>
      <HStack
        gap={4}
        style={{
          color: "#718096",
          fontSize: $size === "small" ? "12px" : "14px",
        }}
      >
        <span>
          Страница {currentPage} из {totalPages}
        </span>
        <span style={{ marginLeft: 8 }}>(всего {total} записей)</span>
      </HStack>
    </PaginationWrapper>
  );
};
