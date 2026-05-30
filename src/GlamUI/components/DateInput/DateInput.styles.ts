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

export const DateShell = styled.div<FieldStateProps>`
  position: relative;
  width: 100%;
  max-width: 168px;
`;

export const Input = styled.input<FieldStateProps>`
  box-sizing: border-box;
  width: 100%;
  height: 36px;
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
      $hasError
        ? theme.colors.feedback.errorText
        : theme.colors.border.default};

  &::-webkit-calendar-picker-indicator {
    opacity: 0;
    cursor: pointer;
  }

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.text.secondary};
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.25);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const CalendarButton = styled.button`
  position: absolute;
  right: ${({ theme }) => theme.spacing.sm};
  top: 50%;
  display: inline-flex;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transform: translateY(-50%);

  &:disabled {
    cursor: not-allowed;
  }
`;

export const StyledCalendarPopover = styled.div`
  position: absolute;
  z-index: 10;
  top: calc(100% + ${({ theme }) => theme.spacing.xs});
  left: 0;
  width: 252px;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface.default};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

export const CalendarHeader = styled.div`
  display: grid;
  grid-template-columns: 32px 1fr 32px;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const MonthLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  text-align: center;
`;

export const NavButton = styled.button`
  display: inline-flex;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface.default};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.sizes.md};

  &:hover {
    background: ${({ theme }) => theme.colors.surface.hover};
  }
`;

export const WeekdayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const Weekday = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  text-align: center;
`;

export const StyledDaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: ${({ theme }) => theme.spacing.xs};
`;

interface StyledDayButtonProps {
  $isSelected: boolean;
  $isToday: boolean;
}

export const StyledDayButton = styled.button<StyledDayButtonProps>`
  display: inline-flex;
  width: 28px;
  height: 28px;
  align-items: center;
  justify-content: center;
  border: 1px solid
    ${({ theme, $isSelected, $isToday }) =>
      $isSelected || $isToday
        ? theme.colors.brand.primary
        : theme.colors.border.subtle};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.brand.primary : theme.colors.surface.default};
  color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.background.page : theme.colors.text.primary};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.sizes.sm};

  &:hover:not(:disabled) {
    background: ${({ theme, $isSelected }) =>
      $isSelected ? theme.colors.brand.secondary : theme.colors.surface.hover};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.text.muted};
    cursor: not-allowed;
    opacity: 0.45;
  }
`;

export const EmptyDay = styled.span`
  width: 28px;
  height: 28px;
`;
