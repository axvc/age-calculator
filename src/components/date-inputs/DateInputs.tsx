import './DateInputs.sass'
import {Age} from "../../types/Age.ts";
import {createSignal} from "solid-js";
import {DateType} from "../../types/DateType.ts";

interface Props {
  onDateChange: (age: Age | null) => void
}

export const DateInputs = ({ onDateChange }: Props) => {
  const [day, setDay] = createSignal('');
  const [month, setMonth] = createSignal('');
  const [year, setYear] = createSignal('');
  const [error, setError] = createSignal('');

  const validateDate = () => {
    const d = parseInt(day(), 10);
    const m = parseInt(month(), 10);
    const y = parseInt(year(), 10);

    if (isNaN(d) || isNaN(m) || isNaN(y) || d < 1 || d > 31 || m < 1 || m > 12) {
      setError('Введите корректную дату.');
      onDateChange(null)
      return;
    }

    const isLeapYear = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
    const daysInMonth = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (d > daysInMonth[m - 1]) {
      setError('Неправильное количество дней для выбранного месяца.');
      return;
    }

    setError(''); // очистите сообщение об ошибке, если дата корректна
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
    onDateChange({ days: parseInt(day(), 10), months: parseInt(month(), 10), years: parseInt(year(), 10) });
  }

  return (
    <div class="date-inputs">
      <div class="day">
        <label for="day">Day</label>
        <input
          name="day"
          type="text"
          value={day()}
          onInput={(e) => onInput(e.target.value, DateType.Day)}
          placeholder="DD"
        />
        {error() && <div style="color: red;">{error()}</div>}
      </div>
      <div class="month">
        <label for="month">Month</label>
        <input
          name="month"
          type="text"
          value={month()}
          onInput={(e) => onInput(e.target.value, DateType.Month)}
          placeholder="MM"
        />
        {error() && <div style="color: red;">{error()}</div>}
      </div>
      <div class="year">
        <label for="year">Year</label>
        <input
          name="year"
          type="text"
          value={year()}
          onInput={(e) => onInput(e.target.value, DateType.Year)}
          placeholder="YYYY"
        />
        {error() && <div style="color: red;">{error()}</div>}
      </div>
    </div>
  )
}