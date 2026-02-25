import styled from "styled-components";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Loader } from "../Loader";
import { CloseIcon } from "shared/assets/CloseIcon";
import { Empty } from "../Empty";

type MIMEType = "img" | "json" | "docx" | "excel" | "png";
type FileSize = "50" | "200" | "400";

interface UploadItem {
  id: string;
  type: MIMEType;
  size: FileSize;
  name: string;
  file?: File;
  preview?: string;
}

type UploaderProps = {
  items?: UploadItem[];
  maxItemCount?: number; // от 1 до 10
  onUpload?: (files: File[]) => void;
  onDelete?: (id: string) => void;
  acceptedTypes?: MIMEType[];
  maxFileSize?: number; // в МБ
  isLoading?: boolean;
};

// Маппинг MIME типов
const mimeTypes: Record<MIMEType, string[]> = {
  img: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  json: ['application/json'],
  docx: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  excel: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  png: ['image/png'],
};


const UploaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.s};
  width: 100%;
  max-width: 400px;
`;

const UploadArea = styled.div<{ $isDragActive: boolean; $hasError: boolean }>`
  border: 2px dashed ${({ theme, $isDragActive, $hasError }) => 
    $hasError ? theme.colors.danger :
    $isDragActive ? theme.colors.primary : theme.colors.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.m};
  background: ${({ theme, $isDragActive }) => 
    $isDragActive ? theme.state.hover : 'transparent'};
  padding: ${({ theme }) => theme.spacing.l};
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.state.hover};
  }
`;

const UploadButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.s};
  padding: ${({ theme }) => `${theme.spacing.s} ${theme.spacing.m}`};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary}dd;
    transform: translateY(-1px);
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.gray400};
    cursor: not-allowed;
    transform: none;
  }
`;

const FilesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  max-height: 300px;
  overflow-y: auto;
`;

const FileItem = styled.div<{ $type?: MIMEType }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.s} ${({ theme }) => theme.spacing.m};
  background: ${({ theme }) => theme.colors.gray50};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.s};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.state.hover};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.s};
  flex: 1;
  min-width: 0;
`;

const FileIcon = styled.div<{ $type: MIMEType }>`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  background: ${({ theme, $type }) => {
    switch ($type) {
      case 'img':
      case 'png':
        return theme.colors.info + '20';
      case 'json':
        return theme.colors.warning + '20';
      case 'docx':
        return theme.colors.primary + '20';
      case 'excel':
        return theme.colors.success + '20';
      default:
        return theme.colors.gray200;
    }
  }};
  color: ${({ theme, $type }) => {
    switch ($type) {
      case 'img':
      case 'png':
        return theme.colors.info;
      case 'json':
        return theme.colors.warning;
      case 'docx':
        return theme.colors.primary;
      case 'excel':
        return theme.colors.success;
      default:
        return theme.colors.gray600;
    }
  }};
  font-size: 12px;
  font-weight: bold;
`;

const FileName = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FileSize_b = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-left: ${({ theme }) => theme.spacing.s};
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.state.hover};
    color: ${({ theme }) => theme.colors.danger};
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 0.8rem;
  margin-top: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.s};
  background: ${({ theme }) => theme.colors.danger}10;
  border-radius: ${({ theme }) => theme.borderRadius.xs};
`;

const Counter = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: right;
`;

// Функция для форматирования размера файла
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Б';
  const k = 1024;
  const sizes = ['Б', 'КБ', 'МБ', 'ГБ'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

// Функция для определения типа файла
const getFileType = (file: File): MIMEType | null => {
  for (const [type, mimes] of Object.entries(mimeTypes)) {
    if (mimes.includes(file.type)) {
      return type as MIMEType;
    }
  }
  
  // Проверка по расширению
  const extension = file.name.split('.').pop()?.toLowerCase();
  if (extension === 'png') return 'png';
  if (extension === 'json') return 'json';
  if (extension === 'docx') return 'docx';
  if (extension === 'xlsx' || extension === 'xls') return 'excel';
  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) return 'img';
  
  return null;
};

