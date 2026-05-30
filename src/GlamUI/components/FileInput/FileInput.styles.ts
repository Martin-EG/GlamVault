import styled from 'styled-components';

interface FieldStateProps {
  $hasError: boolean;
  $disabled: boolean;
}

interface DropZoneProps extends FieldStateProps {
  $isDragging: boolean;
}

export const FieldWrapper = styled.div<FieldStateProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const DropZone = styled.div<DropZoneProps>`
  box-sizing: border-box;
  display: flex;
  min-height: 142px;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px dashed
    ${({ theme, $hasError, $isDragging }) =>
      $hasError
        ? theme.colors.feedback.errorText
        : $isDragging
          ? theme.colors.text.secondary
          : theme.colors.border.default};
  background: ${({ theme, $isDragging }) =>
    $isDragging ? theme.colors.surface.hover : theme.colors.text.inverse};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  transition:
    background 0.2s ease,
    border-color 0.2s ease;
`;

export const HiddenInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export const UploadIconWrapper = styled.span`
  display: inline-flex;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const DragText = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const BrowseRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const BrowseButton = styled.button`
  display: inline-flex;
  min-height: 28px;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: 0 ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface.hover};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};

  &:disabled {
    cursor: not-allowed;
  }
`;

export const SeparatorText = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const HelperText = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.muted};
`;

export const ErrorText = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.feedback.errorText};
`;
