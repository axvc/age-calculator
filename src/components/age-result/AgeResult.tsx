import './AgeResult.sass'

interface Props {
  days?: number | null;
  months?: number | null;
  years?: number | null;
}

export const AgeResult = ({ days, months, years }: Props) => {
  return (
    <div class="age-result">
      <p>{years ?? '--'} years</p>
      <p>{months ?? '--'} months</p>
      <p>{days ?? '--'} days</p>
    </div>
  )
}