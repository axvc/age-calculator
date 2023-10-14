import './Divider.sass';
import ArrowIcon from 'assets/icons/icon-arrow.svg';

interface Props {
  onSubmit: () => void;
}

export const Divider = ({ onSubmit }: Props) => {
  return (
    <div class="divider">
      <div class="line"></div>
      <button onClick={onSubmit}>
        <img src={ArrowIcon} alt="Arrow" />
      </button>
      <div class="line mobile-divider"></div>
    </div>
  );
};
