export interface FileInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange'
> {
  label?: string;
  error?: string;
  helperText?: string;
  maxSizeMB?: number;
  browseLabel?: string;
  dragLabel?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFilesChange?: (files: File[]) => void;
}
