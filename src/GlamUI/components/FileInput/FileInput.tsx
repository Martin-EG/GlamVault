'use client';

import { DragEvent, FC, useId, useRef, useState } from 'react';
import { Image as ImageIcon, Upload } from '../Icon';

import {
  BrowseButton,
  BrowseRow,
  DragText,
  DropZone,
  ErrorText,
  FieldWrapper,
  HelperText,
  HiddenInput,
  SeparatorText,
  UploadIconWrapper,
} from './FileInput.styles';
import type { FileInputProps } from './FileInput.types';
import { useTranslations } from 'next-intl';
import Label from '../Label';

const bytesPerMB = 1024 * 1024;

const FileInput: FC<FileInputProps> = ({
  label,
  error,
  helperText,
  maxSizeMB = 10,
  browseLabel,
  dragLabel,
  id,
  disabled,
  multiple,
  accept = 'image/png,image/jpeg',
  onChange,
  onFilesChange,
  ...props
}) => {
  const t = useTranslations('inventoryAddProduct.fileInput');
  const helperTextStr = helperText || t('helperText', { maxSize: maxSizeMB });
  const browseLabelStr = browseLabel || t('browseLabel');
  const dragLabelStr = dragLabel || t('dragLabel');

  const generatedId = useId();
  const inputId = id ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [sizeError, setSizeError] = useState<string>();

  const visibleError = error ?? sizeError;
  const errorId = visibleError ? `${inputId}-error` : undefined;
  const errorText = !!visibleError ? (
    <ErrorText id={errorId} role="alert">
      {visibleError}
    </ErrorText>
  ) : null;

  const labelText = label ? <Label htmlFor={inputId} text={label} /> : null;

  const handleFiles = (fileList: FileList | File[]) => {
    const files = Array.from(fileList);
    const selectedFiles = multiple ? files : files.slice(0, 1);
    const oversizedFile = selectedFiles.find(
      (file) => file.size > maxSizeMB * bytesPerMB,
    );

    if (oversizedFile) {
      setSizeError(t('errorSize', { maxSize: maxSizeMB }));
      onFilesChange?.([]);
      return;
    }

    setSizeError(undefined);
    onFilesChange?.(selectedFiles);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    if (disabled) {
      return;
    }

    handleFiles(event.dataTransfer.files);
  };

  return (
    <FieldWrapper $hasError={!!visibleError} $disabled={!!disabled}>
      {labelText}

      <DropZone
        $hasError={!!visibleError}
        $disabled={!!disabled}
        $isDragging={isDragging}
        onDragEnter={(event) => {
          event.preventDefault();
          if (!disabled) setIsDragging(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          if (!disabled) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <HiddenInput
          id={inputId}
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          aria-invalid={!!visibleError}
          aria-describedby={errorId}
          onChange={(event) => {
            onChange?.(event);
            handleFiles(event.target.files ?? []);
          }}
          {...props}
        />

        <UploadIconWrapper>
          <Upload size="xl" strokeWidth={2.5} />
        </UploadIconWrapper>

        <DragText>{dragLabelStr}</DragText>
        <SeparatorText>{t('or')}</SeparatorText>
        <BrowseRow>
          <BrowseButton
            type="button"
            disabled={disabled}
            onClick={() => inputRef.current?.click()}
          >
            <ImageIcon size="sm" />
            {browseLabelStr}
          </BrowseButton>
        </BrowseRow>
        <HelperText>{helperTextStr}</HelperText>
      </DropZone>

      {errorText}
    </FieldWrapper>
  );
};

export default FileInput;
