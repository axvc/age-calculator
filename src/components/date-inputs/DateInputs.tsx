import './DateInputs.sass';
import { Age } from '../../types/Age.ts';
import { createSignal } from 'solid-js';
import { DateType } from '../../types/DateType.ts';

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
  InvalidDate = 'Invalid date',
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
      return;
    }

    console.log(m, d, y);

    if (
      y > new Date().getFullYear() ||
      (y === new Date().getFullYear() && m > new Date().getMonth() + 1) ||
      (y === new Date().getFullYear() &&
        m === new Date().getMonth() + 1 &&
        d > new Date().getDate())
    ) {
      setYearError(ErrorMessage.FutureDate);
      setMonthError(' ');
      setDayError(' ');
      return;
    }

    setDayError('');
    setMonthError('');
    setYearError('');
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
    onDateChange({
      days: parseInt(day(), 10),
      months: parseInt(month(), 10),
      years: parseInt(year(), 10),
    });
  };

  return (
    <div class="date-inputs">
      <div class={`day ${dayError() && 'day-error'}`}>
        <label for="day">DAY</label>
        <input
          name="day"
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
        <label for="month">MONTH</label>
        <input
          name="month"
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
        <label for="year">YEAR</label>
        <input
          name="year"
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
