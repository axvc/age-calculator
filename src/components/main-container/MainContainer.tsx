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
    const formattedDate = `${age()?.years}-${String(age()?.months).padStart(
      2,
      '0',
    )}-${String(age()?.days).padStart(2, '0')}`;

    const duration = moment.duration(
      moment().diff(moment(new Date(formattedDate))),
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
        days={ageResult()?.days || null}
        months={ageResult()?.months || null}
        years={ageResult()?.years || null}
      />
    </div>
  );
};
