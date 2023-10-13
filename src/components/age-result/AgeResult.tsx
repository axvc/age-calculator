import './AgeResult.sass';

interface Props {
  days?: number | null;
  months?: number | null;
  years?: number | null;
}

export const AgeResult = ({ days, months, years }: Props) => {
  return (
    <div class="age-result">
      <p class="line">
        <span class="value">{years ?? '--'}</span>
        <span class="label">years</span>
      </p>
      <p class="line">
        <span class="value">{months ?? '--'}</span>
        <span class="label">months</span>
      </p>
      <p class="line">
        <span class="value">{days ?? '--'}</span>
        <span class="label">days</span>
      </p>
    </div>
  );
};
