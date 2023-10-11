import { createSignal } from 'solid-js';
import './MainContainer.sass'

export const MainContainer = () => {
  const [count, setCount] = createSignal(0);

  return (
    <div class="main-container">
      <p>Текущее значение: {count()}</p>
      <button onClick={() => setCount(count() + 1)}>Увеличить</button>
    </div>
  );
}
