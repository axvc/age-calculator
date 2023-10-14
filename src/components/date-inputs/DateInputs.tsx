import './DateInputs.sass';
import { createSignal } from 'solid-js';
import { Age } from 'types/Age.ts';
import { DateType } from 'types/DateType.ts';

enum DateLimit {
  MinDay = 1,
  MaxDay = 31,
  MinMonth = 1,
  MaxMonth = 12,
  MinYear = 1,
}

enum ErrorMessage {
  Empty = 'This field is required',
  InvalidDay = 'Invalid day',
  InvalidMonth = 'Invalid month',
  InvalidYear = 'Invalid year',
  InvalidDate = 'Must be a valid date',
  FutureDate = 'Must be in the past',
}

interface Props {
  onDateChange: (age: Age | null) => void;
}

export const DateInputs = ({ onDateChange }: Props) => {
  const [day, setDay] = createSignal('');
  const [month, setMonth] = createSignal('');
  const [year, setYear] = createSignal('');
  const [dayError, setDayError] = createSignal('');
  const [monthError, setMonthError] = createSignal('');
  const [yearError, setYearError] = createSignal('');

  const validateDate = () => {
    setDayError('');
    setMonthError('');
    setYearError('');

    const d = parseInt(day(), 10);
    const m = parseInt(month(), 10);
    const y = parseInt(year(), 10);

    if (day() === '') {
      setDayError(ErrorMessage.Empty);
    } else {
      if (isNaN(d) || d < 1 || d > 31) {
        setDayError(ErrorMessage.InvalidDay);
      }
    }

    if (month() === '') {
      setMonthError(ErrorMessage.Empty);
    } else {
      if (isNaN(m) || m < 1 || m > 12) {
        setMonthError(ErrorMessage.InvalidMonth);
      }
    }

    if (year() === '') {
      setYearError(ErrorMessage.Empty);
    } else {
      if (isNaN(y) || y < 1 || y > new Date().getFullYear()) {
        setYearError(ErrorMessage.InvalidYear);
      }
    }

    if (
      day() === '' ||
      month() === '' ||
      year() === '' ||
      isNaN(d) ||
      d < 1 ||
      d > 31 ||
      isNaN(m) ||
      m < 1 ||
      m > 12 ||
      isNaN(y) ||
      y < 1 ||
      y > new Date().getFullYear()
    ) {
      onDateChange(null);
      return;
    }

    const isLeapYear = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
    const daysInMonth = [
      31,
      isLeapYear ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];

    if (d > daysInMonth[m - 1]) {
      setDayError(ErrorMessage.InvalidDate);
      setMonthError(' ');
      setYearError(' ');
      onDateChange(null);
      return;
    }

    if (
      y > new Date().getFullYear() ||
      (y === new Date().getFullYear() && m > new Date().getMonth() + 1) ||
      (y === new Date().getFullYear() &&
        m === new Date().getMonth() + 1 &&
        d > new Date().getDate())
    ) {
      setDayError(ErrorMessage.FutureDate);
      setMonthError(' ');
      setYearError(' ');
      onDateChange(null);
      return;
    }

    setDayError('');
    setMonthError('');
    setYearError('');

    onDateChange({
      days: parseInt(day(), 10),
      months: parseInt(month(), 10),
      years: parseInt(year(), 10),
    });
  };

  const onInput = (value: string, type: DateType) => {
    switch (type) {
      case DateType.Day:
        setDay(value);
        break;
      case DateType.Month:
        setMonth(value);
        break;
      case DateType.Year:
        setYear(value);
        break;
    }
    validateDate();
  };

  return (
    <div class="date-inputs">
      <div class={`day ${dayError() && 'day-error'}`}>
        <label for="day-input">DAY</label>
        <input
          id="day-input"
          type="number"
          min={DateLimit.MinDay}
          max={DateLimit.MaxDay}
          value={day()}
          onInput={e => onInput(e.target.value, DateType.Day)}
          placeholder="DD"
        />
        {dayError() && <span class="error-message">{dayError()}</span>}
      </div>
      <div class={`month ${monthError() && 'month-error'}`}>
        <label for="month-input">MONTH</label>
        <input
          id="month-input"
          type="number"
          min={DateLimit.MinMonth}
          max={DateLimit.MaxMonth}
          value={month()}
          onInput={e => onInput(e.target.value, DateType.Month)}
          placeholder="MM"
        />
        {monthError() && <span class="error-message">{monthError()}</span>}
      </div>
      <div class={`year ${yearError() && 'year-error'}`}>
        <label for="year-input">YEAR</label>
        <input
          id="year-input"
          type="number"
          min={DateLimit.MinYear}
          max={new Date().getFullYear()}
          value={year()}
          onInput={e => onInput(e.target.value, DateType.Year)}
          placeholder="YYYY"
        />
        {yearError() && <span class="error-message">{yearError()}</span>}
      </div>
    </div>
  );
};
