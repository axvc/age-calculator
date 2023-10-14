import { createSignal } from 'solid-js';
import './MainContainer.sass';
import { DateInputs } from 'components/date-inputs/DateInputs.tsx';
import { Divider } from 'components/divider/Divider.tsx';
import { AgeResult } from 'components/age-result/AgeResult.tsx';
import { Age } from 'types/Age.ts';
import moment from 'moment';

export const MainContainer = () => {
  const [age, setAge] = createSignal<Age | null>(null);
  const [ageResult, setAgeResult] = createSignal<Age | null>(null);

  const updateAgeResult = () => {
    const duration = moment.duration(
      moment().diff(
        moment(new Date(`${age()?.years}-${age()?.months}-${age()?.days}`)),
      ),
    );

    setAgeResult({
      years: duration.years(),
      months: duration.months(),
      days: duration.days(),
    });
  };

  return (
    <div class="main-container">
      <DateInputs onDateChange={newAge => setAge(newAge)} />
      <Divider onSubmit={() => updateAgeResult()} />
      <AgeResult
        days={ageResult()?.days}
        months={ageResult()?.months}
        years={ageResult()?.years}
      />
    </div>
  );
};
