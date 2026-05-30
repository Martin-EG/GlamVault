'use client';

import {
  ChangeEvent,
  FC,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslations } from 'next-intl';

import { Calendar } from '../Icon';
import Label from '../Label';
import { ErrorText } from '../TextInput/TextInput.styles';

import CalendarPopover, { formatDate, parseDate } from './CalendarPopover';
import {
  CalendarButton,
  DateShell,
  FieldWrapper,
  Input,
} from './DateInput.styles';
import type { DateInputProps } from './DateInput.types';

const DateInput: FC<DateInputProps> = ({
  label,
  error,
  id,
  disabled,
  value,
  defaultValue,
  onChange,
  min,
  max,
  ...props
}) => {
  const t = useTranslations('calendar');
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = error ? `${inputId}-error` : undefined;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isControlled = value !== undefined;
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [inputValue, setInputValue] = useState(
    String(value ?? defaultValue ?? ''),
  );
  const currentValue = isControlled ? String(value) : inputValue;
  const selectedDate = useMemo(() => parseDate(currentValue), [currentValue]);
  const [visibleDate, setVisibleDate] = useState(selectedDate ?? new Date());

  useEffect(() => {
    if (!isCalendarOpen) return undefined;

    const handlePointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCalendarOpen]);

  const updateDateValue = (nextValue: string) => {
    if (!isControlled) {
      setInputValue(nextValue);
    }

    const input = inputRef.current as HTMLInputElement;
    input.value = nextValue;
    onChange?.({
      target: input,
      currentTarget: input,
    } as ChangeEvent<HTMLInputElement>);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInputValue(event.target.value);
    }

    const nextDate = parseDate(event.target.value);

    if (nextDate) {
      setVisibleDate(nextDate);
    }

    onChange?.(event);
  };

  const onDateSelect = (date: Date) => {
    updateDateValue(formatDate(date));
    setIsCalendarOpen(false);
  };

  const toggleCalendar = () => {
    if (!isCalendarOpen && selectedDate) {
      setVisibleDate(selectedDate);
    }

    setIsCalendarOpen((isOpen) => !isOpen);
  };

  const labelText = !!label ? <Label text={label} htmlFor={inputId} /> : null;
  const errorText = !!error ? (
    <ErrorText id={errorId} role="alert">
      {error}
    </ErrorText>
  ) : null;

  const calendarPopover = isCalendarOpen ? (
    <CalendarPopover
      inputId={inputId}
      minDate={min}
      maxDate={max}
      selectedDate={selectedDate}
      onDateSelect={onDateSelect}
      visibleDate={visibleDate}
      setVisibleDate={setVisibleDate}
    />
  ) : null;

  return (
    <FieldWrapper $hasError={!!error} $disabled={!!disabled}>
      {labelText}

      <DateShell ref={wrapperRef} $hasError={!!error} $disabled={!!disabled}>
        <Input
          id={inputId}
          ref={inputRef}
          type="date"
          $hasError={!!error}
          $disabled={!!disabled}
          aria-invalid={!!error}
          aria-describedby={errorId}
          disabled={disabled}
          value={currentValue}
          min={min}
          max={max}
          onChange={handleInputChange}
          {...props}
        />
        <CalendarButton
          type="button"
          aria-label={t('openCalendar')}
          aria-expanded={isCalendarOpen}
          aria-controls={`${inputId}-calendar`}
          disabled={disabled}
          onClick={toggleCalendar}
        >
          <Calendar size="sm" />
        </CalendarButton>

        {calendarPopover}
      </DateShell>

      {errorText}
    </FieldWrapper>
  );
};

export default DateInput;
