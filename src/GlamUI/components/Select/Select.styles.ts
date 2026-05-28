import styled from 'styled-components';

interface FieldStateProps {
  $hasError: boolean;
  $disabled: boolean;
}

export const FieldWrapper = styled.div<FieldStateProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

export const SelectShell = styled.div`
  position: relative;
`;

export const StyledSelect = styled.select<FieldStateProps>`
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  appearance: none;
  padding: ${({ theme }) => theme.spacing.xs}
    calc(
      ${({ theme }) => theme.spacing.xl} + ${({ theme }) => theme.spacing.xs}
    )
    ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  line-height: 1;

  background: ${({ theme }) => theme.colors.text.inverse};
  color: ${({ theme }) => theme.colors.text.primary};

  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.colors.feedback.errorText : theme.colors.text.muted};

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.text.secondary};
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.25);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const Chevron = styled.span<FieldStateProps>`
  position: absolute;
  right: ${({ theme }) => theme.spacing.sm};
  top: 50%;
  width: 8px;
  height: 8px;
  border-right: 1.5px solid ${({ theme }) => theme.colors.text.primary};
  border-bottom: 1.5px solid ${({ theme }) => theme.colors.text.primary};
  transform: translateY(-70%) rotate(45deg);
  pointer-events: none;
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
`;