export const Uploader = (props: UploaderProps) => {
  const {
    items = [],
    maxItemCount = 10,
    onUpload,
    onDelete,
    acceptedTypes = ['img', 'png', 'json', 'docx', 'excel'],
    maxFileSize = 50, // по умолчанию 50 МБ
    isLoading = false,
  } = props;

  const [error, setError] = useState<string | null>(null);
  const [localItems, setLocalItems] = useState<UploadItem[]>(items);

  // Валидация maxItemCount
  const validMaxCount = Math.min(Math.max(maxItemCount, 1), 10);

  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: unknown[]) => {
    setError(null);

    // Проверка на превышение лимита
    if (localItems.length + acceptedFiles.length > validMaxCount) {
      setError(`Максимальное количество файлов: ${validMaxCount}`);
      return;
    }

    // Обработка отклоненных файлов
    if (rejectedFiles.length > 0) {
      const errors = rejectedFiles.map((rejection: unknown) => {
        if (rejection.errors[0]?.code === 'file-too-large') {
          return `Файл "${rejection.file.name}" слишком большой (макс. ${maxFileSize} МБ)`;
        }
        if (rejection.errors[0]?.code === 'file-invalid-type') {
          return `Файл "${rejection.file.name}" имеет неподдерживаемый тип`;
        }
        return `Файл "${rejection.file.name}" не может быть загружен`;
      });
      setError(errors.join('. '));
      return;
    }

    // Создание новых элементов
    const newItems = acceptedFiles.map((file) => {
      const type = getFileType(file);
      
      // Создаем превью для изображений
      let preview = undefined;
      if (type === 'img' || type === 'png') {
        preview = URL.createObjectURL(file);
      }

      return {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: type || 'img', // fallback
        size: String(Math.round(file.size / (1024 * 1024))) as FileSize,
        file,
        preview,
      };
    });

    const updatedItems = [...localItems, ...newItems];
    setLocalItems(updatedItems);
    
    if (onUpload) {
      onUpload(acceptedFiles);
    }
  }, [localItems, validMaxCount, maxFileSize, onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => {
      acc[mimeTypes[type].join(',')] = [];
      return acc;
    }, {} as Record<string, string[]>),
    maxSize: maxFileSize * 1024 * 1024, // конвертация в байты
    disabled: isLoading || localItems.length >= validMaxCount,
    multiple: undefined,
    onDragEnter: undefined,
    onDragOver: undefined,
    onDragLeave: undefined
  });

  const handleDelete = (id: string) => {
    const item = localItems.find(i => i.id === id);
    if (item?.preview) {
      URL.revokeObjectURL(item.preview);
    }
    
    const updatedItems = localItems.filter(item => item.id !== id);
    setLocalItems(updatedItems);
    
    if (onDelete) {
      onDelete(id);
    }
    setError(null);
  };

  const handleFileClick = (item: UploadItem) => {
    // Заглушка для открытия превью
    console.log('Открыть превью:', item);
    if (item.preview) {
      window.open(item.preview, '_blank');
    }
  };


  return (
    <UploaderContainer>
      <UploadArea 
        {...getRootProps()} 
        $isDragActive={isDragActive}
        $hasError={!!error}
      >
        <input/>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <UploadButton 
              as="span" 
              onClick={(e) => e.stopPropagation()}
            >
              Загрузить
            </UploadButton>
            <p style={{ marginTop: '8px', fontSize: '0.8rem', color: '#666' }}>
              или перетащите файлы сюда
            </p>
            <Counter>
              {localItems.length} / {validMaxCount} файлов
            </Counter>
          </>
        )}
      </UploadArea>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {localItems.length > 0 ? (
        <FilesList>
          {localItems.map((item) => (
            <FileItem 
              key={item.id}
              $type={item.type}
              onClick={() => handleFileClick(item)}
            >
              <FileInfo>
                <FileIcon $type={item.type}>
                  {item.type === 'img' || item.type === 'png' ? '🖼️' :
                   item.type === 'json' ? '{ }' :
                   item.type === 'docx' ? '📄' :
                   item.type === 'excel' ? '📊' : '📁'}
                </FileIcon>
                <FileName>{item.name}</FileName>
                <FileSize_b>
                  {item.file ? formatFileSize(item.file.size) : `${item.size} МБ`}
                </FileSize_b>
              </FileInfo>
              <DeleteButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(item.id);
                }}
              >
                <CloseIcon />
              </DeleteButton>
            </FileItem>
          ))}
        </FilesList>
      ) : (
        !isLoading && <Empty/>
      )}
    </UploaderContainer>
  );
};