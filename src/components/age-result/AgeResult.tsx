import './AgeResult.sass';

interface Props {
  days?: number | null;
  months?: number | null;
  years?: number | null;
}

export const AgeResult = (props: Props) => {
  return (
    <div class="age-result">
      <p class="line">
        <span class="value">
          {!props.years || isNaN(props.years) ? '--' : props.years}
        </span>
        <span class="label">years</span>
      </p>
      <p class="line">
        <span class="value">
          {!props.months || isNaN(props.months) ? '--' : props.months}
        </span>
        <span class="label">months</span>
      </p>
      <p class="line">
        <span class="value">
          {!props.days || isNaN(props.days) ? '--' : props.days}
        </span>
        <span class="label">days</span>
      </p>
    </div>
  );
};
