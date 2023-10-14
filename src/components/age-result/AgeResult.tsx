import './AgeResult.sass';
import { createEffect, createSignal } from 'solid-js';

interface Props {
  days?: number | null;
  months?: number | null;
  years?: number | null;
}

export const AgeResult = (props: Props) => {
  const [displayedDays, setDisplayedDays] = createSignal(props.days || 0);
  const [displayedMonths, setDisplayedMonths] = createSignal(props.months || 0);
  const [displayedYears, setDisplayedYears] = createSignal(props.years || 0);

  createEffect(() => {
    if (!props.days || !props.months || !props.years) {
      return;
    }

    const differenceDays = (props.days || 0) - displayedDays();
    const differenceMonths = (props.months || 0) - displayedMonths();
    const differenceYears = (props.years || 0) - displayedYears();

    if (differenceDays !== 0) {
      const stepDays = differenceDays / Math.abs(differenceDays);
      const intervalDays = setInterval(() => {
        setDisplayedDays(prev => {
          if (prev === props.days) {
            clearInterval(intervalDays);
            return prev;
          }
          return prev + stepDays;
        });
      }, 50);
    }

    if (differenceMonths !== 0) {
      const stepMonths = differenceMonths / Math.abs(differenceMonths);
      const intervalMonths = setInterval(() => {
        setDisplayedMonths(prev => {
          if (prev === props.months) {
            clearInterval(intervalMonths);
            return prev;
          }
          return prev + stepMonths;
        });
      }, 50);
    }

    if (differenceYears !== 0) {
      const stepYears = differenceYears / Math.abs(differenceYears);
      const intervalYears = setInterval(() => {
        setDisplayedYears(prev => {
          if (prev === props.years) {
            clearInterval(intervalYears);
            return prev;
          }
          return prev + stepYears;
        });
      }, 50);
    }
  });

  return (
    <div class="age-result">
      <p class="line">
        <span class="value">
          {props.years ? displayedYears() || '--' : '--'}
        </span>
        <span class="label"> years</span>
      </p>
      <p class="line">
        <span class="value">
          {props.months ? displayedMonths() || '--' : '--'}
        </span>
        <span class="label"> months</span>
      </p>
      <p class="line">
        <span class="value">{props.days ? displayedDays() || '--' : '--'}</span>
        <span class="label"> days</span>
      </p>
    </div>
  );
};
