import classes from './Error.module.css';
import Button from '../UI/Button';

type Props = {
  onButtonClick: () => void;
};

const Error = ({ onButtonClick }: Props) => {
  return (
    <div className={classes.container}>
      <h2 className={classes.message}>Something went wrong!</h2>
      <Button onClick={onButtonClick} className={classes.button}>
        Try again.
      </Button>
    </div>
  );
};

export default Error;
