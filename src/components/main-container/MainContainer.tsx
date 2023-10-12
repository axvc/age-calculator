import { createSignal } from 'solid-js';
import './MainContainer.sass'
import {DateInputs} from "../date-inputs/DateInputs.tsx";
import {Divider} from "../divider/Divider.tsx";
import {AgeResult} from "../age-result/AgeResult.tsx";
import {Age} from "../../types/Age.ts";

export const MainContainer = () => {
  const [age, setAge] = createSignal<Age | null>(null);

  return (
    <div class="main-container">
      <DateInputs onDateChange={(age) => setAge(age)} />
      <Divider />
      <AgeResult days={age()?.days} months={age()?.months} years={age()?.years} />
    </div>
  );
}
